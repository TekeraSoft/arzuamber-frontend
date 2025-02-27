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
    const [expandedRows, setExpandedRows] = useState(null);

    useEffect(() => {
        dispatch(getAllOrdersDispatch(pageable.currentPage,pageable.size))
    }, [pageable.currentPage, pageable.size]);

    const onPageChange = (event) => {
        setPageable({size: event.rows, currentPage: event.page});
    }

    const allowExpansion = (rowData) => {
        return rowData.basketItems.length > 0;
    };

    const rowExpansionTemplate = (data) => {
        return(
            <DataTable  size={'small'} tableStyle={{ minWidth: "50rem", fontSize: "12px" }} value={data.basketItems}>
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
            tableStyle={{ minWidth: "50rem", fontSize: "13px" }}
            value={orders}
            paginator
            rows={pageable.size}
            first={pageable.currentPage}
            totalRecords={page.totalElements}
            onPage={onPageChange}
            rowsPerPageOptions={[15, 25, 100]}
            rowExpansionTemplate={rowExpansionTemplate}
            expandedRows={expandedRows}
            onRowToggle={(e)=> setExpandedRows(e.data)}
        >
            <Column expander={allowExpansion} style={{ width: '5rem' }} />
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
            <Column header={'Shipping Address'} style={{width:'12rem'}} body={(data)=> (
                <span className={'text-[12px]'}>{data.shippingAddress.address} - {" "}
                     {data.shippingAddress.street} - {" "} {data.shippingAddress.state} / {data.shippingAddress.city}
                </span>
            )} />
            <Column header={'Payment Status'} body={(row)=> (

                row.status === 'PAID' ? (
                    <div className={'flex flex-row items-center justify-center'}>
                        <span className={' bg-green-400 font-bold rounded-full text-xs text-white px-2 p-1'}>{row.status}</span>
                    </div>
                ): (
                    <div className={'flex flex-row items-center justify-center'}>
                        <span className={' bg-green-400 font-bold rounded-full text-xs text-white p-1'}>{row.status}</span>
                    </div>
                )
            )}/>
        </DataTable>
      </div>
  );
}

export default AdminPage;
