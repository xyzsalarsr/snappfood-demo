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
}

const RestaurantSection: FC<RestaurantSectionProps> = ({
  title,
  loading,
  data,
}) => {
  const skeletonArray = Array.from({ length: 4 });

  return (
    <section className="pt-36">
      <div className="container">
        {!loading ? (
          <h3 className="text-xl block">{title}</h3>
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
                      992: {
                        perPage: 3,
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
                          link={`https://snappfood.ir/restaurant/menu/${e.title.replace(/[\s\(\)]+/g, '_')}-r-${e.vendorCode}`}
                        />
                      </div>
                    </SplideSlide>
                  ))}
                </Splide>
              </>
            ) : (
              <p>موردی یافت نشد :(</p>
            )
          ) : (
            <div className="grid grid-cols-4 gap-5">
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
    </section>
  );
};

export default RestaurantSection;
