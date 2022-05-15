import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('mat-icon')
export class MatIcon extends LitElement {
  static override styles = css`
    :host {
      font-family: "Material Icons Outlined";
    }
  `;
  
  @property({ type: String })
  icon: string = 'home';
  
  override render() {
    return html`
    <span class="material-icons-outlined">${this.icon}</span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mat-icon': MatIcon;
  }
}
