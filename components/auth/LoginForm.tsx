"use client";

import Button from "@/components/general/Button";
import Heading from "@/components/general/Heading";
import Input from "@/components/general/Input";
import { closeLoginModal, openRegisterModal } from "@/store/modalsSlice";
import { AppDispatch, RootState } from "@/store/store";
import React from "react";
import { IoLogoGoogleplus } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {useFormik} from "formik";
import {InputText} from "primereact/inputtext";
import {signIn} from "next-auth/react";
import {MdCancel} from "react-icons/md";

function LoginForm() {
    // const t = useTranslations();
    const dispatch = useDispatch<AppDispatch>();

    const {isLoginModalOpen} = useSelector(
        (state: RootState) => state.modals
    );

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (values, {resetForm}) => {
            signIn('credentials', {redirect: false, email: values.email, password: values.password})
                .then((res)=> {
                    if(res.status === 200){
                        toast.success('Login successfully');
                        dispatch(closeLoginModal());
                    }
                }).catch(err => {
                    toast.error(err.response.data.message)
            })
        }
    })

    const handleChangeModal = () => {
        dispatch(closeLoginModal());
        dispatch(openRegisterModal());
    };

    return (
        <div
            onClick={(e) => {
                // Form dışına tıklanırsa kapanmasını sağlıyoruz
                if (e.target === e.currentTarget) {
                    dispatch(closeLoginModal())
                }
            }}
            className={`${
                isLoginModalOpen ? "fixed" : "hidden"
            } inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50`}
        >
            <div
                className={`w-full md:w-1/4 h-auto bg-white rounded-2xl p-10 shadow-lg relative transform transition-all duration-300`}
            >
                <Heading
                    center
                    text="Welcome Back!"
                    // text={t("loginForm.welcomeBack")}
                    font="bold"
                    textSize="2xl"
                    color="black"
                />

                <form onSubmit={formik.handleSubmit} className="space-y-3 w-full flex flex-col gap-y-6">
                    <button
                        type={'button'}
                        color="primary"
                        onClick={() => dispatch(closeLoginModal())}
                        className="absolute top-6 right-6"
                    ><MdCancel size={24}/></button>

                    <span className='w-full relative flex flex-col'>
                <label className={'font-medium'}>Email</label>
                <InputText id='email' value={formik.values.email} onChange={formik.handleChange}
                           className='w-full pl-2 h-12 rounded border'/>
                <small className='text-xs text-red-600 absolute -bottom-5'>Hello Guys</small>
              </span>

                    <span className='w-full relative flex flex-col'>
                <label className={'font-medium'}>Password</label>
                <InputText id='password' value={formik.values.password} type={'password'} onChange={formik.handleChange}
                           className='w-full pl-2 h-12 rounded border'/>
                <small className='text-xs text-red-600 absolute -bottom-5'>Hello Guys</small>
              </span>

                    <Button
                        text="Login"
                        // text={t("loginForm.loginButton")}
                        type="submit"
                        color="primary"
                        animation
                        size="small"
                        className="w-full bg-primary hover:bg-primaryDark text-mywhite py-3 rounded-lg transition duration-200 "
                    />
                    <Button
                        size="small"
                        outline
                        icon={IoLogoGoogleplus}
                        iconSize={23}
                        className="w-full bg-transparent hover:bg-primaryLight border border-primary text-primary hover:text-mywhite rounded-lg py-3 transition duration-200"
                    />
                </form>

                {/* login , register modal  */}
                <p
                    className="w-full  text-center hover:underline cursor-pointer text-primary font-semibold"
                    onClick={()=> handleChangeModal()}
                >
                    Don’t have an account? Sign up
                    {/* {t("loginForm.noAccount")} */}
                </p>
            </div>
        </div>
    );
}

export default LoginForm;