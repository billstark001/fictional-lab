import { css } from "@linaria/core";
import { mediaQueryLessOrEqual } from "@/lib/responsive";
import { darkModeQuery } from "@/lib/theme";


export const markdownStyles = css`
  :global() {

    .md-row {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;

      ${mediaQueryLessOrEqual('sm')} {
        flex-direction: column;
      }
    }

    .md-col {
      flex: 1;
    }

    .md-box {
      padding: 16px;
      margin-bottom: 16px;
      border-radius: 4px;
      border-left-width: 4px;
      border-left-style: solid;

      & > p:first-child {
        margin-top: 0;
      }

      & > p:last-child {
        margin-bottom: 0;
      }
    }

    .md-box.info {
      border-left-color: #2196F3;
      background-color: #E3F2FD;
      color: #0D47A1;
    }
    
    .md-box.success {
      border-left-color: #4CAF50;
      background-color: #E8F5E9;
      color: #1B5E20;
    }
    
    .md-box.warning {
      border-left-color: #FF9800;
      background-color: #FFF3E0;
      color: #E65100;
    }
    
    .md-box.error {
      border-left-color: #F44336;
      background-color: #FFEBEE;
      color: #B71C1C;
    }
    

    ${darkModeQuery} {
      .md-box.info {
        border-left-color: #42A5F5;
        background-color: #0D2B45;
        color: #90CAF9;
      }
      
      .md-box.success {
        border-left-color: #66BB6A;
        background-color: #0D2915;
        color: #A5D6A7;
      }
      
      .md-box.warning {
        border-left-color: #FFA726;
        background-color: #3D2E08;
        color: #FFCC80;
      }
      
      .md-box.error {
        border-left-color: #EF5350;
        background-color: #3C0E0B;
        color: #EF9A9A;
      }
    }

  }
`;

export const globalStyles = css`

  :global() {

    a {
      text-decoration: none;
      color: var(--blue-20);
      transition: all 0.1s ease;

      &:hover {
        color: var(--blue-5);
      }
      &:active {
        color: var(--blue-40);
      }
    }
    
    body {
      margin: 0;
      padding: 0;
      font-family: sans-serif;

      color: var(--gray-5);
      background-color: var(--gray-95);

      line-height: 1.6;
    }

    body, div, p, span {
      transition: background-color 0.1s ease;
    }

    * {
      box-sizing: border-box;
    }

    // #region button

    button {
      border: none;
      border-radius: 8px;
      background: linear-gradient(145deg, #4a90e2, #357abd);
      color: white;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      position: relative;
      overflow: hidden;

      :where(&) {
        padding: 6px 12px;
        font-size: 16px;
        font-weight: 500;
      }
    }
    
    ${darkModeQuery} button {
      background: linear-gradient(145deg,rgb(43, 106, 178),rgb(35, 85, 135));
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
      background: var(--gray-80);
      transform: none;
      box-shadow: none;
    }

    // #endregion

    // #region blockquote

    blockquote {
      font-size: small;
      margin: 0;
      padding: 1em 1.5em;
      border-left: 1px solid var(--blue-20);
      background-color: var(--gray-80);
      overflow-wrap: break-word;
    }

    blockquote p {
      margin: 0.5em 0;
    }

    blockquote cite {
      display: block;
    }

    // #endregion

    // #region heading

    h1, h2, h3, h4, h5, h6 {
      margin-top: 1.5em;
      margin-bottom: 0.8em;
      font-weight: 600;
      line-height: 1.2;
      color: var(--gray-20);
    }

    h1 {
      font-size: 2.5rem;
      border-bottom: 1px solid var(--blue-80);
      padding-bottom: 0.3em;

      &.no-border {
        border-bottom: inherit;
      }
    }

    h2 {
      font-size: 2rem;
      border-bottom: 1px solid var(--gray-80);
      padding-bottom: 0.2em;

      &.no-border {
        border-bottom: inherit;
      }
    }

    h3 {
      font-size: 1.5rem;
      color: var(--blue-20);
    }

    h4 {
      font-size: 1.25rem;
      color: var(--gray-40);
    }

    h5 {
      font-size: 1rem;
      color: var(--gray-40);
    }

    h6 {
      font-size: 0.875rem;
      color: var(--gray-40);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .text-center {
      text-align: center;
    }

    .heading-underline {
      position: relative;
    }

    .heading-underline:after {
      content: '';
      display: block;
      margin-top: 10px;
      height: 3px;
      width: 60px;
      background-color: #3498db;
    }

    .heading-underline.text-center:after {
      margin-left: auto;
      margin-right: auto;
    }

    .heading-light {
      font-weight: 300;
    }

    .heading-accent {
      color: var(--blue-40)
    }

    /* 响应式设计 */
    @media (max-width: 768px) {
        h1 { font-size: 2rem; }
        h2 { font-size: 1.75rem; }
        h3 { font-size: 1.5rem; }
        h4 { font-size: 1.25rem; }
        h5 { font-size: 1rem; }
        h6 { font-size: 0.875rem; }
    }

    // #endregion

    // #region portals

    #nav-menu-root {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 75;
    }

    #portal-root {
      z-index: 150;
    }

    // #endregion

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