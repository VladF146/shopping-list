import styled from "styled-components";

export default function RecentItems({ removeRecent, recentItems, language }) {
  return (
    <ItemList>
      {recentItems.length > 0 &&
        recentItems.map((e) => (
          <Item key={e._id}>
            <button onClick={() => removeRecent(e)}>{e.name[language]}</button>
          </Item>
        ))}
    </ItemList>
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
    background-color: pink;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  }
`;
