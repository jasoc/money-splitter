import { IHuman } from '@money-splitter/splitter';
import { LitElement, html, css, CSSResult, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { LitElementResponsive } from '../lit-components';
import { Colors, defaultMediaQueries, Materialize, Typography } from '../styles';
import { MediaQuery, Themes } from '../types';
import "./div-spacer";
import "./add-human-dialog";
import "./mat-button";
import { Services } from '../services';

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
      /* background-color: #d0f3b31c; */
      padding: 15px;
      border-radius: 13px;
      display: flex;
      flex-direction: row;
      ${Materialize.mat3Border};
      justify-content: space-between;
      align-items: center;
    }

    .left {
      display: flex;
      flex-direction: column;
    }
  `;

  onHumanEdit(): void {
    let i = 0;

    Services.storage.get.humans
      .forEach((human: IHuman, index: number) => {
        if (this.human.name === human.name) {
          i = index;
        }
      });
    
    location.href = `humans?id=${i}`;
  }

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
        <div class="left">
          <label .style="${Typography.typeTitle}">
            ${this.human.name}
          </label>
          <div-spacer sizev="20px"></div-spacer>
          <label .style="${Typography.typeDetailTitle}">
            Has to pay: <span .style="${Typography.typeDetail}">${this.human.amountToPay}</span>
          </label>
        </div>
        <mat-button
          text="Edit"
          background="#174e36"
          @click="${this.onHumanEdit}"
          icon="edit"
        ></mat-button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'human-card': HumanCard;
  }
}
