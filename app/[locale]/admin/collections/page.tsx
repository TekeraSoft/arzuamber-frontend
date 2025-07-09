"use client"
import { useFormik } from 'formik';
import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {IoMdClose} from "react-icons/io";

function Page() {
    const [open, setOpen] = React.useState(false);
    const [pageable, setPageable] = React.useState({page: 0, size: 20});
    const [image, setImage] = React.useState(null);

    const {products} = useSelector((state: RootState) => state.products);

    const onPageChange = (event) => {
        setPageable({ size: event.rows, size: event.page });
    };

    const handleCloseModal = () => {
        setOpen(!open)
    }

    const formik = useFormik({
        initialValues: {
            collectionName: '',
            products: [],
            description: ''
        },
        onSubmit: (values) => {
            const formData = new FormData();

            // ✅ JSON verisini FormData'ya ekle
            formData.append(
                "data",
                new Blob([JSON.stringify(values)], { type: "application/json" })
            );
            formData.append("image", image)
        }
    })

    return (
        <>
            <div className={"my-4 border rounded-lg p-3"}>

            </div>

            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]">
                <div className="bg-white px-6 py-10 rounded-md w-full max-w-lg relative">
                    {/* Close Button - Right Top Corner */}
                    <button
                        onClick={handleCloseModal}
                        className="absolute top-2 right-2 text-2xl bg-red-500 text-white rounded-md">
                        <IoMdClose />
                    </button>
                   <div className={'overflow-y-auto flex flex-col gap-y-2 h-64'}>
                       {
                           products.map((product,index) => (
                               <div className={'border rounded-lg p-2'}>
                                   <img src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${product?.image}`} />
                               </div>
                           ))
                       }
                   </div>

                </div>
            </div>
        </>
    );
}

export default Page;