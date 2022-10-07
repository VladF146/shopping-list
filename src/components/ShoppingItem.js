export default function ShoppingItem({ removeItem, item }) {
  return (
    <li>
      <button onClick={() => removeItem(item)}>{item}</button>
    </li>
  );
}
