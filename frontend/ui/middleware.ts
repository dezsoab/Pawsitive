import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
 
const nextIntlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'de', 'hu'],
  defaultLocale: 'en'
});
 
export default function (req: NextRequest) : NextResponse{
    return nextIntlMiddleware(req)
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(de|en|hu)/:path*','/((?!api|_next|.*\\..*).*)']
};