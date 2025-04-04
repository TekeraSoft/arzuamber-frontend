import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import { getGuardRequest } from "@/services/api"; // API isteği için

const fetchProducts = async () => {
  try {
    const response = await getGuardRequest({
      controller: "product",
      action: "products",
      params: { page: 1, size: 100 },
    });
    return response.data || [];
  } catch (error) {
    console.error("Ürünleri alırken hata oluştu:", error);
    return [];
  }
};

const generateSitemapPosts = async (req, res) => {
  try {
    let products = await fetchProducts(); // API'den ürünleri çek

    if (!products || products.length === 0) {
      return res.status(404).json({ error: "Ürün bulunamadı" });
    }

    // Sitemap oluştur
    const smStream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
      cacheTime: 600000,
    });

    const links = products.map((product) => ({
      url: `/product/${product.id}`,
      changefreq: "daily",
      priority: 0.7,
    }));

    const xmlString = await streamToPromise(
      Readable.from(links).pipe(smStream),
    ).then((data) => data.toString());

    res.setHeader("Content-Type", "application/xml");
    res.status(200).end(xmlString);
  } catch (error) {
    console.error("Sitemap oluşturma hatası:", error);
    res.status(500).json({ error: "Sitemap oluşturulamadı" });
  }
};

export default generateSitemapPosts;
