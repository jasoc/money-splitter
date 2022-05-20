import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('div-spacer')
export class DivSpacer extends LitElement {


  @property({ type: String })
  size: string = "0px";
  
  @property({ type: String })
  sizev: string = "0px";

  override render() {
    return html`
      <div style="margin-left: ${this.size}; margin-top: ${this.sizev}"></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'div-spacer': DivSpacer;
  }
}
