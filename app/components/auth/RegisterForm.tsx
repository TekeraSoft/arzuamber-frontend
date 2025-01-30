"use client";

import Button from "@/app/components/general/Button";
import Heading from "@/app/components/general/Heading";
import Input from "@/app/components/general/Input";
import { registerUserDispatch } from "@/store/authSlice";
import { AppDispatch } from "@/store/store";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoLogoGoogleplus } from "react-icons/io";
import { useDispatch } from "react-redux";

function RegisterForm() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(registerUserDispatch(data));
  };

  return (
    <div className="w-full max-w-md bg-mywhite rounded-xl p-6 shadow-xl space-y-4">
      <Heading
        center
        text="Create an Account"
        font="bold"
        textSize="2xl"
        color="black"
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <Input
            id="firstName"
            placeholder="First Name"
            type="text"
            required
            errors={errors}
            register={register}
          />
          <Input
            id="lastName"
            placeholder="Last Name"
            type="text"
            required
            errors={errors}
            register={register}
          />
        </div>
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
            text="Register"
            type="submit"
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
          href={`/login`}
          className="text-md text-primary font-semibold hover:underline"
        >
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}

export default RegisterForm;
