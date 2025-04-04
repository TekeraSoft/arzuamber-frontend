import Image from "next/image";

function SizeTable() {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center space-y-6 lg:space-x-4 lg:space-y-0 ">
      {/* Görsel */}

      <div className="relative w-[400px] h-[600px]">
        <Image
          src="/images/utils/size-table.png"
          alt="Size Table"
          fill
          className="rounded-md object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Metin kısmı */}
      <div className="text-left max-w-md lg:max-w-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center lg:text-left">
          Beden Tablosu
        </h2>
        <p className="text-lg mb-4 text-center lg:text-left">
          Aşağıdaki beden tablosunu inceleyerek, ürünün hangi bedeni size uygun
          olduğunu öğrenebilirsiniz. Her ürün farklı olabilir, bu nedenle
          ölçülerde küçük farklılıklar olabilir.
        </p>
        <p className="text-sm text-gray-500 text-center lg:text-left">
          Tabloyu doğru şekilde inceleyerek, ihtiyacınıza uygun bedeni
          seçebilirsiniz. Eğer hala emin değilseniz, müşteri hizmetlerimizden
          destek alabilirsiniz.
        </p>
      </div>
    </div>
  );
}

export default SizeTable;
