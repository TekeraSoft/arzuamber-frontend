import LayoutProvider from "../components/layout/layout";
import StoreProvider from "@/store/StoreProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Geist, Geist_Mono } from "next/font/google";
import "react-multi-carousel/lib/styles.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Arzu Amber",
  description: "ARZUAMBER",
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Geçerli bir dil olup olmadığını kontrol et
  if (!routing.locales.includes(locale as [])) {
    notFound();
  }

  // Dil mesajlarını getir
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning={false}>
      <body
        className={`  ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <StoreProvider>
            <LayoutProvider>{children}</LayoutProvider>
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
