import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IMyStore {
  fruits: string[];
  vegetables: string[];
  addFruit: (newFruit: string) => void;
  addVegetables: (newVegetable: string) => void;
}

export const useMyStore = create<IMyStore>()(
  devtools((set) => ({
    fruits: ["apple", "banana", "grapes", "orange"],
    vegetables: ["potato", "tomato", "carrot", "onions"],
    addFruit: (newFruit) =>
      set((state) => ({ ...state, fruits: [...state.fruits, newFruit] })),
    addVegetables: (newVegetable) =>
      set((state) => ({
        ...state,
        vegetables: [...state.vegetables, newVegetable],
      })),
  }))
);
