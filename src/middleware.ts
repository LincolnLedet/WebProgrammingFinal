import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //     return NextResponse.redirect(new URL('/'))
    // }
    // return NextResponse.next()
}

export const config = {
    matcher: ['/:path'],
}