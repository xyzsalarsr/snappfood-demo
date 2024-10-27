"use client";

import React from "react";
import useFilterUrl from "@/hooks/useFilterUrl";
import useApiUrlStore from "@/store/useApiUrlStore";
import { IoPizza } from "react-icons/io5";
import { FaHamburger } from "react-icons/fa";
import { GiSandwich, GiChickenLeg } from "react-icons/gi";
import { TbSoup } from "react-icons/tb";
import { IoFastFood } from "react-icons/io5";
import { GiRiceCooker } from "react-icons/gi";
import { MdOutlineKebabDining } from "react-icons/md";
import { LuSalad } from "react-icons/lu";
import { IoFish } from "react-icons/io5";
import { BiSolidSushi, BiSolidBowlRice } from "react-icons/bi";

const allFilters = {
  filters: [
    { title: "همه", value: null },
    { title: "اقتصادی", value: "economy_price" },
    { title: "متوسط", value: "average_price" },
    { title: "گران", value: "lux_price" },
  ],
};

const category = [
  {
    icon: null,
    title: "همه",
    catCode: null,
  },
  {
    icon: <GiRiceCooker className="text-[20px] relative top-[-2px]" />,
    title: "ایرانی",
    catCode: 1,
    sub: [{ icon: <BiSolidBowlRice />, title: "گیلانی", catCode: 43 }],
  },
  {
    icon: <IoFastFood />,
    title: "فست فود",
    catCode: 7,
    sub: [
      { icon: <IoPizza />, title: "پیتزا", catCode: 8 },
      { icon: <FaHamburger />, title: "برگر", catCode: 9 },
      { icon: <GiSandwich />, title: "ساندویچ", catCode: 11 },
      { icon: <GiChickenLeg />, title: "سوخاری", catCode: 13 },
      { icon: <TbSoup />, title: "پاستا", catCode: 10 },
    ],
  },
  { icon: <MdOutlineKebabDining />, title: "کباب", catCode: 16 },
  { icon: <LuSalad />, title: "سالاد", catCode: 15 },
  { icon: <IoFish />, title: "دریایی", catCode: 42 },
  { icon: <BiSolidSushi />, title: "بین الملل", catCode: 14 },
];

const SidebarFilter: React.FC = () => {
  const {
    filter,
    setFilter,
    category: selectedCategory,
    setCategory,
  } = useFilterUrl();
  const { setPage } = useApiUrlStore();

  const handleCategoryClick = (value: number) => {
    setCategory({ value, sub: [] });
  };

  const handleSubCategoryClick = (value: number, sub: number[]) => {
    setCategory({ value, sub });
  };

  return (
    <div className="w-full p-5 rounded-xl border border-gray-100 bg-gray-50/20 max-h-[75vh] overflow-x-hidden overflow-y-auto">
      {/* Filter Buttons */}
      <div className="mb-6">
        <label className="block mb-3 font-['yekan-bold'] text-gray-700">
          کلاس قیمتی
        </label>
        <div className="flex flex-wrap justify-between border p-2 rounded-lg bg-gray-100">
          {allFilters.filters.map((f) => (
            <button
              key={f.value}
              onClick={() => {
                setFilter(f.value);
                setPage(0);
              }}
              className={`px-2 text-sm py-2 rounded-md ${
                filter === f.value ? "bg-pink-500 text-white" : "bg-gray-100"
              }`}
            >
              {f.title}
            </button>
          ))}
        </div>
      </div>

      {/* Categories (Tree View) */}
      <div>
        <label className="block mb-3 font-['yekan-bold'] text-gray-700">
          دسته‌بندی
        </label>
        <ul className="space-y-2">
          {category.map((cat) => (
            <li key={cat.catCode}>
              <button
                onClick={() => {
                  handleCategoryClick(cat.catCode);
                  setPage(0);
                }}
                className={`w-full flex gap-1.5 items-center text-right px-4 py-2 rounded-md ${
                  selectedCategory.value === cat.catCode
                    ? "bg-pink-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                {cat.icon}
                {cat.title}
              </button>
              {cat.sub && selectedCategory.value === cat.catCode && (
                <ul className="pr-4 mt-2 space-y-1">
                  {cat.sub.map((sub) => (
                    <li key={sub.catCode}>
                      <button
                        onClick={() => {
                          handleSubCategoryClick(cat.catCode, [sub.catCode]);
                          setPage(0);
                        }}
                        className={`w-full flex gap-1.5 items-center text-right px-4 py-2 rounded-md ${
                          selectedCategory.sub.includes(sub.catCode)
                            ? "bg-pink-400 text-white"
                            : "bg-gray-200/80"
                        }`}
                      >
                        {sub.icon}
                        {sub.title}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SidebarFilter;
