import { useEffect, useState, useRef } from "react";
import { search } from "fast-fuzzy";
import useLocalStorage from "./hooks/useLocalStorage";
import "./App.css";

function App() {
  const [shoppingList, setShoppingList] = useLocalStorage("shoppingList", []);
  const [itemsToChooseFrom, setItemsToChooseFrom] = useState([]);
  const [chosenItems, setChosenItems] = useLocalStorage("chosenItems", []);
  const [language, setLanguage] = useState("de");
  const inputRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      let response = await fetch(
        "https://fetch-me.vercel.app/api/shopping/items"
      );
      response = await response.json();
      setShoppingList(response.data);
    }
    if (shoppingList.length === 0) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    searchFuzzily(inputRef.current.value);
  }, [shoppingList]);

  function searchFuzzily(value) {
    setItemsToChooseFrom(
      search(value, shoppingList, { keySelector: (obj) => obj.name[language] })
    );
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
      <h1>
        {language === "de"
          ? "Einkaufsliste mit Fuzzy-Suche"
          : "Shopping list with fuzzy search"}
      </h1>
      <button onClick={() => setLanguage("de")}>
        {language === "de" ? "Deutsch" : "German"}
      </button>
      <button onClick={() => setLanguage("en")}>
        {language === "de" ? "Englisch" : "English"}
      </button>
      <ul>
        {chosenItems.map((e) => (
          <li key={e._id}>
            <button onClick={() => removeItem(e)}>{e.name[language]}</button>
          </li>
        ))}
      </ul>
      <input
        ref={inputRef}
        onChange={(event) => searchFuzzily(event.target.value)}
      />
      <ul>
        {itemsToChooseFrom.map((e) => (
          <li key={e._id}>
            <button onClick={() => addItem(e)}>{e.name[language]}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
