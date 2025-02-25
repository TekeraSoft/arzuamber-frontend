"use client";
import React from "react";
import SideBar from "@/components/admin/AdminSideBar";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { BiLogOut } from "react-icons/bi";
import { signOut } from "next-auth/react";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { FaUserShield } from "react-icons/fa";
import { Toolbar } from "primereact/toolbar";

function Layout({ children }) {
  const locale = useLocale();
  const path = usePathname();
  return (
    <div className={"flex flex-row bg-white"}>
      <SideBar />

      <div className={"flex flex-col w-full"}>
        <Toolbar
          className={"sticky w-full top-0 z-50 !rounded-none"}
          style={{ paddingRight: 35 }}
          start={() => (
            <span className={"text-base font-mono"}>
              {path
                .replace(/^\/admin\//, "")
                .split("/")
                .join(" > ")}
            </span>
          )}
          center={() => (
            <div className="flex justify-center w-full">
              <div className="text-sm text-red-600 font-semibold">
                {locale === "tr"
                  ? "Şu an Türkçe içerik giriyorsunuz"
                  : "You are entering content in English"}
              </div>
            </div>
          )}
          end={() => (
            <span className={"flex flex-row items-center gap-x-4"}>
              <span className={"flex flex-row items-center gap-x-2"}>
                <Link
                  href={path}
                  locale={"tr"}
                  className={`${
                    locale === "tr"
                      ? "bg-secondary text-white rounded"
                      : "border rounded"
                  } p-1`}
                >
                  TR
                </Link>
                /
                <Link
                  href={path}
                  locale={"en"}
                  className={`${
                    locale === "en"
                      ? "bg-secondary text-white rounded"
                      : "border rounded"
                  } p-1`}
                >
                  EN
                </Link>
              </span>
              <FaUserShield size={28} color={"gray"} />
              <BiLogOut
                className={"cursor-pointer"}
                onClick={() => signOut()}
                size={32}
                color={"red"}
              />
            </span>
          )}
        />
        <div className={"px-8 py-4"}>{children}</div>
      </div>
    </div>
  );
}

export default Layout;
