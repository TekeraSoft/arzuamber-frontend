import StoreProvider from "@/store/StoreProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Locale, routing } from "@/i18n/routing";
import LayoutProvider from "@/components/layout/layout";
import "react-multi-carousel/lib/styles.css";
import "./globals.css";
import "animate.css";
import Script from "next/script";

export const metadata = {
  title: "Arzu Amber",
  description: "ARZUAMBER",
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
      <html lang={locale} suppressHydrationWarning={true}>
      <head>
          <meta name="description" content="ArzuAmber ile modanın en özel parçalarına ulaşın! Kadın giyim, trend butik ürünler ve şıklık için en yeni koleksiyonları keşfedin."/>
          <meta name="keywords" content="butik, moda, kadın giyim, trend kıyafetler, şık kombinler, yeni sezon moda, online alışveriş, arzuamber butik"/>
            <meta name="author" content="Arzuamber Moda"/>
          <meta name="robots" content="index, follow"/>
          <meta property="og:title" content="ArzuAmber | Moda, Butik ve Şıklıkta Son Trendler"/>
          <meta property="og:description" content="En yeni moda trendlerini keşfedin! ArzuAmber Butik ile tarzınızı tamamlayacak eşsiz kombinleri bulun."/>
          <meta property="og:image" content="https://www.arzuamber.com/images/og-image.jpg"/>
          <meta property="og:url" content="https://www.arzuamber.com"/>
          <meta property="og:type" content="website"/>
          <meta name="twitter:card" content="summary_large_image"/>
          <meta name="twitter:title" content="ArzuAmber | Moda, Butik ve Şıklıkta Son Trendler"/>
          <meta name="twitter:description" content="Kadın giyim ve butik modasında trendleri yakalayın. ArzuAmber Butik ile tarzınızı keşfedin!"/>
          <Script
              strategy="afterInteractive"
              src="https://www.googletagmanager.com/gtag/js?id=AW-16907587292"
          />
          <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                  __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-16907587292');
            `,
              }}
          />
      </head>
      <body className={`antialiased`}>
      <NextIntlClientProvider messages={messages}>
        <StoreProvider>
          <LayoutProvider>{children}</LayoutProvider>
        </StoreProvider>
      </NextIntlClientProvider>
      </body>
      </html>
  );
}
