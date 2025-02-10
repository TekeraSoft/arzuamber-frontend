'use client'
import React, {useEffect} from "react";
import {DataTable} from "primereact/datatable";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store";
import {getAllProductDispatch} from "@/store/adminSlice";
import {Column} from "primereact/column";

function AllProductAdminPage() {
  const { products } = useSelector((state:RootState)=> state.admin)
  const dispatch = useDispatch<AppDispatch>();
  useEffect(()=> {
    dispatch(getAllProductDispatch(0,10))
  },[dispatch])

  return (
      <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
        <Column field="code" header="Code"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="category" header="Category"></Column>
        <Column field="colorSize" header="Quantity" body={(item) => (
            <span>{item.stock}</span>
        )}></Column>
      </DataTable>
  )
}

export default AllProductAdminPage;
