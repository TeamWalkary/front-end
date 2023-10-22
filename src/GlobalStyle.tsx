import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *,:after,:before {
        box-sizing: border-box;
    }
    * {
        margin: 0;
    }
    body,html {
        height: 100%;
        background-color: #fffefc;
        font-size: 62.5%;
        color: #333;
    }
    body {
        -webkit-font-smoothing: antialiased;
        line-height: 1.5;
    }
    @font-face {
        font-family: 'Pretendard-Regular';
        src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff')
          format('woff');
        font-weight: 400;
        font-style: normal;
      }

`;

export default GlobalStyle;
