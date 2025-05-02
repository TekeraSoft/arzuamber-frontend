"use client";

// OrderStatsPage.jsx
import { Line, Pie } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { FaBoxOpen, FaMoneyBillWave, FaUndo } from "react-icons/fa";
import { motion } from "framer-motion";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const orderData = {
  labels: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran"],
  datasets: [
    {
      label: "Sipariş Sayısı",
      data: [120, 150, 180, 90, 200, 170],
      borderColor: "#4F46E5",
      backgroundColor: "#818CF8",
      tension: 0.4,
      fill: true,
    },
  ],
};

const pieData = {
  labels: ["Elektronik", "Kıyafet", "Kitap", "Ev Eşyası"],
  datasets: [
    {
      data: [300, 500, 100, 200],
      backgroundColor: ["#818CF8", "#F59E0B", "#10B981", "#EF4444"],
    },
  ],
};

// const recentOrders = [
//   { id: "#1234", product: "Laptop", price: 15000, date: "12/04/2025" },
//   { id: "#1235", product: "Gömlek", price: 300, date: "13/04/2025" },
//   { id: "#1236", product: "Bulaşık Makinesi", price: 5000, date: "14/04/2025" },
// ];

export default function OrderStatsPage() {
  return (
    <div className="p-6 space-y-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold">📈 Sipariş İstatistikleri</h1>

      {/* Kartlar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-4 bg-white shadow rounded-xl flex items-center space-x-4"
        >
          <FaBoxOpen className="text-indigo-500 text-3xl" />
          <div>
            <p className="text-gray-500">Toplam Sipariş</p>
            <p className="text-xl font-semibold">1,220</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-4 bg-white shadow rounded-xl flex items-center space-x-4"
        >
          <FaMoneyBillWave className="text-green-500 text-3xl" />
          <div>
            <p className="text-gray-500">Toplam Gelir</p>
            <p className="text-xl font-semibold">₺175.000</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-4 bg-white shadow rounded-xl flex items-center space-x-4"
        >
          <FaUndo className="text-red-500 text-3xl" />
          <div>
            <p className="text-gray-500">İade Oranı</p>
            <p className="text-xl font-semibold">3%</p>
          </div>
        </motion.div>
      </div>

      {/* Grafikler */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-4 bg-white rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2">Aylık Siparişler</h2>
          <Line data={orderData} />
        </div>

        <div className="p-4 bg-white rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2">Kategoriye Göre Satış</h2>
          <Pie data={pieData} />
        </div>
      </div>

      {/* Son Siparişler
      <div className="p-4 bg-white rounded-xl shadow mt-6">
        <h2 className="text-lg font-semibold mb-4">Son Siparişler</h2>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2">Sipariş No</th>
              <th className="py-2">Ürün</th>
              <th className="py-2">Tutar</th>
              <th className="py-2">Tarih</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-2">{order.id}</td>
                <td className="py-2">{order.product}</td>
                <td className="py-2">₺{order.price}</td>
                <td className="py-2">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
}
