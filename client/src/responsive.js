// This file use responsible for make our website responsive
import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 380px) {
      ${props}
    }
  `;
};

// export const tablet = (props) => {
//   return css`
//     @media only screen and (max-width: 380px) {
//       ${props}
//     }
//   `;
// };