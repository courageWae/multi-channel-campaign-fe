import { createGlobalStyle } from "styled-components";
import { globalStyles } from "twin.macro";

const GlobalStyles = createGlobalStyle(
  globalStyles,
  `
  '@keyframes mui-auto-fill': { from: { display: 'block' } },
  '@keyframes mui-auto-fill-cancel': { from: { display: 'block' } },

   /* Below animations are for modal created using React-Modal */
     .ReactModal__Overlay {
     transition: transform 300ms ease-in-out;
     transition-delay: 100ms;
     transform: scale(0);
   }
   .ReactModal__Overlay--after-open{
     transform: scale(1);
   }
   .ReactModal__Overlay--before-close{
     transform: scale(0);
   }
`
);

export default GlobalStyles;
