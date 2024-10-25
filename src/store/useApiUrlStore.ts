import { create } from "zustand";

interface ApiUrlStore {
  apiUrl: string;
  setApiUrl: (newUrl: string) => void;
}

const useApiUrlStore = create<ApiUrlStore>((set) => ({
  apiUrl: "",
  setApiUrl: (newUrl) => set({ apiUrl: newUrl }),
}));

export default useApiUrlStore;
