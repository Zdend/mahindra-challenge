import { css } from '@emotion/core';
import { BASE_UNIT } from '../shared/theme';

export const globalStyles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box
  }

  body {
    font-size: 16px;
    font-family: -apple-system,BlinkMacSystemFont,segoe ui,Roboto,helvetica neue,Arial,noto sans,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol,noto color emoji;
  }

  .mr-2 {
    margin-right: ${BASE_UNIT * 2}px;
  }

  .ml-2 {
    margin-left: ${BASE_UNIT * 2}px;
  }

  .d-flex {
    display: flex;
  }

  .flex-1 {
    flex: 1 0 auto;
  }

  .justify-space-between {
    justify-content: space-between;
  }
`;
