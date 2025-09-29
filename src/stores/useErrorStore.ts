import { create } from "zustand";
import { ErrorItem } from "@/components/ErrList";

interface ErrorState {
  errors: ErrorItem[];
  addError: (error: ErrorItem | ErrorItem[]) => void;
  clearError: (index?: number) => void;
}

export const useErrorStore = create<ErrorState>((set) => ({
  errors: [],
  addError: (error) =>
    set((state) => ({
      errors: Array.isArray(error)
        ? [...state.errors, ...error]
        : [...state.errors, error],
    })),
  clearError: () => set({ errors: [] }),
}));
