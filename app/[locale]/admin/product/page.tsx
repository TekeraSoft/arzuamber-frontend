"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
    deleteProductDispatch,
    getAllProductDispatch, updateActiveDispatch,
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
import {Checkbox} from "primereact/checkbox";

function AllProductAdminPage() {
  const { products, loading, page } = useSelector((state: RootState) => state.admin);
  const [expandedRows, setExpandedRows] = useState(null);
  const dispatch = useDispatch<AppDispatch>();
    const [pageable, setPageable] = useState({currentPage: 0, size: 15})
  const [percentageValue, setPercentageValue] = useState(0);

  useEffect(() => {
    dispatch(getAllProductDispatch(pageable.currentPage, pageable.size));
  }, [pageable.currentPage,pageable.size]);

    const onPageChange = (event) => {
        console.log(event)
        setPageable({size: event.rows, currentPage: event.page});
    }

    const allowExpansion = (rowData) => {
        return rowData.colorSize.length > 0;
    };

    console.log(page)

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
      rows={pageable.size}
      first={pageable.currentPage}
      totalRecords={page.totalElements}
      onPage={onPageChange}
      rowsPerPageOptions={[15, 25, 100]}
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
            field={"newSeason"}
            header={"Is Active"}
            body={(row) => (
                <Checkbox id={'populate'}
                          value={row.isActive}
                          onChange={e => dispatch(updateActiveDispatch(row.id,e.checked))}
                          checked={row.isActive === true}/>
            )}
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
