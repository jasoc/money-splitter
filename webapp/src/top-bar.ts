import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('top-bar')
export class TopBar extends LitElement {
  static override styles = css`
      #top-bar {
        background-color: green;
      }
    `;

  override render() {
    return html`
      <div id="top-bar">
        suca
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'top-bar': TopBar;
  }
}
