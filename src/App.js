import { useEffect, useState, useRef } from "react";
import { search } from "fast-fuzzy";
import useLocalStorage from "./hooks/useLocalStorage";
import SearchResults from "./components/SearchResults";
import ShoppingList from "./components/ShoppingItems";
import LanguageToggle from "./components/LanguageToggle";
import Header from "./components/Header";
import Input from "./components/Input";

import RecentItems from "./components/RecentItems";

import "./App.css";

function App() {
  const [shoppingList, setShoppingList] = useLocalStorage("shoppingList", []);
  const [categoryList, setCategoryList] = useLocalStorage("gategoryList", []);
  const [itemsToChooseFrom, setItemsToChooseFrom] = useState([]);
  const [chosenItems, setChosenItems] = useLocalStorage("chosenItems", []);
  const [recentItems, setRecentItems] = useLocalStorage("recentItems", []);
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
  }, [shoppingList, language]);

  function searchFuzzily(value) {
    setItemsToChooseFrom(
      search(value, shoppingList, { keySelector: (obj) => obj.name[language] })
    );
  }

  function addItem(value) {
    setChosenItems([...chosenItems, value]);
    setShoppingList(shoppingList.filter((e) => e._id !== value._id));
    setRecentItems(recentItems.filter((e) => e._id !== value._id));
  }

  function removeItem(value) {
    setChosenItems(chosenItems.filter((e) => e._id !== value._id));
    setShoppingList([...shoppingList, value]);
    setRecentItems([value, ...recentItems]);
  }

  function removeRecent(value) {
    setChosenItems([...chosenItems, value]);
    setShoppingList(shoppingList.filter((e) => e._id !== value._id));
    setRecentItems(recentItems.filter((e) => e._id !== value._id));
  }

  return (
    <div className="App">
      <Header>
        <h1>{language === "de" ? "Einkaufsliste" : "Shopping list"}</h1>
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

      <Input inputRef={inputRef} searchFuzzily={searchFuzzily} />

      {!inputRef.current?.value ? (
        <RecentItems
          removeRecent={removeRecent}
          recentItems={recentItems}
          language={language}
        />
      ) : (
        ""
      )}

      {inputRef.current?.value && itemsToChooseFrom.length <= 0 ? (
        language === "de" ? (
          "Wir konnten nicht finden, wonach Sie gesucht haben. Wir entschuldigen uns f??r die Unannehmlichkeiten."
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
