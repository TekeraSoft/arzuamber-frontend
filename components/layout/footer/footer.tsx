"use client";
import React from "react";

import Button from "../../general/Button";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import FooterIcons from "./FooterIcons";
import FooterSocials from "./FooterSocials";

const Footer = () => {
  const t = useTranslations();

  const navLinks = [
    { name: t("navLinks.home"), url: "/" },
    { name: t("navLinks.products"), url: "/products" },
    { name: t("navLinks.blogs"), url: "/blogs" },
    { name: t("navLinks.about"), url: "/about" },
  ];

  return (
    <footer className="w-full h-full mt-5">
      {/* İcons */}
      <FooterIcons />

      <div className="bg-secondary text-white py-2">
        <div className="max-w-7xl mx-auto px-6">
          {/* Top Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 md:gap-4 items-center">
            <div className="flex flex-col items-center justify-center lg:justify-start">
              <Image
                src={`/images/logo/footerlogo.png`}
                width={200}
                height={40}
                alt="footer logo"
                priority
              />
              <p className="mt-2 font-semibold text-xs">
                ARZUAMBER TEKSTİL SAN. TİC. LTD. ŞTİ
              </p>
              <p className="text-xs">Telefon : +90-534-260-8385</p>
            </div>

            {/* About Us */}
            <div className="flex flex-col justify-center items-start">
              <h2 className="text-xl font-bold mb-2 md:mb-4">
                {t("footer.aboutUs")}
              </h2>
              <p className="text-sm leading-loose">
                {t("footer.aboutDescription")}
              </p>
            </div>

            {/* Customer Service */}
            <div className="flex flex-col justify-center items-start">
              <h2 className="text-xl font-bold mb-2 md:mb-4">
                {t("footer.customerService")}
              </h2>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-primary transition"
                  >
                    {t("navLinks.contact")}
                  </Link>
                </li>

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
            <div className="flex flex-col justify-center items-start h-full gap-2">
              <h2 className="text-xl font-bold">{t("footer.newsletter")}</h2>
              <p className="text-sm">{t("footer.subscribeText")}</p>
              <form className="flex justify-center items-center gap-2">
                <input
                  type="email"
                  placeholder={t("footer.emailPlaceholder")}
                  className="px-2 py-2 rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-primaryLight focus:outline-none text-sm selection:text-mywhite selection:bg-secondary "
                />
                <Button
                  text={t("footer.subscribeButton")}
                  animation
                  onClick={() => {}}
                  size="large"
                  className="text-xs"
                />
              </form>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-6 flex justify-center gap-6 flex-wrap text-xs md:text-sm text-mywhite">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className="hover:text-primary transition"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="mt-4 mb-2 border-t border-mywhite pt-6 flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <p className=" text-xs md:text-sm text-center mb-4 md:mb-0">
              {t("footer.copyright")}
            </p>

            {/* Payment Image */}
            <div className="mb-4 md:mb-0 flex items-center">
              <Image
                src="/images/utils/iyzicoImages.png"
                alt="Iyzico Image"
                width={170}
                height={50}
                className="object-contain"
                priority
              />
            </div>

            {/* Logo */}
            <div className="flex justify-center items-center">
              <Image
                src={"/images/logo/tekeralogo.svg"}
                alt="tekera logo"
                width={200}
                height={50}
              />
            </div>

            {/* Social Media */}
            <FooterSocials />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
