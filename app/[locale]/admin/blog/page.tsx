"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import Loading from "@/components/utils/Loading";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useTranslations } from "next-intl";
import { Button } from "primereact/button";
import { Dialog } from "@mui/material";
import { FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import NotFoundBlogs from "@/components/error/NotFoundBlogs";
import Image from "next/image";
import { deleteBlogDispatch, getAllBlogDispatch } from "@/store/adminSlice";

function AdminAllBlogPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { blogs, loading, blogPage } = useSelector(
    (state: RootState) => state.admin
  );
  const t = useTranslations();
  const [visible, setVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pageable, setPageable] = useState({ currentPage: 0, size: 15 });

  useEffect(() => {
    dispatch(getAllBlogDispatch(pageable.currentPage, pageable.size));
  }, [dispatch, pageable.currentPage, pageable.size]);

  const handleDelete = (id: string) => {
    setSelectedId(id);
    setVisible(true);
  };

  const confirmDelete = () => {
    if (selectedId !== null) {
      dispatch(deleteBlogDispatch(selectedId));
      setVisible(false);
    }
  };

  const onPageChange = (event) => {
    setPageable({ size: event.rows, currentPage: event.page });
  };

  const actionBodyTemplate = (rowData: { id: string }) => (
    <Button
      icon="pi pi-trash"
      className="p-button-danger p-button-sm"
      onClick={() => handleDelete(rowData.id)}
    >
      <FaTimes size={14} />
    </Button>
  );

  const imageBodyTemplate = (rowData) => {
    return (
      <Image
        key={rowData.id}
        src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${rowData.image}`}
        alt={rowData.image}
        width={50}
        height={50}
        className={"rounded"}
      />
    );
  };

  return (
    <div className="">
      {loading ? (
        <Loading />
      ) : blogs.length > 0 ? (
        <div className="overflow-x-auto ">
          <DataTable
            value={blogs}
            className="min-w-full table-layout-auto"
            lazy={true}
            paginator
            rows={pageable.size}
            first={pageable.currentPage}
            totalRecords={blogPage.totalElements}
            onPage={onPageChange}
            rowsPerPageOptions={[15, 25, 100]}
          >
            <Column
              field="image"
              header={t("adminTranslate.blogs.image")}
              className="whitespace-nowrap"
              body={imageBodyTemplate}
            />

            <Column
              field="title"
              header={t("adminTranslate.blogs.title")}
              className="whitespace-nowrap"
            />
            <Column
              field="category"
              header={t("adminTranslate.blogs.category")}
              className="whitespace-nowrap"
            />
            <Column
              field="content"
              header={t("adminTranslate.blogs.content")}
              className="whitespace-nowrap"
              body={(rowData) => (
                <div className="line-clamp-4 max-w-48">{rowData.content}</div>
              )}
            />

            <Column
              header={t("adminTranslate.process")}
              body={actionBodyTemplate}
              className="text-center"
            />
          </DataTable>
        </div>
      ) : (
        <NotFoundBlogs />
      )}

      {/* Silme onay diyalogu */}
      <Dialog
        open={visible}
        onClose={() => setVisible(false)}
        maxWidth="sm"
        fullWidth
      >
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-3">
            {t("adminTranslate.sureMessage")}
          </h3>
          <div className="flex justify-end gap-2">
            <Button
              className="p-button-secondary"
              onClick={() => setVisible(false)}
            >
              <FaTimes size={18} />
            </Button>
            <Button
              icon="pi pi-trash"
              className="p-button-danger"
              onClick={confirmDelete}
            >
              <FaCheck size={18} />
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default AdminAllBlogPage;
