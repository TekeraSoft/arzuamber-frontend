import Head from "next/head";

export default function ProductDetailHead({ product }) {
  return (
    <>
      <Head>
        {/* Sayfa Başlığı */}
        <title>{product.name} - E-Ticaret</title>

        {/* Open Graph (OG) Meta Etiketleri */}
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_RESOURCE_API}${product.images[0]}`}
        />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="product" />

        {/* Twitter Kartları için Meta Etiketler */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.name} />
        <meta name="twitter:description" content={product.description} />
        <meta
          name="twitter:image"
          content={`${process.env.NEXT_PUBLIC_RESOURCE_API}${product.images[0]}`}
        />
      </Head>
    </>
  );
}
