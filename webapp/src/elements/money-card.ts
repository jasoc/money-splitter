import { IMoney } from "@money-splitter/splitter";
import {
  html,
  css,
  CSSResult,
  TemplateResult,
  unsafeCSS,
} from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { LitElementThemable } from "../lit-components";
import { Services } from "../services";
import { Colors, Materialize } from "../styles";
import { Themes } from "../types";
import "./mat-button";
import "./mat-input";

@customElement("money-card")
export class MoneyCard extends LitElementThemable {

  @state()
  edit: boolean = false;

  // @state()
  // quantity: number = 1;

  // @state()
  // amount: number = 1;

  @property({ type: Object })
  money: IMoney = {
    amount: 1,
    quantity: 1,
  };

  @property({ attribute: false })
  onSave: (money: IMoney) => void = () => {};

  getThemeIconColor() {
    return Services.theme.selectedTheme === Themes.dark
      ? Colors.fontDark
      : Colors.fontLight;
  }

  override cssThemed(theme: Themes): CSSResult {
    switch (theme) {
      case Themes.dark:
        return css`
          * {
            color: ${unsafeCSS(Colors.fontDark)};
          }
        `;
      case Themes.light:
        return css`
          * {
            color: ${unsafeCSS(Colors.fontLight)};
          }
        `;
    }
  }

  onConfirm(): void {
    this.edit = false;
    this.onSave(this.money);
  }

  onEdit(): void {
    this.edit = true;
  }

  html(): TemplateResult<1 | 2> {
    return html`
      <div class="money-card">
        <div class="top">
          <div class="money-stack">
            ${[...Array(this.money.quantity <= 7 ? this.money.quantity : 7).keys()].map(
              (i) => html`
                <div
                  style="
                    left: ${50 + i * 2}%;
                    top: ${50 + i * 2}%;
                  "
                  class="money-stack-item"
                >
                  <label class="amount">${this.money.amount} €</label>
                </div>
              `
            )}
          </div>
          <div class="controls">
            ${this.edit
              ? html`<mat-button
                  icon="check"
                  text="confirm"
                  color="${this.getThemeIconColor()}"
                  @click=${this.onConfirm}
                  background="none"
                ></mat-button>`
              : html`<mat-button
                  icon="edit"
                  text="edit"
                  color="${this.getThemeIconColor()}"
                  @click=${this.onEdit}
                  background="none"
                ></mat-button>`}
          </div>
        </div>
        ${this.edit
          ? html`
            <div-spacer sizev="40px"></div-spacer>
              <div class="inputs">
                <mat-input
                  type="number"
                  placeholder="amount"
                  startingText="${this.money.amount}"
                  .onChange=${(_: Event, text: string | null) =>
                    (this.money.amount = parseFloat(text ?? ""))}
                  ?flexible=${true}
                  icon="attach_money"
                  color="${Colors.primaryGreenFederation}"
                ></mat-input>
                <div-spacer size="20px"></div-spacer>
                <mat-input
                  type="number"
                  placeholder="quantity"
                  startingText="${this.money.quantity}"
                  .onChange=${(_: Event, text: string | null) =>
                    (this.money.quantity = parseInt(text ?? ""))}
                  ?flexible=${true}
                  icon="123"
                  color="${Colors.primaryGreenFederation}"
                ></mat-input>
              </div>
            `
          : ""}
      </div>
    `;
  }

  static override styles = css`
    .money-card {
      padding: 15px;
      background: rgba(66, 159, 69, 0.23);
      border-radius: 15px;
      width: 400px;
    }
    .money-card .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .money-card .inputs {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    .money-card .money-stack {
      position: relative;
      height: 50px;
      width: 100%;
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .money-card .controls {
      align-items: center;
      display: flex;
      justify-content: center;
      width: 100%;
    }
    .money-card .money-stack .money-stack-item {
      position: absolute;
      height: 50px;
      top: 50%;
      width: 80px;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 10px;
      background-color: #3f8a42;
      ${Materialize.mat3Shadow};
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "money-card": MoneyCard;
  }
}
