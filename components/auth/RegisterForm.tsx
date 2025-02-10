"use client";

import Button from "@/components/general/Button";
import Heading from "@/components/general/Heading";
import { registerUserDispatch } from "@/store/authSlice";
import {AppDispatch, RootState} from "@/store/store";
import Link from "next/link";
import { IoLogoGoogleplus } from "react-icons/io";
import {useDispatch, useSelector} from "react-redux";
import {closeRegisterModal} from "@/store/modalsSlice";
import {useFormik} from "formik";
import {InputText} from "primereact/inputtext";

function RegisterForm() {
  const dispatch = useDispatch<AppDispatch>();
  const {isRegisterModalOpen} = useSelector((state:RootState)=> state.modals)

  const handleClose = () => {
    dispatch(closeRegisterModal())
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
      rePassword: ''
    },
    onSubmit: (values,{resetForm}) => {
      dispatch(registerUserDispatch(values,resetForm))
    }
  })

  return (
      <div
          onClick={(e) => {
            // Form dışına tıklanırsa kapanmasını sağlıyoruz
            if (e.target === e.currentTarget) {
              handleClose();
            }
          }}
          className={`${
              isRegisterModalOpen ? "fixed" : "hidden"
          } inset-0  bg-black bg-opacity-50 flex justify-center items-center z-50`}
      >
        <div
            className={`w-2/6 h-auto flex flex-col justify-center items-center bg-mywhite rounded-xl p-6 shadow-xl space-y-4 relative `}
        >
          <Heading
              center
              text="Create an Account"
              font="bold"
              textSize="2xl"
              color="black"
          />

          <form onSubmit={formik.handleSubmit} className={'flex flex-col gap-y-6 w-full'}>
            <div className="flex gap-3 w-full justify-start items-center">
              <span className='w-full relative flex flex-col'>
                <label className={'font-medium'}>Name</label>
                <InputText id='name' value={formik.values.name} onChange={formik.handleChange}
                           className='w-full pl-2 h-12 rounded border'/>
                <small className='text-xs text-red-600 absolute -bottom-5'>Hello guys</small>
              </span>
              <span className='w-full relative flex flex-col'>
                <label className={'font-medium'}>Surname</label>
                <InputText id='surname' value={formik.values.surname} onChange={formik.handleChange}
                           className='w-full pl-2 h-12 rounded border'/>
                <small className='text-xs text-red-600 absolute -bottom-5'>Hello Guys</small>
              </span>
            </div>
            <span className='w-full relative flex flex-col'>
                <label className={'font-medium'}>Email</label>
                <InputText id='name' value={formik.values.email} onChange={formik.handleChange}
                           className='w-full pl-2 h-12 rounded border'/>
              <small className='text-xs text-red-600 absolute -bottom-5'>Hello Guys</small>
              </span>
            <span className='w-full relative flex flex-col'>
                <label className={'font-medium'}>Password</label>
                <InputText id='name' value={formik.values.password} onChange={formik.handleChange}
                           className='w-full pl-2 h-12 rounded border'/>
              <small className='text-xs text-red-600 absolute -bottom-5'>Hello Guys</small>
              </span>
            <span className='w-full relative flex flex-col'>
                <label className={'font-medium'}>Re Password</label>
                <InputText id='name' type={'password'} value={formik.values.rePassword} onChange={formik.handleChange}
                           className='w-full pl-2 h-12 rounded border'/>
              <small className='text-xs text-red-600 absolute -bottom-5'>Hello Guys</small>
              </span>
            <div className="flex flex-col space-y-3 mt-4">
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
      </div>
        );
        }

        export default RegisterForm;