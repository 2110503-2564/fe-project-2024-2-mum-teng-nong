import NextAuth from 'next-auth'

declare module "next-auth" {
    interface Session {
        user: {
            _id: string,
            name: string,
            email: string,
            role: string,
            token: string
        }
    }
}

import { Session } from "next-auth";

declare module "next-auth" {
    interface Session {
        accessToken?: string; // เพิ่ม accessToken เข้าไปใน Session type
    }
}