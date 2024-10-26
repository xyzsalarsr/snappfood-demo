import { create } from "zustand";

interface ApiUrlStore {
  apiUrl: string;
  page: number;
  setApiUrl: (newUrl: string) => void;
  setPage: (newUrl: number) => void;
}

const useApiUrlStore = create<ApiUrlStore>((set) => ({
  apiUrl: "",
  page: 0,
  setApiUrl: (newUrl) => set({ apiUrl: newUrl }),
  setPage: (newPage) => set({ page: newPage }),
}));

export default useApiUrlStore;
