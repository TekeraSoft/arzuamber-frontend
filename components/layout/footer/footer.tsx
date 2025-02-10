"use client";
import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { RootState } from "@/store/store";
import { usePathname } from "next/navigation";
import Button from "../../general/Button";

const Footer = () => {
  // Get social media links from Redux
  const socialLinks = useSelector(
    (state: RootState) => state.footer.socialLinks
  );

  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-secondary text-white py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {/* About Us */}
          <div>
            <h2 className="text-xl font-bold mb-4">About Us</h2>
            <p className="text-sm leading-loose">
              We are a brand offering modern and stylish designs in women’s
              fashion. We are always by your side with products that appeal to
              fashion enthusiasts.
            </p>
          </div>

          {/* Customer Service */}
          <div>
            <h2 className="text-xl font-bold mb-4">Customer Service</h2>
            <ul className="space-y-3">
              <li>
                <Link href="/faq" className="hover:text-primary transition">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link
                  href="/return-policy"
                  className="hover:text-primary transition"
                >
                  Return Policy
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-primary transition">
                  Support Request
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="text-xl font-bold mb-4">Newsletter</h2>
            <p className="text-sm mb-6">
              Subscribe to stay updated with the latest news.
            </p>
            <form className="flex gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-primary focus:outline-none"
              />
              <Button text="Subscribe" animation onClick={() => {}} />
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t border-gray-600 pt-6 flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <p className="text-sm text-center mb-4 md:mb-0">
            © 2025 Arzu Amber. All Rights Reserved.
          </p>

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
    </footer>
  );
};

export default Footer;
