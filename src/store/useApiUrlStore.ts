import { create } from "zustand";

interface ApiUrlStore {
  apiUrl: string;
  page: number;
  sort: string | null;
  setApiUrl: (newUrl: string) => void;
  setPage: (newPage: number) => void;
  setSort: (newSort: string | null) => void;
}

const useApiUrlStore = create<ApiUrlStore>((set) => ({
  apiUrl: "",
  page: 0,
  sort: null,
  setApiUrl: (newUrl) => set({ apiUrl: newUrl }),
  setPage: (newPage) => set({ page: newPage }),
  setSort: (newSort) => set({ sort: newSort }),
}));

export default useApiUrlStore;
