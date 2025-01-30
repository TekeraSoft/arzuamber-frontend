"use client";

import Button from "@/app/components/general/Button";
import Heading from "@/app/components/general/Heading";
import Input from "@/app/components/general/Input";
import Link from "next/link";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { IoLogoGoogleplus } from "react-icons/io";
import { toast } from "react-toastify";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    try {
      const formData = { ...data };
      console.log("Form Data", formData);

      toast.success("Login Successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Login Error!");
    }
  };
  return (
    <div className="w-full max-w-md bg-mywhite rounded-xl p-6 shadow-xl space-y-3">
      <Heading
        center
        text="Welcome Back!"
        font="bold"
        textSize="2xl"
        color="black"
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="email"
          placeholder="Email"
          type="email"
          required
          errors={errors}
          register={register}
        />
        <Input
          id="password"
          placeholder="Password"
          type="password"
          required
          errors={errors}
          register={register}
        />

        <div className="flex flex-col space-y-3">
          <Button
            text="Login"
            type="submit"
            color="primary"
            animation
            size="small"
            className="w-full bg-primary hover:bg-primaryDark text-mywhite py-2 rounded-lg"
          />
          <Button
            size="small"
            outline
            icon={IoLogoGoogleplus}
            iconSize={23}
            className="w-full bg-transparent hover:bg-primaryLight border border-primary text-primary hover:text-mywhite rounded-lg py-2"
          />
        </div>
      </form>

      <div className="text-center">
        <Link
          href={`/register`}
          className="text-md text-primary font-semibold hover:underline"
        >
          Don`t have an account? Sign up
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
