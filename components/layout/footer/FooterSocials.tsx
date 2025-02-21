import { Link } from "@/i18n/routing";
import { useSelector } from "react-redux";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { RootState } from "@/store/store";

function FooterSocials() {
  // Get social media links from Redux
  const socialLinks = useSelector(
    (state: RootState) => state.footer.socialLinks
  );

  return (
    <div className="flex gap-5 my-2 ">
      <Link
        href={socialLinks?.facebook || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-primary transition"
      >
        <FaFacebookF size={21} />
      </Link>
      <Link
        href={socialLinks?.instagram || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-primary transition"
      >
        <FaInstagram size={23} />
      </Link>
      <Link
        href={socialLinks?.whatsapp || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-primary transition"
      >
        <FaWhatsapp size={23} />
      </Link>
    </div>
  );
}

export default FooterSocials;
