"use client";
import RestaurantCard from "@/components/Cards/RestaurantCard";
import React, { FC } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import "@splidejs/react-splide/css";

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

interface RestaurantSectionProps {
  title: string;
  loading: boolean;
  data: Restaurant[];
  background?: string;
}

const RestaurantSection: FC<RestaurantSectionProps> = ({
  title,
  loading,
  data,
  background = "#fff",
}) => {
  const skeletonArray = Array.from({ length: 4 });

  return (
    <section className="py-16 lg:py-28" style={{ background }}>
      <div className="container">
        {!loading ? (
          <h3 className="text-xl block">{title || "(بدون عنوان)"}</h3>
        ) : (
          <div className="bg-zinc-300 h-[28px] w-48 rounded-lg animate-pulse" />
        )}
        <div className=" mt-6">
          {!loading ? (
            data.length > 0 ? (
              <>
                <Splide
                  className="w-full mx-auto"
                  options={{
                    direction: "rtl",
                    perPage: 4,
                    pagination: false,
                    arrows: true,
                    breakpoints: {
                      1400: {
                        perPage: 3,
                      },
                      992: {
                        perPage: 2,
                      },
                      768: {
                        perPage: 1,
                      },
                    },
                  }}
                >
                  {data.map((e, i) => (
                    <SplideSlide key={i}>
                      <div className="p-5">
                        <RestaurantCard
                          key={e.id}
                          title={e.title}
                          description={e.description}
                          background={e.backgroundImage}
                          deliveryFee={e.deliveryFee}
                          logo={e.logo}
                          rating={e.rating}
                          link={`https://snappfood.ir/restaurant/menu/${e.title.replace(
                            /[\s\(\)]+/g,
                            "_"
                          )}-r-${e.vendorCode}`}
                        />
                      </div>
                    </SplideSlide>
                  ))}
                </Splide>
              </>
            ) : (
              <p className="bg-gray-100 px-8 p-16 text-center font-['yekan-bold'] text-xl col-span-12 rounded-lg">موردی یافت نشد :(</p>
            )
          ) : (
            <div className="relative grid grid-cols-4 gap-5 min-h-[334px] xl:min-h-auto">
              {skeletonArray.map((_, i) => (
                <div
                  key={i}
                  className="bg-zinc-300 absolute xl:static  inset-0 h-[334px] w-full rounded-xl animate-pulse"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RestaurantSection;
