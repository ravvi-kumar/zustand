import { shallow } from "zustand/shallow";
import { useRef } from "react";
import { useMyStore } from "../store/example1";

export default function VegetableComp() {
  const inputRef = useRef<HTMLInputElement>(null);
  // const vegetables = useMyStore((state) => state.vegetables);
  // const addVegetable = useMyStore((state) => state.addVegetables);
  const { vegetables, addVegetable } = useMyStore(
    (state) => ({
      vegetables: state.vegetables,
      addVegetable: state.addVegetables,
    }),
    shallow
  );

  const handleSubmit = () => {
    if (inputRef.current && inputRef.current.value != "") {
      addVegetable(inputRef.current?.value);
      inputRef.current.value = "";
    }
  };
  console.log("vegeables Count:", vegetables.length);

  return (
    <>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        {vegetables.map((vegetable, idx) => (
          <h3 key={idx}>{vegetable}</h3>
        ))}
      </div>
      <input type="text" ref={inputRef} />
      <button onClick={handleSubmit}>Add Vegetable</button>
    </>
  );
}
