// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { prismaclient } from './lib/db';



const ispublicroute=createRouteMatcher([
    "/sign-in",
    "/sign-up",
     "/",
])



export default clerkMiddleware(async (auth, req) => {
    const { userId } = await auth()


  if(userId && ispublicroute(req) ) {
        return NextResponse.redirect(new URL('/dashboard',req.url));
  }

 

    if(!userId) {
        if(!ispublicroute(req)  ) {
        return NextResponse.redirect(new URL('/sign-in',req.url));
        }

    }
     
      

    return NextResponse.next();     
     
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
