import { useEffect, useState, useRef } from "react";
import { search } from "fast-fuzzy";
import useLocalStorage from "./hooks/useLocalStorage";
import SearchResults from "./components/SearchResults";
import ShoppingList from "./components/ShoppingItems";
import LanguageToggle from "./components/LanguageToggle";
import Header from "./components/Header";

import RecentItems from "./components/RecentItems";

import "./App.css";

function App() {
  const [shoppingList, setShoppingList] = useLocalStorage("shoppingList", []);
  const [categoryList, setCategoryList] = useLocalStorage("gategoryList", []);
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
    async function fetchData() {
      let response = await fetch(
        "https://fetch-me.vercel.app/api/shopping/categories"
      );
      response = await response.json();
      setCategoryList(response.data);
    }
    if (categoryList.length === 0) {
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
    setRecentItems(recentItems.filter((e) => e !== value));
  }

  function removeItem(value) {
    setChosenItems(chosenItems.filter((e) => e !== value));
    setShoppingList([...shoppingList, value]);
    setRecentItems([value, ...recentItems]);
  }

  function removeRecent(value) {
    setChosenItems([...chosenItems, value]);
    setShoppingList(shoppingList.filter((e) => e !== value));
    setRecentItems(recentItems.filter((e) => e !== value));
  }

  return (
    <div className="App">
      <Header>
        <h1>
          {language === "de"
            ? "Einkaufsliste mit Fuzzy-Suche"
            : "Shopping list with fuzzy search"}
        </h1>
        <LanguageToggle language={language} setLanguage={setLanguage} />
      </Header>
      {categoryList.map((category) => (
        <ShoppingList
          key={category._id}
          removeItem={removeItem}
          chosenItems={chosenItems.filter(
            (item) => item.category._ref === category._id
          )}
          language={language}
          category={category}
        />
      ))}

      <input
        ref={inputRef}
        style={{ width: "50%", padding: "10px", textAlign: "center" }}
        onChange={(event) => searchFuzzily(event.target.value)}
      />
      <RecentItems
        removeRecent={removeRecent}
        recentItems={recentItems}
        language={language}
      />

      {inputRef.current?.value && itemsToChooseFrom.length <= 0 ? (
        language === "de" ? (
          "Wir konnten nicht finden, wonach Sie gesucht haben. Wir entschuldigen uns für die Unannehmlichkeiten."
        ) : (
          "We could not find what you were looking for. Sorry for the inconvenience."
        )
      ) : (
        <SearchResults
          addItem={addItem}
          itemsToChooseFrom={itemsToChooseFrom}
          language={language}
        />
      )}
    </div>
  );
}

export default App;
