import {
  FaMoneyBillAlt,
  FaShippingFast,
  FaCreditCard,
  FaExchangeAlt,
  FaGift,
} from "react-icons/fa";

function SpecialCarts() {
  // Kartlar için veri
  const cardData = [
    {
      id: 1,
      icon: <FaShippingFast className="text-3xl text-green-600" />,
      title: "Kargo Ücretsiz",
      description:
        "500 ₺ ve üzerine ücretsiz kargo ile siparişinizi teslim alın.",
      color: "text-green-600",
    },
    {
      id: 3,
      icon: <FaGift className="text-3xl text-red-600" />,
      title: "Özel İndirimler",
      description:
        "Bayramlar, sevgililer günü ve daha fazlasında kaçırılmayacak fırsatlar seni bekliyor!",
      color: "text-red-600",
    },
    {
      id: 3,
      icon: <FaCreditCard className="text-3xl text-blue-600" />,
      title: "İyzico ile Ödeme",
      description: "Kolay ve güvenli ödeme ile alışverişinizi tamamlayın.",
      color: "text-blue-600",
    },
    {
      id: 4,
      icon: <FaMoneyBillAlt className="text-3xl text-yellow-600" />,
      title: "Kapıda Ödeme",
      description: "Ürünü teslim alırken ödeme yapabilirsiniz.",
      color: "text-yellow-600",
    },
    {
      id: 5,
      icon: <FaExchangeAlt className="text-3xl text-purple-600" />,
      title: "Kolay İade",
      description: "15 gün içinde koşulsuz iade garantisi!",
      color: "text-purple-600",
    },
    {
      id: 6,
      icon: <FaMoneyBillAlt className="text-3xl text-gray-600" />,
      title: "Fiyatlarımıza KDV Dahildir",
      description: "Tüm fiyatlarımıza KDV dahildir, ekstra ücret yok!",
      color: "text-gray-600",
    },
  ];

  return (
    <div className="w-full flex justify-center items-center   ">
      <div className="SliderContainer grid grid-cols-2 md:grid-cols-3 gap-3 mt-5 w-full h-full  px-3">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-lg flex flex-col items-center justify-center gap-1 border border-gray-300 py-2 px-2"
          >
            <div className="flex justify-center items-center gap-2">
              {/* İkon */}
              {card.icon}

              {/* Başlık */}
              <h3 className="text-[11px] md:text-sm font-semibold text-center w-full truncate">
                {card.title}
              </h3>
            </div>

            {/* Açıklama */}
            <p
              className={`${
                card.color ? card.color : "text-gray-600"
              } text-[10px] md:text-xs text-center w-full`}
            >
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpecialCarts;
