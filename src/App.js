import { useEffect, useState, useRef } from "react";
import { search } from "fast-fuzzy";
import useLocalStorage from "./hooks/useLocalStorage";
import SearchResults from "./components/SearchResults";
import ShoppingList from "./components/ShoppingItem";

import RecentItems from "./components/RecentItems";

import "./App.css";

function App() {
  const [shoppingList, setShoppingList] = useLocalStorage("shoppingList", []);
  const [itemsToChooseFrom, setItemsToChooseFrom] = useState([]);
  const [chosenItems, setChosenItems] = useLocalStorage("chosenItems", []);
  const [recentItems, setRecentItems] = useLocalStorage("resentItems", []);
  const [language, setLanguage] = useLocalStorage("language", "de");
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
    //setShoppingList([...shoppingList, value]);
    setRecentItems([value, ...recentItems]);
  }

  function removeRecent(value) {
    setChosenItems([...chosenItems, value]);
    setRecentItems(recentItems.filter((e) => e !== value));
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
      <ShoppingList
        removeItem={removeItem}
        chosenItems={chosenItems}
        language={language}
      />
      <input
        ref={inputRef}
        onChange={(event) => searchFuzzily(event.target.value)}
      />
      <RecentItems
        removeRecent={removeRecent}
        recentItems={recentItems}
        language={language}
      />

      <SearchResults
        addItem={addItem}
        itemsToChooseFrom={itemsToChooseFrom}
        language={language}
      />
    </div>
  );
}

export default App;
