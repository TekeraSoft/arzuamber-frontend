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
}

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
      "Standard",
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
      "XS-S",
      "S-M",
      "M-L",
      "L-XL",
      "XXL-XXXL"
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
};
