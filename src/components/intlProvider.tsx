"use client";

import { NextIntlProvider } from "next-intl";

export default function IntlProvider({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: any;
}) {
  return (
    <NextIntlProvider locale={locale} messages={messages}>
      {children}
    </NextIntlProvider>
  );
}
