import { useEffect, useState, useRef } from "react";
import { search } from "fast-fuzzy";
import "./App.css";

function App() {
  const [shoppingList, setShoppingList] = useState([]);
  const [itemsToChooseFrom, setItemsToChooseFrom] = useState([]);
  const [chosenItems, setChosenItems] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      let response = await fetch(
        "https://fetch-me.vercel.app/api/shopping/items"
      );
      response = await response.json();
      const onlyItemNames = response.data.map((e) => {
        return e.name.de;
      });
      setShoppingList(onlyItemNames);
    }
    fetchData();
  }, []);

  useEffect(() => {
    searchFuzzily(inputRef.current.value);
  }, [shoppingList]);

  function searchFuzzily(value) {
    setItemsToChooseFrom(search(value, shoppingList));
  }

  function addItem(value) {
    setChosenItems([...chosenItems, value]);
    setShoppingList(shoppingList.filter((e) => e !== value));
  }

  function removeItem(value) {
    setChosenItems(chosenItems.filter((e) => e !== value));
    setShoppingList([...shoppingList, value]);
  }

  return (
    <div className="App">
      <h1>Shopping list with fuzzy search</h1>
      <ul>
        {chosenItems.map((e) => (
          <li key={Math.random()}>
            <button onClick={() => removeItem(e)}>{e}</button>
          </li>
        ))}
      </ul>
      <input
        ref={inputRef}
        onChange={(event) => searchFuzzily(event.target.value)}
      />
      <ul>
        {itemsToChooseFrom.map((e) => (
          <li key={Math.random()}>
            <button onClick={() => addItem(e)}>{e}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
