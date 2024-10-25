"use client";

import { useEffect, useState } from "react";
import { handleGeneralReq } from "@/helpers/functions";
import CategoriesSection from "./components/sections/CategoriesSection";
import RestaurantSection from "./components/sections/RestaurantSection";

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
      <CategoriesSection
        data={data?.result[0].data?.cuisines || []}
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
