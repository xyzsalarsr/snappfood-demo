"use client";

import React from "react";
import useFilterUrl from "@/hooks/useFilterUrl";
import useApiUrlStore from "@/store/useApiUrlStore";

const allFilters = {
  filters: [
    { title: "همه", value: "" },
    { title: "اقتصادی", value: "economy_price" },
    { title: "متوسط", value: "average_price" },
    { title: "گران", value: "lux_price" },
  ],
};

const category = [
  {
    title: "همه",
    catCode: null,
  },
  {
    title: "ایرانی",
    catCode: 1,
    sub: [{ title: "گیلانی", catCode: 43 }],
  },
  {
    title: "فست فود",
    catCode: 7,
    sub: [
      { title: "پیتزا", catCode: 8 },
      { title: "برگر", catCode: 9 },
      { title: "ساندویچ", catCode: 11 },
      { title: "سوخاری", catCode: 13 },
      { title: "پاستا", catCode: 10 },
    ],
  },
  { title: "کباب", catCode: 16 },
  { title: "سالاد", catCode: 15 },
  { title: "دریایی", catCode: 42 },
  { title: "بین الملل", catCode: 14 },
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
        <label className="block mb-2 font-bold text-gray-700">فیلترها</label>
        <div className="flex flex-wrap gap-2">
          {allFilters.filters.map((f) => (
            <button
              key={f.value}
              onClick={() => {
                setFilter(f.value);
                setPage(0);
              }}
              className={`px-4 py-2 rounded-md ${
                filter === f.value ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {f.title}
            </button>
          ))}
        </div>
      </div>

      {/* Categories (Tree View) */}
      <div>
        <label className="block mb-2 font-bold text-gray-700">دسته‌بندی</label>
        <ul className="space-y-2">
          {category.map((cat) => (
            <li key={cat.catCode}>
              <button
                onClick={() => {
                  handleCategoryClick(cat.catCode);
                  setPage(0);
                }}
                className={`w-full text-right px-4 py-2 rounded-md ${
                  selectedCategory.value === cat.catCode
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                {cat.title}
              </button>
              {cat.sub && selectedCategory.value === cat.catCode && (
                <ul className="pl-6 mt-2 space-y-1">
                  {cat.sub.map((sub) => (
                    <li key={sub.catCode}>
                      <button
                        onClick={() => {
                          handleSubCategoryClick(cat.catCode, [sub.catCode]);
                          setPage(0);
                        }}
                        className={`w-full text-right px-4 py-2 rounded-md ${
                          selectedCategory.sub.includes(sub.catCode)
                            ? "bg-blue-400 text-white"
                            : "bg-gray-100"
                        }`}
                      >
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
