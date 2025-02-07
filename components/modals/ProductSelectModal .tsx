import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addToCart } from "@/store/cartSlice";
import { toast } from "react-toastify";
import { isAddModalClose } from "@/store/modalsSlice";

const ProductSelectModal: React.FC = () => {
  const dispatch = useDispatch();
  const { isAddModalOpen, product } = useSelector(
    (state: RootState) => state.modals
  );

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>("");

  if (!isAddModalOpen || !product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Lütfen bir beden seçin.");
      return;
    }
    if (!selectedColor) {
      toast.error("Lütfen bir renk seçin.");
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      discountPercent: product.discountPercent,
      quantity: 1,
      description: product.description || "No description",
      inStock: product.inStock,
      size: selectedSize,
      color: selectedColor,
    };

    dispatch(addToCart(cartItem));
    toast.success("Ürün sepete eklendi.");
    dispatch(isAddModalClose());
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">{product.name}</h2>

        {/* Beden Seçimi */}
        <div className="mb-3">
          <label className="block text-sm font-medium">Beden Seçin</label>
          <select
            className="border w-full p-2 rounded"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            <option value="">Beden Seçin</option>
            {product.sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Renk Seçimi */}
        <div className="mb-3">
          <label className="block text-sm font-medium">Renk Seçin</label>
          <select
            className="border w-full p-2 rounded"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            <option value="">Renk Seçin</option>
            {product.colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button
            className="bg-gray-400 px-4 py-2 rounded"
            onClick={() => dispatch(closeModal())}
          >
            İptal
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleAddToCart}
          >
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSelectModal;
