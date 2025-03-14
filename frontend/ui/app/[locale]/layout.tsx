import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { Analytics } from "@vercel/analytics/react";

import "../styles/globals.css";
import NavbarMobile from "../../components/navigation/NavbarMobile";
import logger from "../../logging/logger";

const roboto = Roboto_Flex({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pawsitive solution for pets",
  description: "Stylish accessories and extra safety for your pet",
};

const RootLayout = ({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) => {
  const messages = useMessages();

  logger.info(`Rendering RootLayout with locale: ${locale}`);

  return (
    <html lang={locale}>
      <body className={roboto.className}>
        <Analytics />
        <NextIntlClientProvider messages={messages}>
          <NavbarMobile />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
