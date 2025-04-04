import { useState, useEffect } from "react";
import { setCookie, getCookie } from "cookies-next";
import { FaCookie } from "react-icons/fa"; // React Icons
import { motion } from "framer-motion"; // Framer Motion

export default function Cookies() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = getCookie("cookieConsent");

    // Çerez var mı diye kontrol et
    if (consent === "true" || consent === "false") {
      setShowBanner(false); // Onaylansın ya da reddedilsin, çerez varsa banner gösterme
    } else {
      setShowBanner(true); // Hiç çerez yoksa göster
    }
  }, []);

  const handleAccept = () => {
    setCookie("cookieConsent", "true", { maxAge: 60 * 60 * 24 * 30 });
    setShowBanner(false); // Onay verildiyse banner gizlensin
  };

  const handleReject = () => {
    setCookie("cookieConsent", "false", { maxAge: 60 * 60 * 24 * 7 });
    setShowBanner(false);
  };

  if (!showBanner) return null; // Eğer gösterilecek bir şey yoksa render etme

  return (
    <>
      {/* Çerez onay banner'ı */}
      {showBanner && (
        <motion.div
          className="fixed bottom-0 left-0 w-full p-6 flex justify-between items-center z-50 shadow-lg  bg-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex items-center gap-4">
            <FaCookie className="text-fourthLight text-3xl" />
            <p className="text-[10px] md:text-lg text-mywhite">
              Web sitemiz çerezleri kullanmaktadır. Devam etmek için onay verin.
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleReject}
              className="bg-secondaryDark px-2 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded text-mywhite hover:bg-secondaryLight transition"
            >
              Reddet
            </button>
            <button
              onClick={handleAccept}
              className="bg-primaryLight px-2 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded text-mywhite hover:bg-primaryDark transition"
            >
              Onayla
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
