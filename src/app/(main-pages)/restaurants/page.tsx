"use client";

import { handleGeneralReq } from "@/helpers/functions";
import { useEffect, useState } from "react";
import RestaurantCard from "@/components/Cards/RestaurantCard";
import SidebarFilter from "./components/SidebarFilter";
import useApiUrlStore from "@/store/useApiUrlStore";
import InfiniteScroll from "react-infinite-scroller";

interface ApiResponse {
  render_type: number;
  status: boolean;
  data: Data;
}

interface Data {
  count: number;
  open_count: number;
  finalResult: FinalResultItem[];
}

interface FinalResultItem {
  type: string;
  data: RestaurantData;
}

interface RestaurantData {
  title: string;
  description: string;
  backgroundImage: string;
  deliveryFee: number;
  featured: string;
  rating: number;
  id: string;
  code: string;
}

export default function Restaurants() {
  const [data, setData] = useState<FinalResultItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const { page, setPage, apiUrl } = useApiUrlStore();
  const [maxPage, setMaxPage] = useState(0);

  useEffect(() => {
    if (page === 0 && apiUrl) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUrl]);

  const getData = async () => {
    setData(null);
    try {
      setPage(1);
      setLoading(true);
      const response = await handleGeneralReq(apiUrl, "GET");

      if (response) {
        const restaurantData = response as unknown as ApiResponse;
        console.log(response);
        setData(restaurantData.data.finalResult);
        setMaxPage(Math.ceil(restaurantData.data.count / 20));
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInfiniteLoadData = async () => {
    if (maxPage === page) {
      setHasMore(false);
      return;
    }

    try {
      setPage(page + 1);
      setHasMore(false);
      const response = await handleGeneralReq(apiUrl, "GET");
      if (response) {
        const restaurantData = response as unknown as ApiResponse;
        setData((prevData) => [
          ...(prevData || []),
          ...restaurantData.data.finalResult,
        ]);
        setHasMore(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setPage(page - 1);
      setHasMore(true);
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
              <p className="bg-pink-100 text-left p-5 rounded-lg mb-3">
                {apiUrl}
              </p>
              <div>
                {!loading ? (
                  data !== null && data.length > 0 ? (
                    <>
                      <InfiniteScroll
                        pageStart={0}
                        loadMore={handleInfiniteLoadData}
                        hasMore={hasMore && (maxPage !== page ? true : false)}
                        className="grid grid-cols-3 gap-5"
                        loader={
                          <div className="loader" key={0}>
                            Loading ...
                          </div>
                        }
                      >
                        {data !== null &&
                          data.map((e, i) => (
                            <RestaurantCard
                              key={i}
                              title={e.data.title}
                              description={e.data.description}
                              background={e.data.backgroundImage}
                              deliveryFee={e.data.deliveryFee}
                              logo={e.data.featured}
                              rating={e.data.rating}
                              link={`https://snappfood.ir/restaurant/menu/${e.data.title.replace(
                                /[\s\(\)]+/g,
                                "_"
                              )}-r-${e.data.code}`}
                            />
                          ))}
                      </InfiniteScroll>
                    </>
                  ) : (
                    <p>موردی یافت نشد :(</p>
                  )
                ) : (
                  <div className="grid grid-cols-3 gap-5">
                    {skeletonArray.map((_, i) => (
                      <div
                        key={i}
                        className="bg-zinc-300 h-[334px] w-full rounded-xl animate-pulse"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
