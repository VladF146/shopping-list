import styled from "styled-components";

export default function LanguageToggle({ language, setLanguage }) {
  return (
    <ToggleContainer>
      <ToggleButton onClick={() => setLanguage("de")}>
        {language === "de" ? "Deutsch" : "German"}
      </ToggleButton>
      <ToggleButton onClick={() => setLanguage("en")}>
        {language === "de" ? "Englisch" : "English"}
      </ToggleButton>
    </ToggleContainer>
  );
}

const ToggleContainer = styled.div``;

const ToggleButton = styled.button`
  padding: 10px;
`;
