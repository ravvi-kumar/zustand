import { useRef } from "react";
import { shallow } from "zustand/shallow";
import { useMyStore } from "../../store/example3.1";

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
  console.log("Total vegeables:", vegetables.length);

  return (
    <>
      {JSON.stringify(vegetables)}
      <br />
      <input type="text" ref={inputRef} />
      <button onClick={handleSubmit} style={{ fontSize: "14px" }}>
        Add Vegetable
      </button>
    </>
  );
}
