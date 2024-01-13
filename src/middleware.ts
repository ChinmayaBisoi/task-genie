import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    // if(request.nextUrl.pathname.startsWith("/u")){
    //     return NextResponse.redirect(new URL('/', request.url))
    // }
}
