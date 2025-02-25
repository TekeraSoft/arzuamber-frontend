'use client'
import '@/app/[locale]/globals.css'
import {InputText} from "primereact/inputtext";
import React, {useEffect, useState} from "react";
import {InputNumber} from "primereact/inputnumber";
import {useFormik} from "formik";
import {FiUpload} from "react-icons/fi";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import {FaMinus, FaPlus} from "react-icons/fa";
import {MdCancel} from "react-icons/md";
import {filterData} from "@/data/filterData";
import {Checkbox} from "primereact/checkbox";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store";
import {createProductDispatch, getCategoriesDispatch, getProductDispatch} from "@/store/adminSlice";
import Resizer from 'react-image-file-resizer'
import {useParams} from "next/navigation";

export default function ProductCreatePage() {
    const dispatch = useDispatch<AppDispatch>();
    const params = useParams();
    const {categories, loading} = useSelector((state:RootState) => state.admin)
    const [subCategoriesState,setSubCategoriesState] = useState([])
    const formik = useFormik({
        initialValues: {
            name: '',
            category: '',
            subCategory: '',
            description: '',
            populate: false,
            newSeason: false,
            length: '',
            colorSize: [{color:'', sizeStock:[{size:'', stock:0}], images: []}],
            price: 0.0,
            purchasePrice: 0.0,
        },
        onSubmit: async (values, { resetForm }) => {
            const formData = new FormData();

            // ✅ JSON verisini FormData'ya ekle
            formData.append("data", new Blob([JSON.stringify(values)], { type: "application/json" }));

            // ✅ Küçültülmüş resimleri doğrudan FormData'ya ekle
            for (const colorItem of values.colorSize) {
                for (const [index, image] of colorItem.images.entries()) {
                    if (image instanceof File) {
                        const fileName = `${colorItem.color}_${index}_${image.name}`;
                        formData.append("images", new File([image], fileName, { type: image.type }));
                    }
                }
            }
            dispatch(createProductDispatch(formData, resetForm));
        }
    })


    useEffect(() => {
        dispatch(getProductDispatch(params.id))
        dispatch(getCategoriesDispatch())
    }, [params, dispatch]);

    const handleSelectSubCategories = (name) => {
        const updateState = categories.find((c) => c.name === name)
        setSubCategoriesState(updateState.subCategories)
    }


    const handleImageChange = async (event, index, imageIndex) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            // ✅ Resizer ile resmi küçült
            const resizeImage = (file) => {
                return new Promise((resolve) => {
                    Resizer.imageFileResizer(
                        file,
                        920, // ✅ Genişlik
                        1840, // ✅ Yükseklik
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

            try {
                const resizedImage = await resizeImage(file);  // ✅ Resmi küçült
                const newImages = [...formik.values.colorSize];

                if (!newImages[index].images) {
                    newImages[index].images = [];
                }

                newImages[index].images[imageIndex] = resizedImage; // ✅ Küçültülmüş resmi kaydet

                formik.setFieldValue("colorSize", newImages);
            } catch (error) {
                console.error("Resim küçültme hatası:", error);
            }
        }
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className='flex flex-col'>
                <div className={'flex flex-row items-center justify-between'}>
                    <h1 className='text-3xl'>Create Product</h1>
                    <button
                        type={'button'}
                        onClick={()=> formik.setFieldValue('colorSize', [
                                ...formik.values.colorSize,
                            { color: '', sizeStock: [{ size: '', stock: 0 }], images: [] }
                        ])}
                        className={'rounded-full border bg-secondary w-fit h-fit p-2 px-4 text-mywhite flex flex-row gap-x-2 items-center'}>
                        Add Color And Size
                        <FaPlus/></button>
                </div>
                <div className='grid grid-cols-2 gap-x-2 mt-12 relative'>
                    {formik.values.colorSize.map((item, index) => (
                        <div key={index}
                             className='rounded bg-white relative flex flex-col justify-center items-center gap-y-4 p-6 border'>
                            <button
                                type={'button'}
                                onClick={() => {
                                    const newColorSizeState = formik.values.colorSize.filter((_, i) => i !== index);
                                    formik.setFieldValue('colorSize', newColorSizeState);
                                }}
                                className={`${index === 0 ? 'hidden' : 'block'} absolute right-2 top-2 text-red-600`}>
                                <MdCancel size={20}/>
                            </button>

                            <div className='flex flex-row gap-x-4'>
                                {[0, 1, 2].map((imageIndex) => (
                                    <div key={imageIndex} className="flex flex-col items-center space-y-2">
                                        <input
                                            type="file"
                                            id={`file-upload-${index}-${imageIndex}`}
                                            className="hidden"
                                            onChange={(e) => handleImageChange(e, index, imageIndex)}
                                        />
                                        <label htmlFor={`file-upload-${index}-${imageIndex}`}
                                               className="w-24 h-48 flex items-center justify-center rounded-lg border cursor-pointer transition duration-200 overflow-hidden">
                                            {item.images?.[imageIndex] instanceof File ? (
                                                <img src={URL.createObjectURL(item.images[imageIndex])} alt="Preview"
                                                     className="w-24 h-48 object-cover rounded-lg"/>
                                            ) : (
                                                <FiUpload className="text-2xl"/>
                                            )}
                                        </label>
                                    </div>
                                ))}
                            </div>

                            <div className='flex flex-col w-full gap-y-2 relative'>
                                <div className='flex flex-col w-full'>
                                    <label>Color</label>
                                    <Dropdown options={filterData.colors.values}
                                              value={formik.values.colorSize[index].color}
                                              onChange={(e) => formik.setFieldValue(`colorSize[${index}].color`, e.value)}/>
                                </div>
                                    {
                                        formik.values.colorSize[index].sizeStock.map((item, sizeStockIndex) => (
                                            <div key={sizeStockIndex} className={'grid grid-cols-2 gap-x-2 mt-2'}>
                                                <div  className='flex flex-col w-2/3'>
                                                    <label>Size</label>
                                                    <Dropdown value={formik.values.colorSize[index].sizeStock[sizeStockIndex].size}
                                                              options={filterData.sizes.values}
                                                              onChange={(e) => formik.setFieldValue(`colorSize[${index}].sizeStock[${sizeStockIndex}].size`,e.value)}/>
                                                </div>

                                                <div className='flex flex-col relative w-2/3'>
                                                    <label>Stock</label>
                                                    <InputNumber
                                                                 onChange={(e) => formik.setFieldValue(`colorSize[${index}].sizeStock[${sizeStockIndex}].stock`, e.value)}
                                                                 value={formik.values.colorSize[index].sizeStock[sizeStockIndex].stock}/>
                                                     <div
                                                            className={'flex flex-row gap-x-4 absolute -right-20 top-9'}>
                                                            <button type={'button'} onClick={() => {
                                                                formik.setFieldValue(`colorSize[${index}].sizeStock`, [...formik.values.colorSize[index].sizeStock, {
                                                                    size: '',
                                                                    stock: 0
                                                                }])
                                                            }}
                                                                    className={'bg-blue-600 rounded-full p-1 text-white'}>
                                                                <FaPlus/>
                                                            </button>
                                                            <button type={'button'}
                                                                    onClick={() => {
                                                                        const newState = formik.values.colorSize[index].sizeStock.filter((_, i) => i !== sizeStockIndex)
                                                                        formik.setFieldValue(`colorSize[${index}].sizeStock`, newState)
                                                                    }}
                                                                className={'bg-red-600 rounded-full p-1 text-white'}>
                                                                <FaMinus/></button>
                                                        </div>

                                                </div>
                                            </div>
                                        ))
                                    }
                            </div>
                        </div>
                    ))}
                </div>

                <div className='grid grid-cols-3 items-center gap-y-9 gap-x-4 my-8'>
                   <span className="p-float-label">
                    <InputText id="name" type='text' className='w-full'
                               onChange={formik.handleChange}
                               value={formik.values.name}/>
                    <label htmlFor="username">Product Name</label>
                   </span>
                    <span className="p-float-label">
                    <InputNumber id="price" name='price' className='w-full'
                                 onValueChange={formik.handleChange}
                                 value={formik.values.price}
                                 mode='currency'
                                 currency='TRY'/>
                    <label htmlFor="price">Price</label>
                   </span>

                    <div className={'flex flex-row gap-x-2 w-full'}>
                        <span className="p-float-label w-full">
                    <Dropdown options={categories.map(i => i.name)} id="category" className='w-full'
                              value={formik.values.category}
                              onChange={(e) => {
                                  formik.setFieldValue(`category`, e.target.value);
                                  handleSelectSubCategories(e.target.value);
                              }}/>
                    <label htmlFor="username">Category</label>
                   </span>
                        <span className="p-float-label w-full">
                    <Dropdown options={subCategoriesState} id="subCategory" className='w-full'
                              value={formik.values.subCategory}
                              onChange={(e) => {
                                  formik.setFieldValue(`subCategory`, e.target.value);
                              }}/>
                    <label htmlFor="username">Sub Category</label>
                   </span>
                    </div>

                    <span className="p-float-label">
                    <Dropdown options={filterData?.lengths.values} id="length" className='w-full'
                              value={formik.values.length}
                              onChange={formik.handleChange}/>
                    <label htmlFor="username">Length</label>
                   </span>

                    <div className={'flex flex-row items-center gap-x-6'}>
                        <div className="flex align-items-center">
                            <Checkbox id={'populate'}
                                      onChange={e => formik.setFieldValue('populate', e.checked)}
                                      checked={formik.values.populate === true}/>
                            <label htmlFor="ingredient1" className="ml-2">İs Populate</label>
                        </div>

                        <div className="flex align-items-center">
                            <Checkbox id={'newSeason'}
                                      onChange={e => formik.setFieldValue('newSeason', e.checked)}
                                      checked={formik.values.newSeason === true}/>
                            <label htmlFor="ingredient1" className="ml-2">New Season</label>
                        </div>
                    </div>

                    <span className="p-float-label">
                    <InputNumber id="purchasePrice" name='purchasePrice' className='w-full'
                                 onValueChange={formik.handleChange}
                                 value={formik.values.purchasePrice}
                                 mode='currency'
                                 currency='TRY'/>
                    <label htmlFor="price">Purchase Price</label>
                   </span>
                </div>
            </div>
            <div className='w-full'>
                <textarea placeholder={'Description'} className={'w-full p-2 border-2 rounded'}
                          rows={6} value={formik.values.description} onChange={formik.handleChange} id="description"/>
            </div>
            <div className='flex w-100 justify-end'>
                <Button type='button' onClick={formik.handleSubmit} className='font-bold'>Send</Button>
            </div>

        </form>
    )
}