import { IHuman } from '@money-splitter/splitter';
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('human-card')
export class HumanCard extends LitElement {
  static override styles = css`
  `;

  @property({ type: Object })
  human: IHuman = {
    name: '',
    money: [],
    amountToPay: 0,
  };

  override render() {
    return html`
      <div class="human-card">
        <h1 class="name">${this.human.name}</h1>
        <h3>${this.human.amountToPay}</h3>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'human-card': HumanCard;
  }
}
