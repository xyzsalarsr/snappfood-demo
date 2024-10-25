"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import useApiUrlStore from '@/store/useApiUrlStore';  

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setApiUrl } = useApiUrlStore();  

  const [sort, setSort] = useState<string | null>(searchParams.get("sort"));
  const [filter, setFilter] = useState<string | null>(searchParams.get("filter"));
  const [category, setCategory] = useState<Category>({
    value: searchParams.get("category_value") ? parseInt(searchParams.get("category_value")!) : null,
    sub: searchParams.get("sub") ? searchParams.get("sub")!.split(",").map(Number) : []
  });

  // Build URL based on current state
  const buildUrl = (): string => {
    const params = new URLSearchParams();
    if (sort) params.set("sort", sort);
    if (filter) params.set("filter", filter);
    if (category.value !== null) params.set("category_value", category.value.toString());
    if (category.sub.length > 0) params.set("sub", category.sub.join(","));
    return `?${params.toString()}`;
  };

  // Build API URL based on current filters and category
  const buildApiUrl = (): string => {
    const filtersPart =
      filter || sort
        ? `{"filters":${filter ? `["${filter}"]` : "[]"},"sortings":${sort ? `["${sort}"]` : "[]"}}`
        : "{}";
    const categoryPart =
      category.value !== null || category.sub.length > 0
        ? `{"value":${category.value || 0},"sub":[${category.sub.join(",")}]}` 
        : "{}";

    return `desktop/vendors-list?lat=35.715&long=51.404&optionalClient=WEBSITE&client=WEBSITE&deviceType=WEBSITE&appVersion=8.1.1&UDID=af137255-9047-44da-81e2-ce0eada57e89&page=0&page_size=20&filters=${filtersPart}&category=${categoryPart}&query=&sp_alias=restaurant&city_name=tehran&superType=[1]&extra-filter=&section=SERVICES&vendor_title=&locale=fa`;
  };

  // Update URL and API URL on state change
  useEffect(() => {
    const newUrl = buildUrl();
    router.replace(newUrl);

    const newApiUrl = buildApiUrl();
    setApiUrl(newApiUrl); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, filter, category, router]);

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
