import { betterAuth, BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { openAPI } from "better-auth/plugins";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql"
    }),
    plugins: [openAPI(), admin()],
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
    }
} satisfies BetterAuthOptions)

export type Session = typeof auth.$Infer.Session;