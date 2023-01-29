import { useRef } from "react";
import { shallow } from "zustand/shallow";
import { useMyStore } from "../store/example1";

export default function FruitsComp() {
  const inputRef = useRef<HTMLInputElement>(null);
  // const fruits = useMyStore((state) => {state.fruits});
  // const addFruit = useMyStore((state) => state.addFruit);
  const { fruits, addFruit } = useMyStore(
    (state) => ({
      fruits: state.fruits,
      addFruit: state.addFruit,
    })
    // shallow
  );

  const handleSubmit = () => {
    if (inputRef.current && inputRef.current.value != "") {
      addFruit(inputRef.current?.value);
      inputRef.current.value = "";
    }
  };
  console.log("Total fruits:", fruits.length);

  return (
    <>
      {JSON.stringify(fruits)}
      <br />
      <input type="text" ref={inputRef} />
      <button onClick={handleSubmit} style={{ fontSize: "14px" }}>
        Add Fruit
      </button>
    </>
  );
}
