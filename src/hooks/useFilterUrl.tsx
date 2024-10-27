"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useApiUrlStore from "@/store/useApiUrlStore";

interface Category {
  value: number | null;
  sub: number[];
}

interface UseFilterUrlReturn {
  sort: string | null;
  setSort: (value: string | null) => void;
  filter: string | null;
  setFilter: (value: string | null) => void;
  category: Category;
  setCategory: (value: Category) => void;
}

const useFilterUrl = (): UseFilterUrlReturn => {
  const { sort, setSort, page, setApiUrl } = useApiUrlStore();

  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);
  const router = useRouter();
  const [filter, setFilter] = useState<string | null>(null);
  const [category, setCategory] = useState<Category>({ value: null, sub: [] });
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize search params on the client
  useEffect(() => {
    setSearchParams(new URLSearchParams(window.location.search));
  }, []);

  // Initialize state values from search params
  useEffect(() => {
    if (!searchParams) return;

    const initialFilter = searchParams.get("filter");
    const initialSort = searchParams.get("sort");
    const categoryValue = searchParams.get("category_value")
      ? parseInt(searchParams.get("category_value")!)
      : null;
    const categorySub = searchParams.get("sub")
      ? searchParams.get("sub")!.split(",").map(Number)
      : [];

    setFilter(initialFilter);
    setSort(initialSort);
    setCategory({ value: categoryValue, sub: categorySub });
    setIsInitialized(true);
  }, [searchParams, setSort]);

  const buildUrl = (): string => {
    const params = new URLSearchParams();
    if (sort) params.set("sort", sort);
    if (filter) params.set("filter", filter);
    if (category.value !== null) params.set("category_value", category.value.toString());
    if (category.sub.length > 0) params.set("sub", category.sub.join(","));
    return `?${params.toString()}`;
  };

  const buildApiUrl = (): string => {
    const filtersPart = `{"filters":${filter ? `["${filter}"]` : "null"},"sortings":${
      sort ? `["${sort}"]` : "null"
    }}`;
    const categoryPart =
      category.value !== null || category.sub.length > 0
        ? `{"value":${category.value || 0},"sub":[${category.sub.join(",")}]}` 
        : "{}";

    return `desktop/vendors-list?lat=35.68925&long=51.3896&optionalClient=WEBSITE&client=WEBSITE&deviceType=WEBSITE&appVersion=8.1.1&UDID=af137255-9047-44da-81e2-ce0eada57e89&page=${page}&page_size=21&filters=${filtersPart}&category=${categoryPart}&query=&sp_alias=restaurant&city_name=tehran&superType=[1]&extra-filter=&section=SERVICES&vendor_title=&locale=fa`;
  };

  useEffect(() => {
    if (!isInitialized) return;

    const newUrl = buildUrl();
    router.replace(newUrl);

    const newApiUrl = buildApiUrl();
    setApiUrl(newApiUrl);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, filter, category, page, router, isInitialized, setApiUrl]);

  return {
    sort,
    setSort,
    filter,
    setFilter,
    category,
    setCategory,
  };
};

export default useFilterUrl;
