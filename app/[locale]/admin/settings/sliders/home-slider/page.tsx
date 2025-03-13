"use client";

import React, {useState, useRef, useEffect} from "react";
import {FiUpload} from "react-icons/fi";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import Resizer from "react-image-file-resizer";
import {MdCancel} from "react-icons/md";
import {Button} from "primereact/button";
import {createSliderDispatch, deleteSliderDispatch, getAllSliderImageDispatch} from "@/store/adminSlice";

export default function HomeSliderPage() {

    const dispatch = useDispatch();
    const {sliders,loading} = useSelector((state:RootState) => state.admin);
    const [selectedImages, setSelectedImages] = useState([]);

    useEffect(() => {
        dispatch(getAllSliderImageDispatch())
    }, []);

  const handleCreateImage = async (e) => {
      const resizeImage = (file) => {
          return new Promise((resolve) => {
              Resizer.imageFileResizer(
                  file,
                  1900, // ✅ Genişlik
                  800, // ✅ Yükseklik
                  "WEBP", // ✅ Format (PNG, WEBP de olabilir)
                  100, // ✅ Kalite (0-100 arasında)
                  0, // ✅ Rotasyon
                  (resizedFile) => {
                      resolve(new File([resizedFile], file.name, { type: file.type }));
                  },
                  "file" // ✅ Çıktıyı doğrudan File olarak al
              );
          });
      };
      const resizedImage = await resizeImage(e.target.files[0]);
      setSelectedImages(prev => [...prev, resizedImage]);
  }

  const handleSubmitImages = () => {
      const formData = new FormData();
      selectedImages.forEach((image) => {
          formData.append("images",image)
      })
      dispatch(createSliderDispatch(formData))
  }


  return (
    <div className="p-6">
        <div className={'flex items-center flex-wrap border rounded p-6 flex-row gap-x-6 gap-y-6'}>
            {
                sliders.map((slider,index) => (
                    <div key={index} className="flex flex-col items-center">
                        <label htmlFor={`file-upload}`}
                               className="w-48 h-24 flex relative items-center justify-center rounded-lg border cursor-pointer transition duration-200 overflow-hidden">
                            <MdCancel className={'text-red-600 absolute z-10 right-0 top-0'} onClick={() => {
                                const confirmDelete = confirm("Are you sure you want to delete image?");
                                if (confirmDelete) {
                                    dispatch(deleteSliderDispatch(slider.id))
                                }
                            }} size={24} />
                            <img src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${slider.url}`} alt="Preview"
                                 className="w-48 h-24 object-cover brightness-75 rounded-lg"/>

                        </label>
                    </div>
                ))
            }
            {
                selectedImages.map((slider,index) => (
                    <div key={index} className="flex flex-col items-center">
                        <label htmlFor={`file-upload}`}
                               className="w-48 h-24 relative flex items-center justify-center border cursor-pointer transition duration-200 overflow-hidden">
                            <MdCancel className={'text-red-600 absolute right-0 top-0'} onClick={() => {
                                const newImageState = selectedImages.filter((_,i) => i !== index);
                                setSelectedImages(newImageState);
                            }} size={24} />
                            <img src={URL.createObjectURL(slider)} alt="Preview"
                                 className="w-48 h-24 object-cover"/>

                        </label>
                    </div>
                ))
            }
            <div className="flex flex-col items-center">
                <input
                    type="file"
                    id={`file-upload`}
                    className="hidden"
                    onChange={(e) => handleCreateImage(e)}
                />
                <label htmlFor={`file-upload`}
                       className="w-48 h-24 flex items-center justify-center border cursor-pointer transition duration-200 overflow-hidden">
                        <FiUpload className="text-2xl"/>
                </label>
            </div>
        </div>
        <div className={'flex flex-row justify-end w-full'}>
            <Button onClick={handleSubmitImages} label={'Upload'} className={'mt-12'} icon={<FiUpload className={'mr-2'}/>} loading={loading} />
        </div>

    </div>
  );
}
