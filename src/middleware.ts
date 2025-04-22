import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const token = request.cookies.get('next-auth.session-token')
    if (token == undefined) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/profile', '/api/playlists/addsong/:path', '/api/playlists/delete', '/api/playlists/save', '/api/playlists/user'],
}