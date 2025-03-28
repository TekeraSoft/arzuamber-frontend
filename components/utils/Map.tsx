import { useTranslations } from "next-intl";
import "animate.css";
import { FaMapMarkerAlt } from "react-icons/fa";

function Map() {
  const t = useTranslations();

  return (
    <div className="flex flex-col justify-center items-center gap-3 w-full my-8 px-4">
      {/* Başlık */}
      <div className="flex items-center gap-1 animate__animated animate__fadeInDown">
        <FaMapMarkerAlt className="text-primary text-3xl" />
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
          Adresimiz
        </h2>
      </div>

      {/* Adres Bilgisi */}
      <div className="text-sm md:text-lg text-gray-600  font-semibold text-center animate__animated animate__fadeInUp">
        {t("ContactPage.address.street")},{t("ContactPage.address.building")},
        {t("ContactPage.address.number")},{t("ContactPage.address.floor")},
        {t("ContactPage.address.city")},{t("ContactPage.address.district")},
        {t("ContactPage.address.country")}
      </div>

      {/* Google Maps */}
      <div className="w-full  SliderContainer rounded-lg overflow-hidden shadow-lg ">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d797.7763359713855!2d30.69932672850806!3d36.88782807088876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c391433f5d9d85%3A0xf088a952b396c64c!2sARZUAMBER%20MODA!5e0!3m2!1str!2str!4v1742284399531!5m2!1str!2str"
          className="w-full h-72 md:h-96 border-0 rounded-lg"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

export default Map;
