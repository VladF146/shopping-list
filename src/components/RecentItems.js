import { useState } from "react";
import styled from "styled-components";

export default function RecentItems({ removeRecent, recentItems, language }) {
  const [active, setActive] = useState(false);
  return (
    <>
      {recentItems.length > 0 ? (
        <CollapsibleHead onClick={() => setActive(!active)}>
          <h2>{`${language === "de" ? "Jüngste Artikel" : "Recent items"} (${
            recentItems.length
          })`}</h2>
          <span>
            {active ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-chevron-up"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-chevron-down"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
              </svg>
            )}
          </span>
        </CollapsibleHead>
      ) : (
        ""
      )}
      {active ? (
        <ItemList>
          {recentItems.length > 0 &&
            recentItems.map((e) => (
              <Item key={e._id}>
                <button onClick={() => removeRecent(e)}>
                  {e.name[language]}
                </button>
              </Item>
            ))}
        </ItemList>
      ) : (
        ""
      )}
    </>
  );
}

const ItemList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5px;

  li {
    list-style: none;
  }
`;

const Item = styled.li`
  button {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 10px;
    border: none;
    background-color: #d1fae5;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  }
`;

const CollapsibleHead = styled.div`
  width: 75%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  cursor: pointer;

  span {
    display: flex;
    align-items: center;
  }
`;
