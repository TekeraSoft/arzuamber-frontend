import StoreProvider from "@/store/StoreProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Locale, routing } from "@/i18n/routing";
import LayoutProvider from "@/components/layout/layout";
import "react-multi-carousel/lib/styles.css";
import "./globals.css";
import "animate.css";
import ReCaptchaProvider from "@/components/utils/ReCaptchaProvider";
import Head from "next/head";

export const metadata = {
  title: "Arzu Amber",
  description: "ARZUAMBER",
  openGraph: {
    title: "ArzuAmber | Moda, Butik ve Şıklıkta Son Trendler",
    description: "En yeni moda trendlerini keşfedin! ArzuAmber Butik ile tarzınızı tamamlayacak eşsiz kombinleri bulun.",
    url: "https://www.arzuamber.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArzuAmber | Moda, Butik ve Şıklıkta Son Trendler",
    description: "Kadın giyim ve butik modasında trendleri yakalayın. ArzuAmber Butik ile tarzınızı keşfedin!",
  }
};

// `locale` parametresinin tipi belirlenmeli
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale }; // Burada `Locale` türünü kullanıyoruz
}) {
  const { locale } = await params;

  // Geçerli bir dil olup olmadığını kontrol et
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Dil mesajlarını getir
  const messages = await getMessages();

  return (
      <html lang="tr" suppressHydrationWarning={true}>
      <head>
        {/* Google Site Verification */}
        <meta name="google-site-verification" content="O-f3qbjISsw7TRWDMEfgudgwHkDyfpmrqfKP0TrUiTs"/>
      </head>
      <body className={`antialiased`} suppressHydrationWarning={true}>
      <NextIntlClientProvider messages={messages}>
        <StoreProvider>
          <ReCaptchaProvider>
            <LayoutProvider>{children}</LayoutProvider>
          </ReCaptchaProvider>
        </StoreProvider>
      </NextIntlClientProvider>
      </body>
      </html>
  );
}
