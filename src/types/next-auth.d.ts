import { DefaultSession, Session } from "next-auth";
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    export interface Session {
        accessToken: string;
        user: {
            id?: number
        } extends DefaultSession["user"]
    }
}

declare module "next-auth/jwt" {
    interface JWT {
      userId?: number
    }
  }