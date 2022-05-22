import { html, css, unsafeCSS, CSSResult } from "lit";
import { customElement } from "lit/decorators.js";
import { LitElementResponsive, LitElementThemable } from "../lit-components";
import { Services } from "../services";
import { Colors, defaultMediaQueries } from "../styles";
import { MediaQuery, Themes } from "../types";

import "../elements/human-card";

@customElement("app-split")
export class AppSplit extends LitElementResponsive {

  static override styles = css`

    #split #human-card__container human-card {
      margin: 30px;
    }
  `;

  override cssQueried(mediaQuery: MediaQuery): CSSResult {
    if (mediaQuery.name == "mobile") {
      return css`
        #split #human-card__container {
          display: flex;
          flex-direction: column;
        }
      `;
    }
    return css`
      #split #human-card__container {
        display: grid;
        grid-template-columns: auto auto auto;
      }
    `;
  }

  defineMediaQuery(): MediaQuery[] {
    return defaultMediaQueries;
  }

  override html() {
    return html`
      <div id="split">
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
