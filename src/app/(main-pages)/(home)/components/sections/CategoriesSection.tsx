"use client";

import CategoryCard from "@/components/Cards/CategoryCard";
import React, { FC } from "react";

interface Cuisine {
  id: number;
  title: string;
  icon: string;
  sub: number | null;
}

interface CategoriesSectionProps {
  loading: boolean;
  data: Cuisine[];
}

const CategoriesSection: FC<CategoriesSectionProps> = ({ loading, data }) => {
  const skeletonArray = Array.from({ length: 12 });

  return (
    <section className="py-16 lg:py-28">
      <div className="container">
        {!loading ? (
          <h3 className="text-xl">دسته بندی ها</h3>
        ) : (
          <div className="bg-zinc-300 h-[28px] w-48 rounded-lg animate-pulse" />
        )}
        <div className="overflow-hidden overflow-x-auto space-x-3 space-x-reverse lg:space-x-0 whitespace-nowrap lg:grid lg:grid-cols-6 gap-5 mt-6">
          {!loading ? (
            data.length > 0 ? (
              data.map((e, i: number) => (
                <CategoryCard
                  key={i}
                  title={e.title}
                  imgSrc={e.icon}
                  link={`/restaurants?${e.sub !== null ? `category_value=${e.sub}&sub=${e.id}`:`category_value=${e.id}`}`}
                />
              ))
            ) : (
              <p className="bg-gray-100 px-8 p-16 text-center font-['yekan-bold'] text-xl col-span-12 rounded-lg">موردی یافت نشد :(</p>
            )
          ) : (
            skeletonArray.map((_, i) => (
              <div
                key={i}
                className="bg-zinc-300 h-[108px] w-full inline-block rounded-xl animate-pulse"
              ></div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
