import styled from "styled-components";

export default function Input({ inputRef, searchFuzzily }) {
  return (
    <StyledInput
      ref={inputRef}
      onChange={(event) => searchFuzzily(event.target.value)}
    />
  );
}

const StyledInput = styled.input`
  width: "50%";
  padding: "10px";
  text-align: "center";
`;
