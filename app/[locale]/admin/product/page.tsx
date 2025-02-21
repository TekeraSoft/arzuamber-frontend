"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  deleteProductDispatch,
  getAllProductDispatch,
  updatePriceByPercentageDispatch,
} from "@/store/adminSlice";
import { Column } from "primereact/column";
import { InputNumber } from "primereact/inputnumber";
import { FaPercent } from "react-icons/fa";
import Image from "next/image";
import { BiCheck, BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import {Link} from "@/i18n/routing";

function AllProductAdminPage() {
  const { products, loading } = useSelector((state: RootState) => state.admin);
  const [expandedRows, setExpandedRows] = useState(null);
  const dispatch = useDispatch<AppDispatch>();

  const [pageable, setPageable] = useState({currentSize:20,currentPage:0});

  const [percentageValue, setPercentageValue] = useState(0);

  useEffect(() => {
    dispatch(getAllProductDispatch(pageable.currentPage, pageable.currentSize));
  }, []);

    const allowExpansion = (rowData) => {
        return rowData.colorSize.length > 0;
    };

  //const formattedData = products.flatMap((product) =>
  //  product.colorSize.map((item) => ({
  //    id: product.id,
  //    populate: product.populate,
  //    newSeason: product.newSeason,
  //    purchasePrice: product.purchasePrice,
  //    productName: product.name,
  //    category: product.category,
  //    price: product.price,
  //    discountPrice: product.discountPrice,
  //    color: item.color,
  //    stockSize: item.stockSize,
  //    stockCode: item.stockCode,
  //    images: item.images,
  //  }))
  //);

  const imageBodyTemplate = (rowData,options) => {
    return (
      <div style={{ display: "flex", gap: "5px" }}>
        {rowData.colorSize.map((img, index) => (
          <Image
            key={index}
            src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${img.images[0]}`}
            alt={img}
            width={35}
            height={35}
            className={"rounded"}
          />
        ))}
      </div>
    );
  };

  const rowExpansionTemplate = (data) => {
      return(
          <DataTable size={'small'} tableStyle={{ minWidth: "50rem", fontSize: "14px" }} value={data.colorSize}>
              <Column field="stockCode" header="Stok Kodu" />
              <Column field="color" header="Renk" />
              <Column
                  field="stockSize"
                  header="Beden"
                  body={(row) => (
                      <div className={"flex flex-col gap-y-2"}>
                          {row.stockSize.map((item, index) => (
                              <span key={index}>{item.size}</span>
                          ))}
                      </div>
                  )}
              />
              <Column
                  bodyStyle={{ fontWeight: "bold" }}
                  field="stock"
                  header="Stok"
                  body={(row) => (
                      <div className={"flex flex-col gap-y-2"}>
                          {row.stockSize.map((item, index) => (
                              <span
                                  key={index}
                                  className={`${
                                      item.stock === 2 || item.stock === 1 ? "text-red-600" : "text-black"
                                  }`}
                              >
                {item.stock}
              </span>
                          ))}
                      </div>
                  )}
              />
          </DataTable>
      )
  }

  return (
    <DataTable
      size={"small"}
      value={products}
      className={'rounded-lg'}
      dataKey="id"
      tableStyle={{ minWidth: "50rem", fontSize: "14px" }}
      paginator
      rows={20}
      rowsPerPageOptions={[10, 25, 50]}
      loading={loading}
      rowExpansionTemplate={rowExpansionTemplate}
      expandedRows={expandedRows}
      onRowToggle={(e)=> setExpandedRows(e.data)}
    >
        <Column expander={allowExpansion} style={{ width: '5rem' }} />
      <Column header={"Resimler"} body={imageBodyTemplate} />
      <Column field="name" header="Ürün Adı" sortable />
      <Column field="category" header="Kategori" sortable />
      <Column
        field="price"
        sortable
        bodyStyle={{ fontWeight: "bold" }}
        body={(row)=> row.price.toLocaleString('tr-TR', {style: 'currency', currency:'TRY'})}
        header={() => (
            <span className={"flex flex-row items-center gap-x-2"}>
            <h2>Fiyat</h2>
            <span className={"w-full flex flex-row items-center gap-x-2"}>
              <InputNumber
                  value={percentageValue}
                onChange={(e) => setPercentageValue(e.value)}
                className={"w-16 h-10"}
              />
              <button
                onClick={() => {
                  dispatch(
                    updatePriceByPercentageDispatch(
                      parseFloat(parseFloat(String(percentageValue)).toFixed(1))
                    )
                  );
                  setPercentageValue(0);
                }}
                className={"bg-blue-600 rounded-full p-2 text-white"}
              >
                <FaPercent />
              </button>
            </span>
          </span>
        )}
      />
      <Column field={"purchasePrice"} header={"Satın Alım"} sortable body={(row) =>
          row.purchasePrice.toLocaleString('tr-TR', {style: 'currency', currency:'TRY'})} />
        <Column field={"purchasePrice"} header={"İndirimli Fiyat"} sortable body={(row) =>
            row.discountPrice.toLocaleString('tr-TR', {style: 'currency', currency:'TRY'})} />
      <Column
        field={"populate"}
        header={"Popular"}
        body={(row) =>
          row.populate === true ? (
            <BiCheck size={20} color={"green"} />
          ) : (
            <CgClose size={20} color={"red"} />
          )
        }
      />
      <Column
        field={"newSeason"}
        header={"New Season"}
        body={(row) =>
          row.newSeason === true ? (
            <BiCheck size={20} color={"green"} />
          ) : (
            <CgClose size={20} color={"red"} />
          )
        }
      />

      <Column
        field={"id"}
        header={"Actions"}
        body={(opt) => (
          <span className={"flex flex-row gap-x-1"}>
            <Link href={`/admin/product/update/${opt.id}`} className={"p-2"}>
              <BiEdit size={24} color={"blue"} />
            </Link>
            <button
              onClick={() => {
                const confRes = confirm("Are you sure delete this product?");
                if (confRes) dispatch(deleteProductDispatch(opt.id));
              }}
              className={"p-2"}
            >
              <MdDelete size={24} color={"red"} />
            </button>
          </span>
        )}
      />
    </DataTable>
  );
}

export default AllProductAdminPage;
