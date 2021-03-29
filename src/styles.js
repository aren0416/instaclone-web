import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  fontColor: "#2c2c2c",
  bgColor: "#f1f1f1",
};

export const darkTheme = {
  fontColor: "#f1f1f1",
  bgColor: "#1d1d1d",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    *{ box-sizing: border-box;}
    input {
        all: unset;
    }
    body {
        background-color: ${(props) => props.theme.bgColor};
        font-size: 14px;
        font-family: 'Noto Sans KR', sans-serif;
    }
    a {
        text-decoration: none;
    }
`;
