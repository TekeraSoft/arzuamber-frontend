"use client";

import { useTranslations } from "next-intl";

function UserUpdatePage() {
  const t = useTranslations();

  return (
    <div className="w-full flex justify-center items-center flex-col    container ">
      {/* <h2 className="text-2xl font-semibold text-center">
        {t("profileUpdate.updateInfo")}
      </h2> */}
      {/* Email Update Form */}
      <form className="mb-6 w-full  md:w-3/4 flex flex-col gap-4">
        {/* Phone Update Form */}

        <div className="">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {t("profileUpdate.phone")}
          </label>
          <input
            id="phone"
            type="tel"
            placeholder={t("profileUpdate.phone")}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-secondary text-white py-2 rounded-md hover:opacity-85"
        >
          {t("profileUpdate.updatePhone")}
        </button>

        <div className="flex flex-col gap-2">
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("profileUpdate.address")}
            </label>
            <textarea
              id="address"
              placeholder={t("profileUpdate.address")}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary min-h-24"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-secondary text-white py-2 rounded-md hover:opacity-85"
          >
            {t("profileUpdate.updateAddress")}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserUpdatePage;
