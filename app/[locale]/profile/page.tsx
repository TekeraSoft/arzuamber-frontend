"use client";

import { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";
import PageContainer from "@/components/Containers/PageContainer";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import RichTextBox from "@/components/general/RichTextBox";
import Button from "@/components/general/Button";
import Input from "@/components/general/Input";

const UserProfile = () => {
  const [user] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+90 555 123 4567",
    address: "",
    image: "/images/blogs/blog1.jpg",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <PageContainer>
      <div className="w-full min-h-screen flex justify-center items-center bg-gray-100 py-12">
        <div className="w-full max-w-4xl flex flex-col lg:flex-row justify-between flex-wrap items-start bg-white p-6 rounded-lg shadow-lg border border-gray-300">
          {/* Profile Image Section */}
          <div className="w-[200px] h-[200px] lg:w-[250px] lg:h-[250px] relative mb-4 lg:mb-0">
            <Image
              src={user.image}
              alt="User Profile"
              layout="fill"
              objectFit="cover"
              className="rounded-lg border-4 border-gray-300 shadow-md absolute top-0"
            />
          </div>

          {/* Profile Info Section */}
          <div className="w-full lg:w-2/3 flex flex-col">
            <h2 className="text-2xl font-semibold text-primary flex items-center gap-2">
              <FaUser className="text-secondary" /> {user.name}
            </h2>

            <div className="mt-4 space-y-4">
              <p className="flex items-center gap-2 text-gray-700">
                <FaEnvelope className="text-primary" /> {user.email}
              </p>
              <p className="flex items-center gap-2 text-gray-700">
                <FaPhone className="text-primary" /> {user.phone}
              </p>

              <div className="mt-6">
                <p className="flex items-center gap-2 text-primary">
                  <FaMapMarkerAlt className="text-primary" />
                  <span className="text-xs ">
                    {/* {user.address || "Adresinizi girin"} */}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dicta quia quisquam, cumque cum provident animi doloribus
                    adipisci quo pariatur atque eveniet sunt doloremque nisi
                    inventore voluptate. Harum mollitia modi ipsam velit,
                    sapiente sequi ea, rem atque amet odit tempora corrupti
                    molestias deleniti dolorum, error consectetur distinctio
                    aut? Architecto, nostrum vero.
                  </span>
                </p>
              </div>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-row justify-center items-center gap-4 w-full"
          >
            <RichTextBox
              id="address"
              label="Adress"
              placeholder="Adres girin..."
              register={register}
              errors={errors}
              required
            />

            <Button
              text="Güncelle"
              color="secondary"
              type="submit"
              size="small"
              animation
            />
          </form>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-row justify-center items-center gap-4 w-full"
          >
            <Input
              id="phone"
              label="Telefon"
              placeholder="Number"
              type="number"
              register={register}
              errors={errors}
              required
            />
            <Button
              text="Güncelle"
              color="secondary"
              type="submit"
              size="small"
              animation
            />
          </form>
        </div>
      </div>
    </PageContainer>
  );
};

export default UserProfile;
