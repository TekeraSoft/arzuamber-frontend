"use client";
import { useTranslations } from "next-intl";
import { FaPhoneAlt, FaRegAddressCard, FaEnvelope } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function ProfilePage() {
  const t = useTranslations();
  const [addressArea, setAddressArea] = useState<boolean>(false);
  const [addressContent, setAddressContent] = useState<string>("");
  const { data: session } = useSession();

  return (
    <div className="w-full px-4 md:px-8 py-6 space-y-8 h-full bg-white rounded-b  md:rounded-lg  ">
      {/* Personal Information Section */}
      <div className="space-y-6">
        <h3 className="text-xl  md:text-2xl font-semibold text-primary">
          {t("userInfo.title")}
        </h3>
        <div className="space-y-4 bg-gray-50 p-4 rounded-lg shadow-sm">
          <div className="flex items-center space-x-3">
            <FaRegAddressCard className="text-primary text-xl" />
            <span className="font-medium text-gray-800">
              <strong>{t("userInfo.name")}: </strong> {session?.user.name}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <FaEnvelope className="text-primary text-xl" />
            <span className="font-medium text-gray-800">
              <strong>{t("userInfo.email")}: </strong> {session?.user.email}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <FaPhoneAlt className="text-primary text-xl" />
            <span className="font-medium text-gray-800">
              <strong>{t("userInfo.phone")}: </strong>{" "}
              {session?.user.phoneNumber ? session.user.phoneNumber : "-"}
            </span>
          </div>
        </div>
      </div>

      {/* Address Section */}
      {/*<div className="space-y-2">*/}
      {/*  <div className={"flex flex-row items-center justify-between"}>*/}
      {/*    <h3 className="text-xl  md:text-2xl font-semibold text-primary">*/}
      {/*      {t("userInfo.address")}*/}
      {/*    </h3>*/}
      {/*    <button*/}
      {/*      onClick={() => setAddressArea(!addressArea)}*/}
      {/*      className={"text-blue-600 underline"}*/}
      {/*    >*/}
      {/*      Adres Güncelle*/}
      {/*    </button>*/}
      {/*  </div>*/}
      {/*  {!addressArea ? (*/}
      {/*    <div className="bg-gray-50  rounded-lg shadow-sm">*/}
      {/*      <p className="text-gray-700 text-sm leading-relaxed p-1">*/}
      {/*        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe*/}
      {/*        temporibus, id qui, laboriosam maiores distinc Lorem ipsum dolor*/}
      {/*        sit amet consectetur adipisicing elit. Nemo quibusdam, officiis*/}
      {/*        non facere porro nostrum dolores dolor vero veniam illum molestiae*/}
      {/*        impedit, quisquam deserunt dolore aperiam nobis soluta fugit,*/}
      {/*        commodi velit.*/}
      {/*      </p>*/}
      {/*    </div>*/}
      {/*  ) : (*/}
      {/*    <textarea*/}
      {/*      rows={9}*/}
      {/*      className={"bg-gray-50 p-2 w-full"}*/}
      {/*      placeholder={*/}
      {/*        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe\n" +*/}
      {/*        "                  temporibus, id qui, laboriosam maiores distinc Lorem ipsum dolor sit\n" +*/}
      {/*        "                  amet consectetur adipisicing elit. Nemo quibusdam, officiis non\n" +*/}
      {/*        "                  facere porro nostrum dolores dolor vero veniam illum molestiae\n" +*/}
      {/*        "                  impedit, quisquam deserunt dolore aperiam nobis soluta fugit,\n" +*/}
      {/*        "                  commodi velit."*/}
      {/*      }*/}
      {/*    />*/}
      {/*  )}*/}
      {/*</div>*/}
    </div>
  );
}
