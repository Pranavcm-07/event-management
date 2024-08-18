'use client'
import Image from 'next/image'
import Link from 'next/link'
import MobileNav from './MobileNav'
import NavItems from './NavItems'
import { useSession, signOut, signIn } from 'next-auth/react'
import AuthButton from './AuthButton'

const Header = () => {
    // Get the user session
    const { data: session,status } = useSession()
    return (
        <header className='w-full border-b'>
            <div className="wrapper flex justify-between items-center">
                {/* Logo link */}
                <Link href='/' className='w-36'>
                    <Image 
                        src="/assets/images/logo.svg" 
                        alt="Evently logo" 
                        width={128} 
                        height={38} 
                    />
                </Link>
                {/* Desktop navigation */}
                <nav className='hidden md:flex w-full max-w-xs'>
                    <NavItems />
                </nav>
                {/* User avatar */}
                {/* Mobile navigation */}
                <div className="flex gap-3 justify-end w-32 items-center">
                    {status === 'authenticated' ? (
                        <div className="flex items-center gap-2">
                            {session.user?.image && (
                                <Image 
                                    src={session.user.image} 
                                    alt="Profile Picture" 
                                    width={32} 
                                    height={32} 
                                    className="rounded-full"
                                />
                            )}
                            <AuthButton styles='hidden md:flex' auth='Sign Out' onclick={()=>signOut()}/>
                        </div>
                    ) : (
                        <AuthButton styles='hidden md:flex' auth='Sign In' onclick={()=>signIn()}/>
                    )}
                    <MobileNav />
                </div>
            </div>
        </header>
    )
}

export default Header
