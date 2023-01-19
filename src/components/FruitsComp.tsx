import { useRef } from "react";
import { useMyStore } from "../store/example1";

export default function FruitsComp() {
  const inputRef = useRef<HTMLInputElement>(null);
  // const fruits = useMyStore((state) => {state.fruits});
  // const addFruit = useMyStore((state) => state.addFruit);
  const { fruits, addFruit } = useMyStore((state) => ({
    fruits: state.fruits,
    addFruit: state.addFruit,
  }));

  const handleSubmit = () => {
    if (inputRef.current && inputRef.current.value != "") {
      addFruit(inputRef.current?.value);
      inputRef.current.value = "";
    }
  };
  console.log("fruits Count:", fruits.length);

  return (
    <>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        {fruits.map((fruit, idx) => (
          <h3 key={idx}>{fruit}</h3>
        ))}
      </div>
      <input type="text" ref={inputRef} />
      <button onClick={handleSubmit}>Add Fruit</button>
    </>
  );
}
