'use client'
import React, {useEffect, useState} from "react";
import {format} from "date-fns/format";
import { tr } from "date-fns/locale";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store";
import {getAllOrdersDispatch} from "@/store/adminSlice";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

function AdminPage() {
    const dispatch = useDispatch<AppDispatch>()
    const {orders,page,loading} = useSelector((state:RootState) => state.admin)
    const [pageable,setPageable] = useState({currentPage:0, size:15})

    useEffect(() => {
        dispatch(getAllOrdersDispatch(pageable.currentPage,pageable.size))
    }, [pageable.currentPage, pageable.size]);

    const onPageChange = (event) => {
        console.log(event)
        setPageable({size: event.rows, currentPage: event.page});
    }

    console.log(orders)

    const rowExtensionTemplate = (data) => {
        return(
            <DataTable size={'small'} tableStyle={{ minWidth: "50rem", fontSize: "14px" }} value={data.basketItems}>
                <Column field={'name'} header={'Name'} />
                <Column field={'stockCode'} header={'Stock Code'} />
                <Column field={'color'} header={'Color'} />
                <Column field={'size'} header={'Size'} />
                <Column field={'quantity'} header={'Unit'} />
            </DataTable>
        )
    }

  return (
      <div className={'w-full h-screen'}>
        <DataTable
            size={'small'}
            value={orders}
            paginator
            rows={pageable.size}
            first={pageable.currentPage}
            totalRecords={page.totalElements}
            onPage={onPageChange}
            rowsPerPageOptions={[15, 25, 100]}
        >
            <Column header={'Buyer Name'} body={(data)=> (
                <span>{data.buyer.name} {data.buyer.surname}</span>
            )} />
            <Column field={'buyer.gsmNumber'} header={'Gsm Number'} />
            <Column field={'buyer.email'} header={'Gsm Number'} />
            <Column header={'Price'} body={(data)=> (
                <span className={'font-extrabold'}>{data.totalPrice.toLocaleString('tr-TR', {style: 'currency', currency:'TRY'})}</span>
            )} />
            <Column header={'Payment Status'} body={(data)=> (
                <span>{format(data.createdAt, "dd.MM.yyyy | HH:mm:ss", {locale: tr})}</span>
            )} />
            <Column field={'status'} header={'Payment Status'} />
        </DataTable>
      </div>
  );
}

export default AdminPage;
