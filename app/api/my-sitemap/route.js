import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";

export async function GET(req) {
  const links = [
    { url: "/", changefreq: "daily", priority: 0.3 },
    { url: "/contact", changefreq: "daily", priority: 0.3 },
    { url: "/about", changefreq: "daily", priority: 0.3 },
    { url: "/products", changefreq: "daily", priority: 0.3 },
    { url: "/blogs", changefreq: "daily", priority: 0.3 },
    { url: "/payment", changefreq: "daily", priority: 0.3 },
    { url: "/kvkk", changefreq: "daily", priority: 0.3 },
    { url: "/cancellation-refund-policy", changefreq: "daily", priority: 0.3 },
    { url: "/distance-selling-contract", changefreq: "daily", priority: 0.3 },
  ];

  const stream = new SitemapStream({
    hostname: `https://${req.headers.get("host")}`,
  });

  try {
    const xmlString = await streamToPromise(
      Readable.from(links).pipe(stream)
    ).then((data) => data.toString());

    return new Response(xmlString, {
      headers: { "Content-Type": "application/xml" },
    });
  } catch (error) {
    return new Response("Sitemap generation failed", { status: 500 });
    console.log(error);
  }
}
