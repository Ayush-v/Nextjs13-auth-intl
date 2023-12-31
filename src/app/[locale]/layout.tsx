import "@/styles/globals.css";
import { fontInter } from "@/lib/fonts";
import SignInSignOutButton from "@/components/signInSignOutButton";
import AuthProvider from "@/components/authProvider";
import IntlProvider from "@/components/intlProvider";
import { notFound } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import LocaleSwitcher from "@/components/localeSwitcher";
import { NextIntlClientProvider, useLocale } from "next-intl";

export const metadata = {
  title: "Project Numb Main Page",
  description: "Generated by developers",
};

// export function generateStaticParams() {
//   return [{ locale: "en" }, { locale: "de" }];
// }

async function getMessages(locale: string) {
  try {
    return (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // const locale = useLocale();
  // const messages = await getMessages(locale);

  // // Show a 404 error if the user requests an unknown locale
  // if (params.locale !== locale) {
  //   notFound();
  // }
  const session = await getServerSession(authOptions);
  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={fontInter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthProvider>
            <div className="flex">
              <SignInSignOutButton session={session} />
              <LocaleSwitcher />
            </div>
            {children}
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
