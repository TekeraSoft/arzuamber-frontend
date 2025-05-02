"use client";

import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { FaBoxes, FaCheckCircle, FaFire } from "react-icons/fa";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getAllProductsDispatch } from "@/store/productSlice";

Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function ProductDashBoard() {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.products);
  const [pageable, setPageable] = useState({ currentPage: 0, size: 70 });

  useEffect(() => {
    dispatch(getAllProductsDispatch(pageable.currentPage, pageable.size));
  }, [dispatch]);

  const totalProduct = products.length;

  const totalInStock = products.filter((p) => p.totalStock > 0).length;

  const mostStockProduct =
    products.length > 0
      ? products.reduce((prev, current) =>
          prev.totalStock > current.totalStock ? prev : current
        )
      : null;

  // Pie Chart: Category Distribution
  const categoryCounts = products.reduce((acc: any, product) => {
    const cat = product.category;
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        data: Object.values(categoryCounts),
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#cc65fe",
          "#ffce56",
          "#4bc0c0",
        ],
      },
    ],
  };

  const stockData = {
    labels: products.map((p) => p.name),
    datasets: [
      {
        label: "Toplam Stok",
        data: products.map((p) =>
          p.colorSize.reduce(
            (total, color) =>
              total + color.stockSize.reduce((s, size) => s + size.stock, 0),
            0
          )
        ),
        backgroundColor: "#60a5fa", // mavi
      },
    ],
  };

  const stockOptions = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: { beginAtZero: true },
    },
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-8">
      <h1 className="text-2xl font-bold">📦 Ürün Yönetim Paneli</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-4 bg-white shadow rounded-xl flex items-center space-x-4"
        >
          <FaBoxes className="text-indigo-500 text-3xl" />
          <div>
            <p className="text-gray-500">Toplam Ürün</p>
            <p className="text-xl font-semibold">{totalProduct}</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-4 bg-white shadow rounded-xl flex items-center space-x-4"
        >
          <FaCheckCircle className="text-green-500 text-3xl" />
          <div>
            <p className="text-gray-500">Stokta Olan Ürün</p>
            <p className="text-xl font-semibold">{totalInStock}</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-4 bg-white shadow rounded-xl flex items-center space-x-4"
        >
          <FaFire className="text-red-500 text-3xl" />
          <div>
            <p className="text-gray-500">En Çok Stoklu Ürün</p>
            <p className="text-xl font-semibold">
              {mostStockProduct?.name || "Yok"}
            </p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-2  max-w-7xl  gap-6">
        <div className="p-4 bg-white shadow rounded-xl">
          <h2 className="text-lg font-semibold mb-2">
            Kategoriye Göre Ürünler
          </h2>
          <Pie data={pieData} />
        </div>

        <div className="p-4 flex flex-col bg-white shadow rounded-xl">
          <h2 className="text-lg font-semibold mb-2">
            Ürün Bazlı Stok Dağılımı
          </h2>
          <Bar data={stockData} options={stockOptions} />
        </div>
      </div>
    </div>
  );
}
