import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './mat-icon';
import './div-spacer';

import { mat3Shadow, mat3Border, robotoFlexSemibold } from '../styles/materialize.css';

@customElement('mat-button')
export class MatButton extends LitElement {
  static override styles = css`
      button {
        padding: 18px 20px;
        border: none;
        outline: none;
        border-radius: 9px;
        font-size: 13px;
        color: green;
        font-size: 1em;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        ${robotoFlexSemibold};
      }

      mat-icon {
        font-size: 1.3em;
      }
    `;

  @property({ type: String })
  background: string = 'royalblue';
  
  @property({ type: String })
  color: string = 'white';

  @property({ type: String })
  icon: string | null = null;

  @property({ type: String })
  border: 'min' | 'shadow' | null = null;
  
  override render() {
    return html`
      <button
        style="
          background: ${this.background};
          color: ${this.color};
          ${this.border === 'shadow' ? mat3Shadow : ''}
          ${this.border === 'min'    ? mat3Border : ''}
        ">
        ${this.icon ? html`
          <mat-icon icon="${this.icon}"></mat-icon>
          <div-spacer size="12px"></div-spacer>
        ` : ''}
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mat-button': MatButton;
  }
}
