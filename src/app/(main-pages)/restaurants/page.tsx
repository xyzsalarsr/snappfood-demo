"use client";

import { handleGeneralReq } from "@/helpers/functions";
import { useEffect, useLayoutEffect, useState } from "react";
import RestaurantCard from "@/components/Cards/RestaurantCard";
import SidebarFilter from "./components/SidebarFilter";
import useApiUrlStore from "@/store/useApiUrlStore";
import InfiniteScroll from "react-infinite-scroller";
import { FaSortAmountDown } from "react-icons/fa";

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

const sortings = [
  { title: "به ترتیب پیش فرض", filterValue: null },
  { title: "بالاترین امتیاز", filterValue: "max_rate" },
  { title: "نزدیک ترین", filterValue: "nearest" },
  { title: "جدیدترین", filterValue: "recent" },
  { title: "ارزان ترین", filterValue: "least_expensive" },
  { title: "عملکرد کلی", filterValue: "top_performance" },
  { title: "گران ترین", filterValue: "most_expensive" },
  { title: "پیشنهاد هفته", filterValue: "pick_of_the_week" },
];

export default function Restaurants() {
  const [data, setData] = useState<FinalResultItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const { sort, setSort, page, setPage, apiUrl } = useApiUrlStore();
  const [maxPage, setMaxPage] = useState(0);

  useEffect(() => {
    if (page === 0 && apiUrl) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUrl]);

  useLayoutEffect(() => {
    setPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-3">
              <SidebarFilter />
            </div>
            <div className="col-span-9">
              <div className="flex justify-start items-start gap-2 p-4 rounded-lg border border-gray-100 bg-gray-50/20 mb-5">
                <FaSortAmountDown className="relative top-[5px]" />
                <span className="font-['yekan-bold'] relative top-1">
                  مرتب سازی:
                </span>
                <ul className="flex justify-start items-center gap-3 mt-1">
                  {sortings.map((e, i) => (
                    <li
                      key={i}
                      className={`${
                        sort === e.filterValue
                          ? "text-[#ff11ab]"
                          : "text-zinc-700"
                      } cursor-pointer`}
                      onClick={() => {
                        setSort(e.filterValue);
                        setPage(0);
                      }}
                    >
                      {e.title}
                    </li>
                  ))}
                </ul>
              </div>

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
                          <>
                            <div className="bg-zinc-300 h-[334px] w-full rounded-xl animate-pulse" />
                            <div className="bg-zinc-300 h-[334px] w-full rounded-xl animate-pulse" />
                            <div className="bg-zinc-300 h-[334px] w-full rounded-xl animate-pulse" />
                          </>
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
                    <p className="text-center mt-10 font-['yekan-bold'] text-2xl">موردی <span className="text-[#ff00a6]">یافت</span> نشد :(</p>
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
