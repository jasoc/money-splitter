import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import './top-bar';

@customElement('app-root')
export class AppRoot extends LitElement {
  static override styles = css`
      #app-root {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;

        top-bar {
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
        }

      }

    `;

  override render() {
    return html`
      <div id="app-root">
        
      <top-bar></top-bar>

        <div id="app-main">
          ${[...Array(100).keys()].map((el) => html`<div>${el}</div>`)}
        </div>

      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-root': AppRoot;
  }
}
