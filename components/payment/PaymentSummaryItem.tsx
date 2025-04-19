import React from "react";
import {
  FaTag,
  FaHashtag,
  FaTshirt,
  FaPalette,
  FaBoxes,
  FaList,
} from "react-icons/fa";
import { MdOutlineNumbers } from "react-icons/md";
import { RiHashtag } from "react-icons/ri";

function PaymentSummaryItem({ product, summaryNumber }) {
  return (
    <div className="w-full bg-white border rounded-xl shadow p-4 hover:shadow-lg transition-shadow duration-300  md:min-h-32 lg:min-h-36  ">
      <div className="flex flex-col gap-2">
        <div className="font-semibold text-gray-800 text-[10px] md:text-xs flex items-center gap-2 border-b pb-2  ">
          <FaTag className="text-secondary text-sm md:text-xl" />
          <h3> {product.name}</h3>
          <span className="flex justify-center items-center  ">
            <RiHashtag size={14} />
            {summaryNumber}
          </span>
        </div>

        <ul className="flex flex-col gap-2 text-[9px] md:text-xs">
          <li className="flex justify-start items-center flex-wrap gap-2">
            <div className="flex justify-between items-center text-gray-700">
              <span className="flex items-center gap-1 font-semibold">
                <MdOutlineNumbers className="text-gray-600" /> Fiyat:
              </span>
              <span>{product.price}₺</span>
            </div>

            <div className="flex justify-between items-center text-gray-700">
              <span className="flex items-center gap-1 font-semibold">
                <FaBoxes className="text-gray-600" /> Adet:
              </span>
              <span>{product.quantity}</span>
            </div>
            <div className="flex justify-between items-center text-gray-700">
              <span className="flex items-center gap-1 font-semibold">
                <FaTshirt className="text-gray-600" /> Beden:
              </span>
              <span>{product.size}</span>
            </div>
          </li>

          <li className="flex justify-start items-center flex-wrap  gap-2 ">
            <div className="flex justify-between items-center text-gray-700">
              <span className="flex items-center gap-1 font-semibold">
                <FaPalette className="text-gray-600" /> Renk:
              </span>
              <span>{product.color}</span>
            </div>

            <div className="flex justify-between items-center text-gray-700">
              <span className="flex items-center gap-1 font-semibold">
                <FaHashtag className="text-gray-600" /> Stok Kodu:
              </span>
              <span>{product.stockCode}</span>
            </div>

            <div className="flex justify-between items-center text-gray-700">
              <span className="flex items-center gap-1 font-semibold">
                <FaList className="text-gray-600" /> Kategori:
              </span>
              <span>{product.category1}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PaymentSummaryItem;
