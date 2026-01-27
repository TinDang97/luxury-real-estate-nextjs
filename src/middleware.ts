import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'vn', 'ko'],
 
  // Used when no locale matches
  defaultLocale: 'vn',
  
  // Always use prefix for consistency
  localePrefix: 'always'
});
 
export const config = {
  // Match only internationalized pathnames
  // Skip internal paths (studio, api, _next)
  matcher: ['/((?!api|_next|studio|.*\\..*).*)']
};
