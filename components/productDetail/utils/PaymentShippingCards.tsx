import { FaMoneyBillAlt, FaShippingFast, FaCreditCard } from "react-icons/fa";

function PaymentShippingCards() {
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
      id: 2,
      icon: <FaCreditCard className="text-3xl text-blue-600" />,
      title: "İyzico ile Ödeme",
      description: "Kolay ve güvenli ödeme ile alışverişinizi tamamlayın.",
      color: "text-blue-600",
    },
    {
      id: 3,
      icon: <FaMoneyBillAlt className="text-3xl text-yellow-600" />,
      title: "Kapıda Ödeme",
      description: "Ürünü teslim alırken ödeme yapabilirsiniz.",
      color: "text-yellow-600",
    },
  ];

  return (
    <>
      {cardData.map((card) => (
        <div
          key={card.id}
          className="bg-white  rounded-lg flex flex-col items-center justify-center gap-1 border border-gray-300  py-2 px-2"
        >
          <div className="flex justify-center items-center gap-2 ">
            {/* İkon */}
            {card.icon}

            {/* Başlık */}
            <h3
              className={` text-sm font-semibold text-center w-full truncate`}
            >
              {card.title}
            </h3>
          </div>

          {/* Açıklama */}
          <p
            className={`${
              card.color ? card.color : "text-gray-600"
            } text-[11px] text-center w-full `}
          >
            {card.description}
          </p>
        </div>
      ))}
    </>
  );
}

export default PaymentShippingCards;
