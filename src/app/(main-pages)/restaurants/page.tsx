"use client";

import { handleGeneralReq } from "@/helpers/functions";
import { useEffect, useState } from "react";
import RestaurantCard from "@/components/Cards/RestaurantCard";
import SidebarFilter from "./components/SidebarFilter";
import useApiUrlStore from "@/store/useApiUrlStore";

export default function Restaurants() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { apiUrl } = useApiUrlStore();  

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUrl]);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await handleGeneralReq(apiUrl, "GET");

      if (response) {
        const cuisinesData = response;
        setData(cuisinesData);
        console.log(response);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const skeletonArray = Array.from({ length: 12 });

  return (
    <>
      <section className="mt-36">
        <div className="container">
          <div className="grid grid-cols-12">
            <div className="col-span-3">
              <SidebarFilter />
            </div>
            <div className="col-span-9">
              <p>{apiUrl}</p>
              <div className="grid grid-cols-3 gap-5">
                {!loading ? (
                  data?.data?.finalResult?.length > 0 ? (
                    <>
                      {data.data.finalResult.map((e, i) => (
                        <RestaurantCard
                          key={i}
                          title={e.data.title}
                          description={e.data.description}
                          background={e.data.backgroundImage}
                          deliveryFee={e.data.deliveryFee}
                          logo={e.data.featured}
                          rating={e.data.rating}
                          link={`/${e.data.id}`}
                        />
                      ))}
                    </>
                  ) : (
                    <p>موردی یافت نشد :(</p>
                  )
                ) : (
                  skeletonArray.map((_, i) => (
                    <div
                      key={i}
                      className="bg-zinc-300 h-[334px] w-full rounded-xl animate-pulse"
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
