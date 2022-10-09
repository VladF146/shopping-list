import styled from "styled-components";

export default function LanguageToggle({ language, setLanguage }) {
  return (
    <ToggleContainer>
      {language === "en" ? (
        <ToggleButton onClick={() => setLanguage("de")}>
          {language === "de" ? "DE" : "GER"}
        </ToggleButton>
      ) : (
        <ToggleButton onClick={() => setLanguage("en")}>
          {language === "de" ? "EN" : "EN"}
        </ToggleButton>
      )}
    </ToggleContainer>
  );
}

const ToggleContainer = styled.div`
  border-radius: 15px;
  overflow: hidden;
`;

const ToggleButton = styled.button`
  width: 50px;
  padding: 10px;
  border-style: none;
  background-color: #a7f3d0;
`;
