import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";
import type { Session } from "@/auth";

const authRoutes = ["/login", "/register",];
const homeRoutes = "/"
const adminRoute = ["/dashboard/data_administrator", "/dashboard/data_absensi", "/dashboard/data_siswa", "/dashboard/data_siswa/tambah", "/dashboard/data_siswa/ubah"];

export default async function authMiddleware(request: NextRequest) {
    const pathName = request.nextUrl.pathname;
    const isAuthRoute = authRoutes.includes(pathName);
    const isHomeRoute = homeRoutes.includes(pathName);
    const isAdminRoute = adminRoute.includes(pathName);

    const { data: session } = await betterFetch<Session>(
        "/api/auth/get-session",
        {
            baseURL: process.env.BETTER_AUTH_URL,
            headers: {
                cookie: request.headers.get("cookie") || "",
            },
        },
    );

    if (!session) {
        if (isAuthRoute) {
            return NextResponse.next();
        }
        if (isHomeRoute) {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (session) {
        if (isAdminRoute && session.user.role !== "admin") {
            return NextResponse.redirect(new URL("/", request.url));
        }
        if (isAuthRoute) {
            return NextResponse.redirect(new URL("/dashboard/data_administrator", request.url));
        } 
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};