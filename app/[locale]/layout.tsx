import StoreProvider from "@/store/StoreProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Locale, routing } from "@/i18n/routing";
import LayoutProvider from "@/components/layout/layout";
import "react-multi-carousel/lib/styles.css";
import "./globals.css";
import "animate.css";

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
