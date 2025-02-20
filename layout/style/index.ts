import { css } from "@linaria/core";
import { mediaQueryLessOrEqual } from "@/lib/responsive";

export const globalStyles = css`

  :global() {

    a {
      text-decoration: none;
      color: var(--blue-2);
      transition: all 0.1s ease;

      &:hover {
        color: var(--blue-1);
      }
      &:active {
        color: var(--blue-3);
      }
    }
    
    body {
      margin: 0;
      padding: 0;
      font-family: sans-serif;

      color: var(--gray-1);
      background-color: var(--gray-7);
    }

    * {
      box-sizing: border-box;
    }

    button {
      padding: 6px 12px;
      font-size: 16px;
      font-weight: 500;
      border: none;
      border-radius: 8px;
      background: linear-gradient(145deg, #4a90e2, #357abd);
      color: white;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      position: relative;
      overflow: hidden;
    }

    button:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      background: linear-gradient(145deg, #357abd, #2868a9);
    }

    button:active {
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    button:focus {
      box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.3);
    }

    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background: var(--gray-6);
      transform: none;
      box-shadow: none;
    }

    body, div, p, span {
      transition: background-color 0.1s ease;
    }

    #nav-menu-root {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 75;
    }

    #portal-root {
      z-index: 150;
    }

  }
  

  .clickable-icon {
    cursor: pointer;
    transition: all 0.1s ease;

    &:hover {
      opacity: 0.8;
    }
    &:active {
      opacity: 0.9;
    }
  }

  /* constants */
  --layout-max-width: 1280px;
  --layout-min-gap: 16px;

  /* ${mediaQueryLessOrEqual('md')} {
    --layout-min-gap: 12px;
  } */
`;

export const framedByMaxWidth = Object.freeze({
  width: '100%',
  'max-width': 'calc(var(--layout-max-width) + var(--layout-min-gap) * 2)',
  'padding-left': 'var(--layout-min-gap)',
  'padding-right': 'var(--layout-min-gap)', 
  margin: '0 auto',
} as const);