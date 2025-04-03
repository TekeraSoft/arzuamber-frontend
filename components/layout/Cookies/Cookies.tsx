import { useState, useEffect } from "react";
import { setCookie, getCookie } from "cookies-next";
import { FaCookie, FaTimes } from "react-icons/fa"; // React Icons
import { motion } from "framer-motion"; // Framer Motion

export default function Cookies() {
  const [showBanner, setShowBanner] = useState(false);
  const [showRejectMessage, setShowRejectMessage] = useState(false);

  useEffect(() => {
    const consent = getCookie("cookieConsent");

    // Çerez onay durumuna göre banner ve mesaj gösterimi
    if (consent === "true") {
      setShowBanner(false); // Onaylandıysa banner gösterilmesin
      setShowRejectMessage(false); // Reddedildi mesajı gösterilmesin
    } else if (consent === "false") {
      setShowRejectMessage(true); // Çerezler reddedildiyse mesajı göster
    } else {
      setShowBanner(true); // Hiçbir şey yapılmadıysa banner'ı göster
    }
  }, []);

  const handleAccept = () => {
    setCookie("cookieConsent", "true", { maxAge: 60 * 60 * 24 * 7 });
    setShowBanner(false); // Onay verildiyse banner gizlensin
    setShowRejectMessage(false); // Reddedilme mesajı da gizlensin
  };

  const handleReject = () => {
    setCookie("cookieConsent", "false", { maxAge: 60 * 60 * 24 * 7 });
    setShowRejectMessage(true); // Reddedilme mesajını göster
  };

  const handleCloseRejectMessage = () => {
    setShowRejectMessage(false); // Reddetme mesajını kapat
    setShowBanner(false);
  };

  if (!showBanner && !showRejectMessage) return null; // Eğer gösterilecek bir şey yoksa render etme

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

      {/* Reddetme mesajı */}
      {showRejectMessage && (
        <motion.div
          className="fixed bottom-0 left-0 w-full p-6 flex justify-between items-center z-50 shadow-lg rounded-t-md bg-thirdLight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex items-center gap-4">
            <FaTimes className="text-fourthLight text-xl md:text-3xl" />
            <p className="text-[10px] md:text-lg text-mywhite">
              Çerezleri reddettiniz. Bu seçim, 7 gün boyunca geçerli olacaktır.
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleCloseRejectMessage}
              className="bg-transparent border border-mywhite px-2 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded text-mywhite hover:bg-mywhite hover:text-gray-900 transition"
            >
              Kapat
            </button>
            <button
              onClick={handleAccept}
              className="bg-primary px-2 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded text-mywhite hover:bg-primaryDark transition"
            >
              Onayla
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
