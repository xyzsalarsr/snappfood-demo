"use client";

import CategoryCard from "@/components/Cards/CategoryCard";
import React, { FC } from "react";

interface Cuisine {
  id: number;
  title: string;
  icon: string;
}

interface CategoriesSectionProps {
  loading: boolean;
  data: Cuisine[];
}

const CategoriesSection: FC<CategoriesSectionProps> = ({ loading, data }) => {
  const skeletonArray = Array.from({ length: 12 });

  return (
    <section className="pt-36">
      <div className="container">
        {!loading ? (
          <h3 className="text-xl">دسته بندی ها</h3>
        ) : (
          <div className="bg-zinc-300 h-[28px] w-48 rounded-lg animate-pulse" />
        )}
        <div className="grid grid-cols-6 gap-5 mt-6">
          {!loading ? (
            data.length > 0 ? (
              data.map((e, i: number) => (
                <CategoryCard
                  key={i}
                  title={e.title}
                  imgSrc={e.icon}
                  link={`/restaurants?category_value=${e.id}`}
                />
              ))
            ) : (
              <p>موردی یافت نشد :(</p>
            )
          ) : (
            skeletonArray.map((_, i) => (
              <div
                key={i}
                className="bg-zinc-300 h-[108px] w-full rounded-xl animate-pulse"
              ></div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
