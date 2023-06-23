import { NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";

const locales = ["en", "de"];
const publicPages = ["/signin", "/signup", "/", "/about"];

const intlMiddleware = createIntlMiddleware({
  locales: ["en", "de"],
  defaultLocale: "en",
});

const authMiddleware = withAuth({
  callbacks: {
    authorized: ({ token }) => token !== null,
  },
  // pages: {
  //   signIn: "/signin",
  // },
});

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${publicPages.join("|")})?/?$`,
    "i"
  );
  // const publicPathnameRegex = RegExp(`^(/(${publicPages.join("|")}))?/?$`, "i");

  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
