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
import Script from "next/script";

export const metadata = {
  title: "Arzu Amber",
  description: "ARZUAMBER",
  alternates: {
    canonical: "https://www.arzuamber.com/",
  },
  openGraph: {
    title: "ArzuAmber | Moda, Butik ve Şıklıkta Son Trendler",
    description:
      "En yeni moda trendlerini keşfedin! ArzuAmber Butik ile tarzınızı tamamlayacak eşsiz kombinleri bulun.",
    url: "https://www.arzuamber.com",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dgoothqal/image/upload/v1743583349/link_g%C3%B6rsel_ndu2ez.jpg",
        width: 1200,
        height: 630,
        alt: "ArzuAmber Logo",
      },
    ],
  },
  twitter: {
    card: "https://res.cloudinary.com/dgoothqal/image/upload/v1743583349/link_g%C3%B6rsel_ndu2ez.jpg",
    image:
      "https://res.cloudinary.com/dgoothqal/image/upload/v1743583349/link_g%C3%B6rsel_ndu2ez.jpg",
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
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-04C3TF0J1S"
        />
        <Script id="google-analytics-script">
          {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);}  gtag('js', new Date()); gtag('config', 'G-04C3TF0J1S');
`}
        </Script>

        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=AW-16907587292`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){window.dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'AW-16907587292');
                    `}
        </Script>
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
