"use client";
import React from "react";
import SideBar from "@/components/admin/AdminSideBar";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Menubar } from "primereact/menubar";
import { BiLogOut } from "react-icons/bi";
import { signOut } from "next-auth/react";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { FaUser } from "react-icons/fa";

function Layout({ children }) {
  const locale = useLocale();
  const path = usePathname();
  return (
    <div className={"flex flex-row"}>
      <SideBar />

      <div className={"flex flex-col w-full"}>
        <Menubar
          className={"sticky w-full top-0 z-40"}
          style={{ paddingRight: 35 }}
          start={() => <span className={"text-lg font-mono"}>{path}</span>}
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
                </Link>{" "}
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
              <FaUser size={28} color={"gray"} />
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
