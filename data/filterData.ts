// types.ts
export interface FilterOption {
  id: number;
  name: string;
  values: string[];
}

export interface Filter {
  sizes: FilterOption;
  colors: FilterOption;
  categories: FilterOption;
  lengths: FilterOption;
  shippingPrice?: number;
  maxShippingPrice?: number;
}

export const dfFilter = {
  size: [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "2XL",
    "3XL",
    "4XL",
    "5XL",
    "Standart",
    "Oversize"
  ],
  gender: [
    "Kadın", "Erkek", "Unisex"
  ],
}

export const colors = [
  { name: "Beyaz", hex: "#FFFFFF" },
  { name: "Siyah", hex: "#000000" },
  { name: "Gri", hex: "#808080" },
  { name: "Koyu Gri", hex: "#4B4B4B" },
  { name: "Açık Gri", hex: "#D3D3D3" },
  { name: "Krem", hex: "#FFFDD0" },
  { name: "Bej", hex: "#F5F5DC" },
  { name: "Lacivert", hex: "#000080" },
  { name: "Gece Mavisi", hex: "#003366" },
  { name: "Mavi", hex: "#0000FF" },
  { name: "Açık Mavi", hex: "#ADD8E6" },
  { name: "Buz Mavisi", hex: "#E0FFFF" },
  { name: "İndigo", hex: "#4B0082" },
  { name: "Kot Mavisi", hex: "#5D8AA8" },
  { name: "Turkuaz", hex: "#40E0D0" },
  { name: "Petrol Mavisi", hex: "#005F5F" },
  { name: "Yeşil", hex: "#008000" },
  { name: "Zeytin Yeşili", hex: "#808000" },
  { name: "Açık Yeşil", hex: "#90EE90" },
  { name: "Nane Yeşili", hex: "#004925" },
  { name: "Haki", hex: "#A29F79" },
  { name: "Fıstık Yeşili", hex: "#9DC183" },
  { name: "Sarı", hex: "#FFFF00" },
  { name: "Hardal", hex: "#FFDB58" },
  { name: "Altın Sarısı", hex: "#FFD700" },
  { name: "Turuncu", hex: "#FFA500" },
  { name: "Kavun İçi", hex: "#FFB07C" },
  { name: "Somon", hex: "#FA8072" },
  { name: "Mercan", hex: "#FF7F50" },
  { name: "Kırmızı", hex: "#FF0000" },
  { name: "Bordo", hex: "#800000" },
  { name: "Gül Kurusu", hex: "#C08081" },
  { name: "Fușya", hex: "#FF00FF" },
  { name: "Füme", hex: "#757a80" },
  { name: "Pembe", hex: "#FFC0CB" },
  { name: "Açık Pembe", hex: "#FFD1DC" },
  { name: "Şeker Pembe", hex: "#FFB6C1" },
  { name: "Mor", hex: "#800080" },
  { name: "Eflatun", hex: "#9370DB" },
  { name: "Lila", hex: "#C8A2C8" },
  { name: "Lavanta", hex: "#E6E6FA" },
  { name: "Kahverengi", hex: "#8B4513" },
  { name: "Koyu Kahverengi", hex: "#5C4033" },
  { name: "Açık Kahverengi", hex: "#A0522D" },
  { name: "Tarçın", hex: "#D2691E" },
  { name: "Karamel", hex: "#FFDDA0" },
  { name: "Vizon", hex: "#B5A642" },
  { name: "Camel", hex: "#C19A6B" },
  { name: "Antrasit", hex: "#2F4F4F" },
  { name: "Şarap Rengi", hex: "#722F37" },
  { name: "Koyu Mürdüm", hex: "#580F41" },
  { name: "Metalik Gri", hex: "#A9A9A9" },
  { name: "Gümüş", hex: "#C0C0C0" },
  { name: "Şampanya", hex: "#F7E7CE" },
  { name: "Ten Rengi", hex: "#F5CBA7" },
  { name: "Koyu Mor", hex: "#260d25" },
  { name: "Su Yeşili", hex: "#9fc9ca" },
];

export const filterData: Filter = {
  sizes: {
    id: 1,
    name: "Bedenler",
    values: [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "XXXL",
      "XXXXL",
      "Standart",
      "Oversize",
      "32",
      "34",
      "36",
      "38",
      "40",
      "42",
      "44",
      "46",
      "48",
      "50",
      "52",
      "54",
      "56",
      "58",
      "38/40",
      "40/42",
      "S-M",
      "M-L",
      "L-XL",
      "XL-2XL",
    ],
  },
  colors: {
    id: 2,
    name: "Renkler",
    values: ["red", "white", "black", "blue", "green", "yellow", "pink"],
  },
  categories: {
    id: 3,
    name: "Kategoriler",
    values: [
      "Düğün Abiyeleri",
      "Pullu Abiyeler",
      "Sade Abiyeler",
      "Nikah Abiyeleri",
      "Söz ve Nişan Abiyeleri",
      "Midi Abiyeler",
      "Uzun Abiyeler",
      "Özel Tasarım Abiyeler",
      "Saten Abiyeler",
      "Özel Davet Abiyeleri",
    ],
  },
  lengths: {
    id: 4,
    name: "Uzunluklar",
    values: ["Mini", "Midi", "Maxi"],
  },
  shippingPrice: 90,
  maxShippingPrice: 500,
};
