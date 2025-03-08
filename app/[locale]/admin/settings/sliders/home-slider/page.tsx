"use client";

import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import Image from "next/image";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";

export default function HomeSliderPage() {
  const [sliders, setSliders] = useState<
    { id: string; title: string; image: string }[]
  >([]);
  const [visible, setVisible] = useState(false);
  const [sliderData, setSliderData] = useState({
    title: "",
    image: "",
  });
  const [editMode, setEditMode] = useState(false);
  const toast = useRef<Toast>(null);

  // Slider ekleme veya güncelleme
  const handleAdd = () => {
    if (editMode) {
      toast.current?.show({
        severity: "success",
        summary: "Başarı",
        detail: "Slider güncellendi",
      });
    } else {
      toast.current?.show({
        severity: "success",
        summary: "Başarı",
        detail: "Slider eklendi",
      });
    }
    setVisible(false);
    setSliderData({ title: "", image: "" });
    setEditMode(false);
  };

  // Slider düzenleme
  const handleEdit = (rowData: {
    id: string;
    title: string;
    image: string;
  }) => {
    setSliderData(rowData);
    setEditMode(true);
    setVisible(true);
  };

  // Slider silme
  const handleDelete = () => {
    toast.current?.show({
      severity: "warn",
      summary: "Silindi",
      detail: "Slider kaldırıldı",
    });
  };

  // Resim yükleme
  const handleFileUpload = (e: any) => {
    const file = e.files[0];
    console.log(file);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Toast ref={toast} />
      <div className="bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold text-primary text-center">
          Create New Slider
        </h2>
        <Button
          label="Add New Slider"
          icon={<FaPlus />}
          className="p-button-success my-3"
          onClick={() => setVisible(true)}
        />
        <DataTable value={sliders} className="mt-4">
          <Column field="title" header="Title" />
          <Column
            field="image"
            header="Image"
            body={(rowData) => (
              <Image
                src={rowData.image}
                alt="slider"
                width={64}
                height={64}
                className="object-cover rounded"
                unoptimized
              />
            )}
          />
          <Column
            header="Events"
            body={(rowData) => (
              <>
                <Button
                  icon={<FaEdit />}
                  className="p-button-warning mr-2"
                  onClick={() => handleEdit(rowData)}
                />
                <Button
                  icon={<FaTrash />}
                  className="p-button-danger"
                  onClick={() => handleDelete(rowData.id)}
                />
              </>
            )}
          />
        </DataTable>
      </div>

      {/* Modal Dialog */}
      <Dialog
        header="Slider Bilgileri"
        visible={visible}
        onHide={() => setVisible(false)}
      >
        <div className="p-fluid">
          <div className="flex flex-col justify-center items-start gap-2 min-w-96">
            <label>Title</label>
            <InputText
              value={sliderData.title}
              onChange={(e) =>
                setSliderData({ ...sliderData, title: e.target.value })
              }
            />

            <label className="mt-3">Upload Image</label>
            <FileUpload
              mode="basic"
              accept="image/*"
              maxFileSize={1000000}
              customUpload
              uploadHandler={handleFileUpload}
            />

            {sliderData.image && (
              <Image
                src={sliderData.image}
                alt="Preview"
                width={96}
                height={96}
                className="mt-2 object-cover rounded"
                unoptimized
              />
            )}

            <Button
              label={editMode ? "Edit" : "Add"}
              className="mt-4 p-button-primary"
              onClick={handleAdd}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
