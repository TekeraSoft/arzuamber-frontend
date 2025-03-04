import Head from "next/head";

export default function NextSeoHead({ name, description, image }) {
  return (
    <>
      <Head>
        {/* Sayfa Başlığı */}
        <title>Arzu Amber - E-Ticaret</title>

        {/* Open Graph (OG) Meta Etiketleri */}
        <meta property="og:title" content={name} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_RESOURCE_API}${image}`}
        />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="product" />

        {/* Twitter Kartları için Meta Etiketler */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={name} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content={`${process.env.NEXT_PUBLIC_RESOURCE_API}${image}`}
        />
      </Head>

      {/* Sayfanın geri kalanı */}
    </>
  );
}
