import Head from "next/head";

export default function NextSeoHead({ name, description, image }) {
  return (
    <Head>
      {/* Sayfa Başlığı */}
      <title>{name ? `${name} - Arzu Amber` : "Arzu Amber - E-Ticaret"}</title>

      {/* Genel SEO Meta Etiketleri */}
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <meta name="keywords" content="e-ticaret, alışveriş, moda, tekstil" />
      <meta name="author" content="Arzu Amber Tekstil" />
      <meta name="language" content="tr" />
      <meta name="robots" content="index, follow" />

      {/* Open Graph (OG) Meta Etiketleri */}
      <meta property="og:title" content={name} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content={`${process.env.NEXT_PUBLIC_RESOURCE_API}${image}`}
      />
      <meta property="og:type" content="product" />

      {/* Twitter Kartları için Meta Etiketleri */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={name} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content={`${process.env.NEXT_PUBLIC_RESOURCE_API}${image}`}
      />
    </Head>
  );
}
