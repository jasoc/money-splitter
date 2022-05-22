import { html, css, unsafeCSS, CSSResult } from "lit";
import { customElement } from "lit/decorators.js";
import { LitElementResponsive, LitElementThemable } from "../lit-components";
import { Services } from "../services";
import { Colors, defaultMediaQueries, Typography } from "../styles";
import { MediaQuery, Themes } from "../types";

import "../elements/human-card";
import "../elements/mat-button";

@customElement("app-split")
export class AppSplit extends LitElementResponsive {

  static override styles = css`
    #split #cards-controls {
      display: flex;
      align-items: center;
    }

    #split #cards-controls #cards-controls__buttons {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    #split #human-card__container human-card {
      margin: 30px;
    }

  `;

  override cssQueried(mediaQuery: MediaQuery): CSSResult {
    if (mediaQuery.name == "mobile") {
      return css`
        #split #cards-controls {
          padding: 50px 0 50px 0;
          flex-direction: column;
          justify-content: space-around;
        }
        #split #cards-controls * {
          margin: 10px 0 10px 0;
        }
        #split #cards-controls #cards-controls__buttons {
          width: 100%;
        }
        #split #human-card__container {
          display: flex;
          flex-direction: column;
        }
      `;
    }
    return css`
      #split #cards-controls {
        padding: 50px 100px 50px 100px;
        justify-content: space-evenly;
      }
      #split #cards-controls #cards-controls__buttons {
          width: 50%;
        }
      #split #human-card__container {
        display: grid;
        grid-template-columns: auto auto auto;
      }
    `;
  }

  defineMediaQuery(): MediaQuery[] {
    return defaultMediaQueries;
  }

  addHuman() {

  }

  override cssThemed(theme: Themes): CSSResult {
    if (theme == Themes.dark) {
      return css`
        * {
          color: ${unsafeCSS(Colors.fontDark)};
        }
      `;
    }
    
    return css`
    * {
      color: ${unsafeCSS(Colors.fontLight)};
    }
  `;
  }

  override html() {
    return html`
      <div id="split">
        <div id="cards-controls">
          <label .style="${Typography.typeSubtitle}">
            Add people or start the calculation
          </label>
          <div id="cards-controls__buttons">
            <mat-button
              @click="${() => this.addHuman()}"
              icon="add"
              text="Add a person">
            </mat-button>
            <mat-button
              @click="${() => this.addHuman()}"
              icon="functions"
              text="Calculate split">
            </mat-button>
          </div>
        </div>
        <div id="human-card__container">
          ${Services.storage.get.humans.map(
            (human) => html` <human-card .human=${human}></human-card> `
          )}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-split": AppSplit;
  }
}
