import styled from "styled-components";

export default function Header({ children }) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
