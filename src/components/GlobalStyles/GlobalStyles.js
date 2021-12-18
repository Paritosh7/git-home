import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
/*
    Josh Comeau's styles reset
  1. Use a more-intuitive box-sizing model.
*/
*, *::before, *::after {
  box-sizing: border-box;
}
/*
  2. Remove default margin
*/
* {
  margin: 0;
}
/*
  3. Allow percentage-based heights in the application
*/
html, body {
  height: 100%;
}
/*
  Typographic tweaks!
  4. Add accessible line-height
  5. Improve text rendering
*/
body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  font-family: 'Space Mono', monospace;
  background-color: hsl(227 100% 98%);
}
/*
  6. Improve media defaults
*/
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}
/*
  7. Remove built-in form typography styles
*/
input, button, textarea, select {
  font: inherit;
}
/*
  8. Avoid text overflows
*/
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}
/*
  9. Create a root stacking context
*/
#root, #__next {
  isolation: isolate;
}

:root{
  --color-light-background : hsl(227, 100%, 98%);
  --color-light-main: hsl(0,0%,100%);
  --color-light-button : hsl(212,100%,50%);
  --color-light-greyed-out : hsl(217,20%,51%)
}

`;

export default GlobalStyles;
