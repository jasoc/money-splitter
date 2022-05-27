import { html, css, unsafeCSS, CSSResult, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
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
      padding: 50px;
    }
    #split #human-card__container {
      padding: 30px;
    }
    #split #human-card__container * {
      padding: 12px;
    }
  `;

  override cssQueried(mediaQuery: MediaQuery): CSSResult {
    if (mediaQuery.name == "mobile") {
      return css`
        #split #cards-controls {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        #split #cards-controls #cards-controls__buttons {
          display: flex;
        }
        #split #human-card__container {
          display: flex;
          flex-direction: column;
        }
      `;
    }
    return css`
      #split #cards-controls {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 50px;
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

  onHumanAdd(): void {
    location.href = "humans/1";
  }

  override htmlQueried(mediaQuery: MediaQuery): TemplateResult<1 | 2> {
    return html`
      <div id="split">
        <div id="cards-controls">
          <label .style="${Typography.typeSubtitle}">
            Add people or start the calculation
          </label>

          ${mediaQuery.name == "mobile"
            ? html`
                <div-spacer sizev="4vw"></div-spacer>

                <div id="cards-controls__buttons">
                  <mat-button
                    icon="add"
                    @click=${this.onHumanAdd}
                    background="#1c7530"
                  ></mat-button>

                  <div-spacer size="2vw"></div-spacer>

                  <mat-button
                    icon="functions"
                    background="#9f3a3a"
                  ></mat-button>
                </div>
              `
            : html`
                <div-spacer size="2vw"></div-spacer>

                <mat-button
                  icon="add"
                  @click=${this.onHumanAdd}
                  background="#1c7530"
                  text="Add a person"
                ></mat-button>

                <div-spacer size="2vw"></div-spacer>

                <mat-button
                  icon="functions"
                  background="#9f3a3a"
                  text="Calculate split"
                ></mat-button>
              `}
        </div>
        <div id="human-card__container">
          ${Services.storage.get.humans.map(
            (human) => html`<human-card .human=${human}></human-card>`
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
