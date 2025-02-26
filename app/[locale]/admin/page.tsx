'use client'
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store";
import {getAllOrdersDispatch} from "@/store/adminSlice";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

function AdminPage() {
    const dispatch = useDispatch<AppDispatch>()
    const {orders} = useSelector((state:RootState) => state.admin)
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
        <DataTable>

        </DataTable>
      </div>
  );
}

export default AdminPage;
