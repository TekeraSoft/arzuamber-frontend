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
import Image from "next/image";

export const metadata = {
  title: "Arzu Amber",
  description: "ARZUAMBER",
  openGraph: {
    title: "ArzuAmber | Moda, Butik ve Şıklıkta Son Trendler",
    description:
      "En yeni moda trendlerini keşfedin! ArzuAmber Butik ile tarzınızı tamamlayacak eşsiz kombinleri bulun.",
    url: "https://www.arzuamber.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArzuAmber | Moda, Butik ve Şıklıkta Son Trendler",
    description:
      "Kadın giyim ve butik modasında trendleri yakalayın. ArzuAmber Butik ile tarzınızı keşfedin!",
  },
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
        <meta
          name="google-site-verification"
          content="O-f3qbjISsw7TRWDMEfgudgwHkDyfpmrqfKP0TrUiTs"
        />
        <meta
          name="facebook-domain-verification"
          content="267es9z1tmrtsycw4r1ochkmcsrzpi"
        />

        {/* Facebook Pixel Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s) {
                if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '4029045750707210'); 
                fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <Image
            src="https://www.facebook.com/tr?id=4029045750707210&ev=PageView&noscript=1"
            alt="Facebook Pixel"
            height={1}
            width={1}
            style={{ display: "none" }}
          />
        </noscript>
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
