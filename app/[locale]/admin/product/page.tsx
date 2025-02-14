'use client'
import React, {useEffect, useState} from "react";
import {DataTable} from "primereact/datatable";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store";
import {deleteProductDispatch, getAllProductDispatch, updatePriceByPercentageDispatch} from "@/store/adminSlice";
import {Column} from "primereact/column";
import {InputNumber} from "primereact/inputnumber";
import {FaPercent} from "react-icons/fa";
import Image from 'next/image'
import {BiCheck, BiEdit} from "react-icons/bi";
import {MdDelete} from "react-icons/md";
import {CgClose} from "react-icons/cg";

function AllProductAdminPage() {
  const { products, loading } = useSelector((state:RootState)=> state.admin)
  const dispatch = useDispatch<AppDispatch>();

  const [percentageValue, setPercentageValue] = useState(0);

  useEffect(()=> {
    dispatch(getAllProductDispatch(0,10))
  },[dispatch])

    const formattedData = products.flatMap(product =>
        product.colorSize.map(item => ({
            id: product.id,
            populate: product.populate,
            newSeason: product.newSeason,
            purchasePrice: product.purchasePrice,
            productName: product.name,
            category: product.category,
            price: product.price,
            discountPrice: product.discountPrice,
            color: item.color,
            stockSize: item.stockSize,
            stockCode: item.stockCode,
            images: item.images
        }))
    );

    const imageBodyTemplate = (rowData) => {
        return (
            <div style={{ display: "flex", gap: "5px" }}>
                {rowData.images.slice(0, 3).map((img, index) => (
                    <Image key={index} src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${img}`}
                           alt={img} width={35} height={35} className={'rounded'} />
                ))}
            </div>
        );
    };

    return (
        <DataTable size={'large'} value={formattedData}
                   tableStyle={{ minWidth: '50rem', fontSize: '14px' }}
                   paginator rows={10} rowsPerPageOptions={[10, 25, 50]}
                   loading={loading}>
            <Column header={'Resimler'} body={imageBodyTemplate} />
            <Column field="productName" header="Ürün Adı" />
            <Column field="category" header="Kategori" />
            <Column field="price" bodyStyle={{fontWeight:'bold'}} body={(row) => row.price + " TL"} header={()=> (
                <span className={'flex flex-row items-center gap-x-2'}>
                    <h2>Fiyat</h2>
                    <span className={'w-full flex flex-row items-center gap-x-2'}>
                        <InputNumber value={percentageValue} onChange={(e)=> setPercentageValue(e.value)} className={'w-16 h-10'} />
                        <button onClick={()=> {
                            dispatch(updatePriceByPercentageDispatch(parseFloat(String(percentageValue)).toFixed(1)))
                            setPercentageValue(0);
                        }} className={'bg-blue-600 rounded-full p-2 text-white'}><FaPercent /></button>
                    </span>
                </span>
            )} />
            <Column field={'purchasePrice'} header={'Satın Alım'} />
            <Column field={'populate'} header={'Popular'} body={(row) => row.populate === true ? <BiCheck size={20} color={'green'} />: <CgClose size={20} color={'red'} />} />
            <Column field={'newSeason'} header={'New Season'} body={(row) => row.newSeason === true ? <BiCheck size={20} color={'green'} />: <CgClose size={20} color={'red'} />} />
            <Column field="color" header="Renk" />
            <Column field="stockSize" header="Beden" body={(row)=> (
                <div className={'flex flex-col gap-y-2'}>
                    {
                        row.stockSize.map((item,index) => (
                            <span key={index}>{item.size}</span>
                        ))
                    }
                </div>
            )}/>
            <Column bodyStyle={{fontWeight:'bold'}} field="stock" header="Stok" body={(row)=> (
                <div className={'flex flex-col gap-y-2'}>
                    {
                        row.stockSize.map((item,index) => (
                            <span key={index} className={`${item.stock === 2 ? 'text-red-600':'text-black'}`}>{item.stock}</span>
                        ))
                    }
                </div>
            )} />
            <Column field="stockCode" header="Stok Kodu" />
            <Column field={'id'} header={'Actions'} body={(opt)=> (
                <span className={"flex flex-row gap-x-1"}>
                    <button className={'p-2'}><BiEdit size={24} color={'blue'}/></button>
                    <button onClick={()=> {
                        const confRes = confirm('Are you sure delete this product?');
                        if(confRes) dispatch(deleteProductDispatch(opt.id))
                    }} className={'p-2'}><MdDelete size={24} color={'red'}/></button>
                </span>
            )}/>
        </DataTable>
    )
}

export default AllProductAdminPage;
