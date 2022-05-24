import { IHuman } from '@money-splitter/splitter';
import { LitElement, html, css, CSSResult, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { LitElementResponsive } from '../lit-components';
import { Colors, defaultMediaQueries, Materialize, Typography } from '../styles';
import { MediaQuery, Themes } from '../types';
import "./div-spacer";
import "./add-human-dialog";

@customElement('human-card')
export class HumanCard extends LitElementResponsive {

  defineMediaQuery(): MediaQuery[] {
    return defaultMediaQueries;
  }

  @property({ type: Object })
  human: IHuman = {
    name: '',
    money: [],
    amountToPay: 0,
  };

  static override styles = css`
    .human-card {
      background-color: #d0f3b31c;
      padding: 15px;
      border-radius: 13px;
      display: flex;
      flex-direction: column;
      ${Materialize.mat3Shadow};
    }
  `;

  override cssThemed(theme: Themes): CSSResult {
      if (theme == Themes.dark) {
        return css`
          * {
            color: ${unsafeCSS(Colors.fontDark)};
          }
        `;
      }

      if (theme == Themes.light) {
        return css`
          * {
            color: ${unsafeCSS(Colors.fontLight)};
          }
        `;
      }

      return css``;
  }

  override html() {
    return html`
      <div class="human-card">
        <label .style="${Typography.typeTitle}">
          ${this.human.name}
        </label>
        <div-spacer sizev="20px"></div-spacer>
        <label .style="${Typography.typeDetailTitle}">
          Has to pay: <span .style="${Typography.typeDetail}">${this.human.amountToPay}</span>
        </label>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'human-card': HumanCard;
  }
}
