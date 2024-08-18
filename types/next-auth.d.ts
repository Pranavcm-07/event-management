// types/next-auth.d.ts
import { DefaultSession } from "next-auth";

// Extend the DefaultSession interface
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
  }
}
