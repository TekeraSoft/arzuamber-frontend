"use client";

import { useTranslations } from "next-intl";
import React, { useState } from "react";

function UserUpdatePage() {
  const t = useTranslations();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Updated Email: ${email}`);
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Updated Phone: ${phone}`);
  };

  return (
    <div className="w-full flex justify-center items-center flex-col ">
      <h2 className="text-2xl font-semibold text-center mb-6">
        {t("profileUpdate.updateInfo")}
      </h2>
      {/* Email Update Form */}
      <form onSubmit={handleEmailSubmit} className="mb-6 w-1/2">
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            {t("profileUpdate.email")}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-secondary text-white py-2 rounded-md hover:opacity-85"
        >
          {t("profileUpdate.updateEmail")}
        </button>
      </form>

      {/* Phone Update Form */}
      <form onSubmit={handlePhoneSubmit} className="w-1/2">
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            {t("profileUpdate.phone")}
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="Enter your phone number"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-secondary text-white py-2 rounded-md hover:opacity-85"
        >
          {t("profileUpdate.updatePhone")}
        </button>
      </form>
    </div>
  );
}

export default UserUpdatePage;
