"use client";

import React, { useState } from "react";
import useFilterUrl from "@/hooks/useFilterUrl";
import useApiUrlStore from "@/store/useApiUrlStore";
import { IoPizza } from "react-icons/io5";
import { FaHamburger, FaSortAmountDown } from "react-icons/fa";
import { GiSandwich, GiChickenLeg } from "react-icons/gi";
import { TbSoup } from "react-icons/tb";
import { IoFastFood } from "react-icons/io5";
import { GiRiceCooker } from "react-icons/gi";
import { MdOutlineKebabDining } from "react-icons/md";
import { LuSalad } from "react-icons/lu";
import { IoFish } from "react-icons/io5";
import {
  BiSolidSushi,
  BiSolidBowlRice,
  BiSolidCategoryAlt,
} from "react-icons/bi";
import { RiCopperCoinFill } from "react-icons/ri";
import { FaTimes } from "react-icons/fa";

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

interface SidebarFilterProps {
  sortings: SortingsItem[];
}

interface SortingsItem {
  title: string;
  filterValue: string | null;
}

const SidebarFilter: React.FC<SidebarFilterProps> = ({ sortings }) => {
  const {
    filter,
    setFilter,
    category: selectedCategory,
    setCategory,
  } = useFilterUrl();
  const { sort, setSort, setPage } = useApiUrlStore();

  const [filtersToggle, setFiltersToggle] = useState({
    sort: false,
    category: false,
    price: false,
  });

  const closeAllModals = () => (
    <button
      onClick={() => {
        setFiltersToggle({ price: false, sort: false, category: false });
      }}
      className="lg:hidden"
      type="button"
    >
      <FaTimes />
    </button>
  );

  const handleCategoryClick = (value: number) => {
    setCategory({ value, sub: [] });
  };

  const handleSubCategoryClick = (value: number, sub: number[]) => {
    setCategory({ value, sub });
  };

  return (
    <div className="w-full lg:py-5 xl:px-5 lg:px-2 lg:mb-0 mb-5 rounded-xl border border-gray-100 bg-gray-50/20 lg:max-h-[75vh] lg:overflow-x-hidden lg:overflow-y-auto">
      <ul className="px-3 lg:hidden py-5 block whitespace-nowrap overflow-y-hidden overflow-x-auto space-x-2 space-x-reverse">
        <li
          onClick={() => {
            setFiltersToggle({ ...filtersToggle, sort: true });
          }}
          className="inline-flex px-3 py-1 rounded-full gap-2 bg-pink-100 hover:bg-pink-200 transition-all ease-in-out duration-300 cursor-pointer"
        >
          <FaSortAmountDown className="relative top-[2px]" />
          مرتب سازی
        </li>
        <li
          onClick={() => {
            setFiltersToggle({ ...filtersToggle, category: true });
          }}
          className="inline-flex px-3 py-1 rounded-full gap-2 bg-pink-100 hover:bg-pink-200 transition-all ease-in-out duration-300 cursor-pointer"
        >
          <BiSolidCategoryAlt className="relative top-[2px]" />
          دسته‌بندی
        </li>
        <li
          onClick={() => {
            setFiltersToggle({ ...filtersToggle, price: true });
          }}
          className="inline-flex px-3 py-1 rounded-full gap-2 bg-pink-100 hover:bg-pink-200 transition-all ease-in-out duration-300 cursor-pointer"
        >
          <RiCopperCoinFill className="relative top-[2px]" />
          کلاس قیمتی
        </li>
      </ul>

      <div
        className={`lg:block ${
          filtersToggle.category || filtersToggle.sort || filtersToggle.price
            ? "flex"
            : "hidden"
        } fixed justify-center items-center flex-col inset-0 h-screen z-[100] lg:static lg:h-auto`}
      >
        {/* Filter Buttons */}
        <div
          className={`lg:mb-6 lg:block ${
            filtersToggle.price ? "block" : "hidden"
          } relative z-[100] w-[80%] lg:w-full`}
        >
          <label className="hidden lg:block mb-3 font-['yekan-bold'] text-gray-700">
            کلاس قیمتی
          </label>
          <div
            className={`flex flex-wrap flex-col lg:flex-row justify-between border p-2 rounded-lg bg-gray-100`}
          >
            {closeAllModals()}
            {allFilters.filters.map((f) => (
              <button
                key={f.value}
                onClick={() => {
                  setFilter(f.value);
                  setPage(0);
                  setFiltersToggle({
                    price: false,
                    sort: false,
                    category: false,
                  });
                }}
                className={`px-1 xl:px-2 text-sm py-2 rounded-md ${
                  filter === f.value ? "bg-pink-500 text-white" : "bg-gray-100"
                }`}
              >
                {f.title}
              </button>
            ))}
          </div>
        </div>

        {/* Categories (Tree View) */}
        <div
          className={`lg:block ${
            filtersToggle.category ? "block" : "hidden"
          } relative z-[100] w-[80%] lg:w-full`}
        >
          <label className="hidden lg:block mb-3 font-['yekan-bold'] text-gray-700">
            دسته‌بندی
          </label>
          <ul
            className={`space-y-2 bg-[#fff] p-4 rounded-xl lg:p-0 lg:rounded-none lg:bg-transparent`}
          >
            <li>{closeAllModals()}</li>
            {category.map((cat) => (
              <li key={cat.catCode}>
                <button
                  onClick={() => {
                    handleCategoryClick(cat.catCode);
                    setFiltersToggle({
                      price: false,
                      sort: false,
                      category: false,
                    });
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
                            setFiltersToggle({
                              price: false,
                              sort: false,
                              category: false,
                            });
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

        {/* Sort Buttons */}
        <div
          className={`lg:hidden ${
            filtersToggle.sort ? "block" : "hidden"
          } relative z-[100] w-[80%] lg:w-full`}
        >
          <ul className="bg-[#fff] text-[16px] p-4 rounded-xl space-y-3">
            <li>{closeAllModals()}</li>
            {sortings.map((e, i) => (
              <li
                key={i}
                className={`${
                  sort === e.filterValue ? "text-[#ff11ab]" : "text-zinc-700"
                } cursor-pointer`}
                onClick={() => {
                  setSort(e.filterValue);
                  setFiltersToggle({
                    price: false,
                    sort: false,
                    category: false,
                  });
                  setPage(0);
                }}
              >
                {e.title}
              </li>
            ))}
          </ul>
        </div>

        {(filtersToggle.category ||
          filtersToggle.sort ||
          filtersToggle.price) && (
          <div
            onClick={() => {
              setFiltersToggle({ price: false, sort: false, category: false });
            }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[99] lg:hidden"
          />
        )}
      </div>
    </div>
  );
};

export default SidebarFilter;
