export interface CarouselType {
  id: string;
  urlMobile: string; // Mobil için resim
  urlDesktop: string; // Desktop için resim
  description?: string;
}

export const carouselList: CarouselType[] = [
  {
    id: "1",
    urlMobile: "/images/HomeSlider/1.png",
    urlDesktop: "/images/HomeSlider/1.png",
    description: "slider1",
  },
  {
    id: "2",
    urlMobile: "/images/HomeSlider/2.png",
    urlDesktop: "/images/HomeSlider/2.png",
    description: "slider2",
  },
  {
    id: "3",
    urlMobile: "/images/HomeSlider/3.png",
    urlDesktop: "/images/HomeSlider/3.png",
    description: "slider3",
  },
  {
    id: "4",
    urlMobile: "/images/HomeSlider/4.png",
    urlDesktop: "/images/HomeSlider/4.png",
    description: "slider4",
  },
  {
    id: "5",
    urlMobile: "/images/HomeSlider/5.png",
    urlDesktop: "/images/HomeSlider/5.png",
    description: "slider5",
  },
];
