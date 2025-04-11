"use client";
import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  clearStateAdminSearchProducts,
  deleteProductDispatch,
  getAllProductDispatch,
  searchAdminProductDispatch,
  setCommentProduct,
  updateActiveDispatch,
  updatePriceByPercentageDispatch,
} from "@/store/adminSlice";
import { Column } from "primereact/column";
import { InputNumber } from "primereact/inputnumber";
import { FaPercent } from "react-icons/fa";
import Image from "next/image";
import {
  BiCheck,
  BiEdit,
  BiSearch,
  BiSolidMessageSquareDetail,
} from "react-icons/bi";
import { MdCancel, MdDelete } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import { Link } from "@/i18n/routing";
import { Checkbox } from "primereact/checkbox";
import { useSession } from "next-auth/react";
import { TbMessageCircleUser } from "react-icons/tb";
import AdminResponse from "@/components/admin/Product/Comments/AdminResponse";
import { SpinnerIcon } from "primereact/icons/spinner";
import { InputText } from "primereact/inputtext";
import useDebounce from "@/hooks/debounceHook";

function AllProductAdminPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");

  const { products, loading, page, searchAdminProducts } = useSelector(
    (state: RootState) => state.admin,
  );
  const [expandedRows, setExpandedRows] = useState(null);
  const [pageable, setPageable] = useState({ currentPage: 0, size: 15 });
  const [percentageValue, setPercentageValue] = useState(0);

  // Modal kontrolü için state
  const [showCommentModal, setShowCommentModal] = useState(false);

  // Ürün yorumları için state
  const [selectedProduct, setSelectedProduct] = useState(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    dispatch(getAllProductDispatch(pageable.currentPage, pageable.size));
  }, [pageable.currentPage, pageable.size, dispatch]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(searchAdminProductDispatch(debouncedSearchTerm));
    } else {
      dispatch(clearStateAdminSearchProducts());
    }
  }, [debouncedSearchTerm, dispatch]);

  const allowExpansion = (rowData) => {
    return rowData.colorSize.length > 0;
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <div style={{ display: "flex", gap: "5px" }}>
        {rowData.colorSize.map((item, index) => (
          <Image
            key={index}
            src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${item.images[0]}`}
            alt={item.images[0]}
            width={35}
            height={35}
            className={"rounded"}
          />
        ))}
      </div>
    );
  };

  const rowExpansionTemplate = (data) => {
    return (
      <DataTable
        size={"small"}
        tableStyle={{ minWidth: "50rem", fontSize: "14px" }}
        value={data.colorSize}
      >
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
                    item.stock === 2 || item.stock === 1
                      ? "text-red-600"
                      : "text-black"
                  }`}
                >
                  {item.stock}
                </span>
              ))}
            </div>
          )}
        />
      </DataTable>
    );
  };

  const onPageChange = (event) => {
    setPageable({ size: event.rows, currentPage: event.page });
  };

  return (
    <div>
      <DataTable
        size={"small"}
        value={searchAdminProducts?.length > 0 ? searchAdminProducts : products}
        className={"rounded-lg"}
        tableStyle={{ minWidth: "50rem", fontSize: "14px" }}
        paginator
        lazy={true}
        first={pageable.currentPage * pageable.size}
        rows={pageable.size}
        rowsPerPageOptions={[15, 30, 50, 70]}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        totalRecords={page.totalElements}
        onPage={onPageChange}
        loading={loading}
        rowExpansionTemplate={rowExpansionTemplate}
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
      >
        <Column expander={allowExpansion} style={{ width: "5rem" }} />
        <Column header={"Resimler"} body={imageBodyTemplate} />
        <Column
          field="name"
          header={() => (
            <div className={"flex w-full flex-row items-center gap-x-2"}>
              <h3 className={"w-full"}>Product Name</h3>
              <span className="p-input-icon-right w-full">
                {loading ? (
                  <SpinnerIcon />
                ) : searchAdminProducts.length > 0 ? (
                  <MdCancel
                    onClick={() => {
                      dispatch(clearStateAdminSearchProducts());
                      setSearchTerm("");
                    }}
                    size={18}
                    className={"cursor-pointer"}
                  />
                ) : (
                  <BiSearch size={18} />
                )}
                <InputText
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={"w-44 rounded !shadow-none !outline-none !h-10"}
                />
              </span>
            </div>
          )}
        />
        <Column field="category" header="Kategori" />
        <Column
          field="price"
          bodyStyle={{ fontWeight: "bold" }}
          body={(row) =>
            row.price.toLocaleString("tr-TR", {
              style: "currency",
              currency: "TRY",
            })
          }
          header={() => (
            <span className={"flex flex-row items-center gap-x-2"}>
              <h2>Fiyat</h2>
              {session?.user.role[0] === "SUPER_ADMIN" && (
                <span className={"w-full flex flex-row items-center gap-x-2"}>
                  <InputNumber
                    value={percentageValue}
                    onChange={(e) => setPercentageValue(e.value)}
                    className={"w-16 h-10"}
                  />
                  <button
                    onClick={() => {
                      const isConfirm = confirm(
                        "Are you sure you want to apply to all prices?",
                      );
                      if (isConfirm) {
                        dispatch(
                          updatePriceByPercentageDispatch(
                            parseFloat(
                              parseFloat(String(percentageValue)).toFixed(1),
                            ),
                          ),
                        );
                        setPercentageValue(0);
                      } else {
                        setPercentageValue(0);
                      }
                    }}
                    className={"bg-blue-600 rounded-full p-2 text-white"}
                  >
                    <FaPercent />
                  </button>
                </span>
              )}
            </span>
          )}
        />
        <Column
          field={"purchasePrice"}
          header={"Satın Alım"}
          body={(row) =>
            row.purchasePrice.toLocaleString("tr-TR", {
              style: "currency",
              currency: "TRY",
            })
          }
        />
        <Column
          field={"purchasePrice"}
          header={"İndirimli Fiyat"}
          body={(row) =>
            row.discountPrice.toLocaleString("tr-TR", {
              style: "currency",
              currency: "TRY",
            })
          }
        />
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
            <Checkbox
              id={"populate"}
              value={row.isActive}
              onChange={(e) =>
                dispatch(updateActiveDispatch(row.id, e.checked))
              }
              checked={row.isActive === true}
            />
          )}
        />
        <Column
          field={"id"}
          header={"Actions"}
          body={(opt) => (
            <span className={"flex flex-row gap-x-3"}>
              <Link target={"_blank"} href={`/product/${opt.slug}`}>
                <BiSolidMessageSquareDetail
                  size={24}
                  className={"text-teal-200"}
                />
              </Link>
              <Link href={`/admin/product/update/${opt.id}`}>
                <BiEdit size={24} color={"blue"} />
              </Link>
              <button
                onClick={() => {
                  const confRes = confirm("Are you sure delete this product?");
                  if (confRes) dispatch(deleteProductDispatch(opt.id));
                }}
              >
                <MdDelete size={24} color={"red"} />
              </button>
              <button
                onClick={() => {
                  setSelectedProduct(opt); // Seçilen ürünü set et
                  dispatch(setCommentProduct(opt));
                  setShowCommentModal(true);
                }}
                className="relative"
              >
                <TbMessageCircleUser size={24} />
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[11px] rounded-full w-4 h-4 flex items-center justify-center">
                  {opt.comments.length}
                </span>
              </button>
            </span>
          )}
        />
      </DataTable>

      <AdminResponse
        showCommentModal={showCommentModal}
        setShowCommentModal={setShowCommentModal}
      />
    </div>
  );
}

export default AllProductAdminPage;
