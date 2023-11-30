import { css, CSSProp } from "styled-components";

interface Font {
    weight: 400 | 700 ;
    size: number;
    lineHeight: number;
    pretendard?: boolean;
  }

interface Logo{
    weight: 400;
    size: number;
    lineHeight: number;
}
  
  function FONT({ weight, size, lineHeight, pretendard }: Font): string {
    return `
      font-family: ${pretendard ? "Pretendard" : "Noto Sans"};
      font-weight: ${weight};
      font-size: ${size}px;
      line-height: ${lineHeight}px;
    `;
  }

  function LOGO({weight, size, lineHeight }: Logo): string{
    return`
        font-family: "Times New Roman";
        font-weight: ${weight};
        font-size: ${size}px;
        line-height ${lineHeight}%;
    `;
  }
  
  const fonts = {
    h1: FONT({ weight: 400, size: 20, lineHeight: 30}),
    h2: FONT({ weight: 400, size: 16, lineHeight: 24}),
    body1: FONT({ weight: 400, size: 14, lineHeight: 20}),
    body2: FONT({ weight: 400, size: 12, lineHeight: 18}),
   
  } as const;

  const logos = {
    h1: LOGO({weight:400, size:30, lineHeight: 150}),
  }
  
  const theme = {
    fonts,
    logos
  } as const;

export default theme;
