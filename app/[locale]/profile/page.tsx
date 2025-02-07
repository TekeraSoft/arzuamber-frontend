"use client";

import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";
import PageContainer from "@/components/Containers/PageContainer";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import RichTextBox from "@/components/general/RichTextBox";
import Button from "@/components/general/Button";
import Input from "@/components/general/Input";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Loading from "@/components/utils/Loading";

const UserProfile = () => {
  // Redux state'inden kullanıcı bilgilerini al
  const { user, loading } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  if (loading) {
    return (
      <PageContainer>
        <Loading />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="w-full min-h-screen flex justify-center items-center bg-gray-100 py-12">
        <div className="w-full max-w-4xl flex flex-col lg:flex-row items-center justify-center bg-white p-6 rounded-lg shadow-lg border border-gray-300 gap-6 flex-wrap">
          {/* Profil Resmi */}
          <div className="w-[250px] h-[200px] lg:w-[450px] lg:h-[250px] relative">
            <Image
              src={user?.image || "/images/default-user.jpg"}
              alt="User Profile"
              layout="fill"
              objectFit="cover"
              className="rounded-lg border-4 border-gray-300 shadow-md"
            />
          </div>

          {/* Profil Bilgileri */}
          <div className="w-full flex flex-col items-center lg:items-start">
            <h2 className="text-2xl font-semibold text-primary flex items-center gap-2">
              <FaUser className="text-secondary min-w-[24px]" size={25} />
              {user?.name} {user?.lastName}
            </h2>

            <div className="mt-4 space-y-4 text-center lg:text-left w-full">
              <p className="flex items-center gap-2 text-gray-700 break-words">
                <FaEnvelope className="text-primary min-w-[24px]" size={25} />
                {user?.email}
              </p>
              <p className="flex items-center gap-2 text-gray-700 break-words">
                <FaPhone className="text-primary min-w-[24px]" size={25} />
                {user?.phone}
              </p>

              <div className="mt-4">
                <p className="flex items-start gap-2 text-primary">
                  <FaMapMarkerAlt
                    className="text-primary min-w-[24px]"
                    size={25}
                  />
                  <span className="text-xs break-words">
                    {user?.address || "Adres bilgisi eklenmemiş."}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Adres & Telefon Güncelleme Formu */}
          <div className="w-full flex flex-col gap-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col justify-center items-center gap-4 w-full"
            >
              <RichTextBox
                id="address"
                label="Adres"
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
              className="flex flex-col justify-center items-center gap-4 w-full"
            >
              <Input
                id="phone"
                label="Telefon"
                placeholder="Telefon numarası"
                type="tel"
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
      </div>
    </PageContainer>
  );
};

export default UserProfile;
