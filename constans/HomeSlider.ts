export interface CarouselType {
  id: string;
  url: string;
  description?: string;
}

export const carouselList: CarouselType[] = [
  {
    id: "1",
    url: "https://res.cloudinary.com/dgoothqal/image/upload/v1737531829/ejlqz8zkbkxlqcnvtyza.png",
    description: "slider2",
  },
  {
    id: "2",
    url: "https://res.cloudinary.com/dgoothqal/image/upload/v1737533749/arzu_amber_landing_revize_2_1_d2idnt.png",
    description: "slider2",
  },
  { id: "3", url: "/images/HomeSlider/slider3.jpg", description: "slider3" },
  { id: "4", url: "/images/HomeSlider/slider4.jpg", description: "slider4" },
  { id: "5", url: "/images/HomeSlider/slider5.jpg", description: "slider5" },
  { id: " 6", url: "/images/HomeSlider/slider6.jpg", description: "slider6" },
];
