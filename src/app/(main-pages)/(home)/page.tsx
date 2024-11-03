"use client";

import { useEffect, useState } from "react";
import { handleGeneralReq } from "@/helpers/functions";
import CategoriesSection from "./components/sections/CategoriesSection";
import RestaurantSection from "./components/sections/RestaurantSection";
import HeroSection from "./components/sections/HeroSection";

interface Cuisine {
  id: number;
  title: string;
  icon: string;
}

interface Restaurant {
  id: number;
  title: string;
  description: string;
  backgroundImage: string;
  deliveryFee: number;
  has_coupon: boolean;
  best_coupon: string;
  logo: string;
  rating: number;
  vendorCode: string;
}

interface ResponseData {
  result: {
    data: { cuisines: Cuisine[]; restaurants: Restaurant[] };
    title: string;
  }[];
}

interface DefaultResponseData {
  data: {
    result: {
      data: { cuisines: Cuisine[]; restaurants: Restaurant[] };
      title: string;
    }[];
  };
}

export default function Home() {
  const [data, setData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await handleGeneralReq(
        "desktop/new-home?lat=35.715&long=51.404&optionalClient=WEBSITE&client=WEBSITE&deviceType=WEBSITE&appVersion=8.1.1&UDID=af137255-9047-44da-81e2-ce0eada57e89&locale=fa",
        "GET"
      );

      if (response) {
        const cuisinesData = response as unknown as DefaultResponseData;
        setData(cuisinesData.data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeroSection />

      <CategoriesSection
        data={[
          {
            id: 1,
            title: "ایرانی",
            icon: "https://cdn.snappfood.ir/uploads/images/tags/website_image_irani_1.jpg",
            sub: null,
          },
          {
            id: 7,
            title: "فست‌فود",
            icon: "https://cdn.snappfood.ir/uploads/images/tags/website_image_fastfood_1.jpg",
            sub: null,
          },
          {
            id: 16,
            title: "کباب",
            icon: "https://cdn.snappfood.ir/uploads/images/tags/website_image_kebab_1.jpg",
            sub: null,
          },
          {
            id: 8,
            title: "پیتزا",
            icon: "https://cdn.snappfood.ir/uploads/images/tags/website_image_pizza_1.jpg",
            sub: 7,
          },
          {
            id: 9,
            title: "برگر",
            icon: "https://cdn.snappfood.ir/uploads/images/tags/website_image_burger_1.jpg",
            sub: 7,
          },
          {
            id: 11,
            title: "ساندویچ",
            icon: "https://cdn.snappfood.ir/uploads/images/tags/website_image_sandwich_1.jpg",
            sub: 7,
          },
          {
            id: 13,
            title: "سوخاری",
            icon: "https://cdn.snappfood.ir/uploads/images/tags/website_image_sokhari_1.jpg",
            sub: 7,
          },
          {
            id: 10,
            title: "پاستا",
            icon: "https://cdn.snappfood.ir/uploads/images/tags/website_image_italy_1.jpg",
            sub: 7,
          },
          {
            id: 15,
            title: "سالاد",
            icon: "https://cdn.snappfood.ir/uploads/images/tags/website_image_salad_1.jpg",
            sub: null,
          },
          {
            id: 42,
            title: "دریایی",
            icon: "https://cdn.snappfood.ir/uploads/images/tags/website_image_seafood_1.jpg",
            sub: null,
          },
          {
            id: 14,
            title: "بین‌الملل",
            icon: "https://cdn.snappfood.ir/uploads/images/tags/website_image_asian_1.jpg",
            sub: null,
          },
          {
            id: 43,
            title: "گیلانی",
            icon: "https://cdn.snappfood.ir/uploads/images/tags/website_image_gilani_1.jpg",
            sub: 1,
          },
        ]}
        loading={loading}
      />

      <RestaurantSection
        title={data?.result[2]?.title || ""}
        data={data?.result[2]?.data?.restaurants || []}
        loading={loading}
      />
      <RestaurantSection
        title={data?.result[3]?.title || ""}
        data={data?.result[3]?.data?.restaurants || []}
        loading={loading}
      />
      <RestaurantSection
        title={data?.result[4]?.title || ""}
        data={data?.result[4]?.data?.restaurants || []}
        loading={loading}
        background={"#fdf2f8"}
      />
      <RestaurantSection
        title={data?.result[5]?.title || ""}
        data={data?.result[5]?.data?.restaurants || []}
        loading={loading}
      />
      <RestaurantSection
        title={data?.result[6]?.title || ""}
        data={data?.result[6]?.data?.restaurants || []}
        loading={loading}
      />
    </>
  );
}
