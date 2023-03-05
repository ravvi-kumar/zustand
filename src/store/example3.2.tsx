import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IMyFruitStore {
  fruits: string[];
  addFruit: (newFruit: string) => void;
}
interface IMyVegetableStore {
  vegetables: string[];
  addVegetables: (newVegetable: string) => void;
}

export const useMyFruitStore = create<IMyFruitStore>()(
  devtools(
    (set) => ({
      fruits: ["apple", "banana", "grapes"],
      addFruit: (newFruit) =>
        set((state) => ({ ...state, fruits: [...state.fruits, newFruit] })),
    }),
    {
      name: "fruit Store",
    }
  )
);
export const useMyVegetableStore = create<IMyVegetableStore>()(
  devtools(
    (set) => ({
      vegetables: ["potato", "tomato", "onions"],
      addVegetables: (newVegetable) =>
        set((state) => ({
          ...state,
          vegetables: [...state.vegetables, newVegetable],
        })),
    }),
    {
      name: "Vegetable Store",
    }
  )
);
