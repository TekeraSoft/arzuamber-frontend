import LayoutProvider from "../../components/layout/layout";
import StoreProvider from "@/store/StoreProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Locale, routing } from "@/i18n/routing";
import { Jost } from "next/font/google";
import "react-multi-carousel/lib/styles.css";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "200", "300", "600", "700", "900"],
});

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
    <html lang={locale}>
      <body
        className={`${jost.className} antialiased`}
        suppressHydrationWarning={true}
      >
        <NextIntlClientProvider messages={messages}>
          <StoreProvider>
            <LayoutProvider>
              {children}
            </LayoutProvider>
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
