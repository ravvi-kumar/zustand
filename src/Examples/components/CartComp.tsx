import { useCartStore } from "../../store/example.2";

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const handleAddItem = (e: any) => {
    e.preventDefault();
    const name = e.target.elements.itemName.value;
    addItem({
      ...{ id: (Math.random() + 1).toString(36).substring(2), name },
      quantity: 1,
    });
    e.target.reset();
  };

  const handleUpdateItem = (id: string) => {
    const existingItem = items.find((i) => i.id === id);

    if (existingItem) {
      updateQuantity(existingItem.id, existingItem.quantity + 1);
    }
  };

  const handleRemoveItem = (id: string) => {
    const existingItem = items.find((i) => i.id === id);
    if (existingItem) {
      if (existingItem.quantity === 1) {
        removeItem(id);
      } else {
        updateQuantity(id, existingItem.quantity - 1);
      }
    }
  };

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} x {item.quantity}{" "}
            <button onClick={() => handleUpdateItem(item.id)}>+</button>
            <button onClick={() => handleRemoveItem(item.id)}>-</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddItem}>
        <input type="text" name="itemName" />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}
