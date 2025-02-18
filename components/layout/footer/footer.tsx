"use client";
import React from "react";
import { useSelector } from "react-redux";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { RootState } from "@/store/store";
import Button from "../../general/Button";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { GoArrowSwitch } from "react-icons/go";
import { FaTruck, FaRegCreditCard } from "react-icons/fa";

const Footer = () => {
  // Get social media links from Redux
  const socialLinks = useSelector(
    (state: RootState) => state.footer.socialLinks
  );

  const t = useTranslations();

  return (
    <footer>
      <div className=" border-t-2 border-secondary  min-h-24 mt-4">
        <div className="grid grid-cols-4">
          <div>
            <GoArrowSwitch />
            <span>90 Gün Boyunca Ücretsiz Değişim ve İade</span>
          </div>
          <div>
            <FaTruck />
            <span></span>
          </div>
          <div>
            <FaRegCreditCard />
            <span></span>
          </div>
          <div>
            <FaTruck />
            <span></span>
          </div>
        </div>
      </div>

      <div className="bg-secondary text-white py-2">
        <div className="max-w-7xl mx-auto px-6">
          {/* Top Section */}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 items-center">
            <Image
              src={`/images/logo/footerlogo.png`}
              width={300}
              height={40}
              alt="footer logo"
              className="object-contain"
            />

            {/* About Us */}
            <div>
              <h2 className="text-xl font-bold mb-4">{t("footer.aboutUs")}</h2>
              <p className="text-sm leading-loose">
                {t("footer.aboutDescription")}
              </p>
            </div>

            {/* Customer Service */}
            <div>
              <h2 className="text-xl font-bold mb-4">
                {t("footer.customerService")}
              </h2>
              <ul className="space-y-3">
                <li>
                  <Link href="/kvkk" className="hover:text-primary transition">
                    {t("footer.kvkk")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cancellation-refund-policy"
                    className="hover:text-primary transition"
                  >
                    {t("footer.returnPolicy")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/distance-selling-contract"
                    className="hover:text-primary transition"
                  >
                    {t("footer.distancesellingcontract")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="flex flex-col justify-center items-start h-full gap-3">
              <h2 className="text-xl font-bold ">{t("footer.newsletter")}</h2>
              <p className="text-sm ">{t("footer.subscribeText")}</p>
              <form className="flex justify-center items-center gap-2 ">
                <input
                  type="email"
                  placeholder={t("footer.emailPlaceholder")}
                  className=" px-2 py-2 rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-primary focus:outline-none text-sm"
                />
                <Button
                  text={t("footer.subscribeButton")}
                  animation
                  onClick={() => {}}
                  size="large"
                  className="text-sm"
                />
              </form>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-10 border-t border-gray-600 pt-6 flex flex-col md:flex-row justify-between items-center ">
            {/* Copyright */}
            <p className="text-sm text-center mb-4 md:mb-0">
              {t("footer.copyright")}
            </p>

            <div className="relative w-[300px] h-[30px] mb-4 md:mb-0 flex items-center">
              <Image
                src="/images/utils/iyzicoImages.png"
                alt="Iyzico Image"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 150px, 300px"
              />
            </div>

            {/* Social Media */}
            <div className="flex gap-5">
              <Link
                href={socialLinks?.facebook || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary transition"
              >
                <FaFacebookF size={20} />
              </Link>
              <Link
                href={socialLinks?.instagram || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary transition"
              >
                <FaInstagram size={20} />
              </Link>
              <Link
                href={socialLinks?.twitter || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary transition"
              >
                <FaTwitter size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
