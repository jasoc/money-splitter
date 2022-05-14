import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('div-spacer')
export class DivSpacer extends LitElement {


  @property({ type: String })
  size: string = "10px";

  override render() {
    return html`
      <div style="margin-left: ${this.size}"></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'div-spacer': DivSpacer;
  }
}
