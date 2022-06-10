import { html, css, unsafeCSS, CSSResult, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LitElementResponsive, LitElementThemable } from "../lit-components";
import { Services } from "../services";
import { Colors, defaultMediaQueries, Typography } from "../styles";
import { MediaQuery, Themes } from "../types";

import "../elements/human-card";
import "../elements/mat-button";
import {
  Move,
  Token,
  Pot,
  resolveAllRestLinear,
  Entity,
  IsEntity,
  IsMoneyArr,
  IsString,
  Money,
} from "@money-splitter/splitter";

@customElement("app-split")
export class AppSplit extends LitElementResponsive {
  @state()
  private finalPot: Pot | null = null;

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
    #split #result {
      display: flex;
      padding: 50px;
      flex-direction: column;
      align-items: center;
    }
    #split #result .move {
      margin-bottom: 20px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
    }
    #split #result .move .chip {
      padding: 6px 10px 6px 10px;
      border-radius: 7px;
      margin: 0 10px 0 10px;
      cursor: pointer;
      ${Typography.typeClick};
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

  onCalculationStart(): void {
    this.finalPot = resolveAllRestLinear(Services.storage.get.humans);
  }

  onHumanAdd(): void {
    location.href = "humans?id=new";
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
                    @click=${this.onCalculationStart}
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
                  @click=${this.onCalculationStart}
                  text="Calculate split"
                ></mat-button>
              `}
        </div>
        <div id="human-card__container">
          ${Services.storage.get.humans.map(
            (human) => html`<human-card .human=${human}></human-card>`
          )}
        </div>
        ${this.finalPot
          ? html`
              <div id="result">
                <label .style=${Typography.typeTitle}>Final result</label>
                <div-spacer sizev="50px"></div-spacer>
                ${this.finalPot.moves.map(
                  (move) => html`
                    <div class="move" .style="${Typography.typeSubtitle}">
                      ${move.tokens().map((token) => this.switchToken(token))}
                    </div>
                  `
                )}
              </div>
            `
          : ""}
      </div>
    `;
  }

  onEntityClick(name: string): void {
    const index: number = Services.storage.get.humans
      .map((h) => h.name)
      .indexOf(name);
    if (index !== -1) {
      location.href = `humans?id=${index}`;
    }
  }

  switchToken(token: Token): TemplateResult {
    if (IsEntity(token)) {
      return html`
        <div
          class="chip"
          style="background-color: #2d47ae;"
          @click=${() => this.onEntityClick(token.name)}
        >
          ${token.name}
        </div>
      `;
    }
    if (IsMoneyArr(token)) {
      return html`
        ${(<Money[]>token).map(
          (t: Money) => html`
            <div
              class="chip"
              style="background-color: #1d8842;"
              @click=${() => this.onEntityClick(t.owner.name)}
            >
              ${t.amount} x ${t.quantity}
            </div>
          `
        )}
      `;
    }
    if (IsString(token)) {
      return html`${token}`;
    }
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-split": AppSplit;
  }
}
