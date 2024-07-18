import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider, useMessages } from "next-intl";

import "../styles/globals.css";
import Navbar from "../../components/navigation/Navbar";
import NavbarMobile from "../../components/navigation/NavbarMobile";
import logger from "../../logging/logger";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <NavbarMobile />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
