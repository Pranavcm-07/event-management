import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { createUser, getUserByEmailAndProvider } from "@/lib/actions/user.actions";
import bcrypt from 'bcrypt';

export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Your Name" },
                email: { label: "Email", type: "email", placeholder: "Your Email" },
                password: { label: "Password", type: "password" , placeholder: "Your Password" },
            },
            async authorize(credentials, req) {
                if (!credentials) return null;

                // Get the user by email
                const existingUser = await getUserByEmailAndProvider({ email: credentials.email , provider: 'credentials' });

                if (existingUser) {
                    // Case: User exists and the provider is "credentials"
                    const isMatch = await bcrypt.compare(credentials.password, existingUser.password);
                    const isUsernameMatch = credentials.username === existingUser.username;
                    if (isMatch && isUsernameMatch) {
                        // console.log('Login successful:', existingUser._id);
                        return { ...existingUser, id: existingUser._id.toString(),name:existingUser.username }; // Successful login
                    } else {
                        return null; // Failed login
                    }
                } else {
                    // Case: User does not exist, create a new one with "credentials"
                    const newUser = await createUser({
                        user: {
                            username: credentials.username,
                            email: credentials.email,
                            password: credentials.password,
                            provider: 'credentials',
                        }
                    });

                    if (newUser && !newUser.error) {
                        // console.log('Signup successful:', newUser._id); 
                        return { ...newUser, id: newUser._id.toString(),name:newUser.username }; // Successful signup
                    } else {
                        return null; // Failed signup
                    }
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === 'google') {
                try {
                    const email = profile?.email;
                    const image = (profile as any).picture || '';  
    
                    if (!email) {
                        return false;
                    }
                    const googleUser = await getUserByEmailAndProvider({ email, provider: 'google' });
                    if (googleUser) {
                        user.id =  googleUser._id.toString();
                        return true;
                    }
    
                    const existingUser = await getUserByEmailAndProvider({email, provider: 'credentials'});
                    if (existingUser) {
                        const newUser = await createUser({
                            user: {
                                username: profile.name || '',
                                email: email,
                                image: image,
                                provider: 'google',
                            }
                        });    
                        if ('error' in newUser) {
                            console.error('Error creating user:', newUser.error);
                            return false; 
                        }
                        user.id = newUser._id.toString();
                        return true; 
                    }
    
                    const newGoogleUser = await createUser({
                        user: {
                            username: profile.name || '',
                            email: email,
                            image: image,
                            provider: 'google',
                        }
                    });
    
                    if ('error' in newGoogleUser) {
                        console.error('Error creating user:', newGoogleUser.error);
                        return false;
                    }
                    user.id = newGoogleUser._id.toString();
                    return true;
    
                } catch (error) {
                    console.error('Error storing user data in the database:', error);
                    return false; 
                }
            }
            return true;
        },
        async session({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub as string;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id || token.sub;  // Store the user id in token.sub
            }
            return token;
        },
        async redirect({url, baseUrl}) {
            return url.startsWith('/events/create') ? `${baseUrl}${url}` : baseUrl;
        }
    }    
}