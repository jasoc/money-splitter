import { html, css, unsafeCSS, CSSResult, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LitElementResponsive } from "../lit-components";
import { Colors, defaultMediaQueries, Typography } from "../styles";
import { MediaQuery, Themes } from "../types";
import "../elements/mat-input";
import "../elements/div-spacer";
import "../elements/mat-button";
import "../elements/money-card";
import { IHuman, IMoney } from "@money-splitter/splitter";
import { Services } from "../services";

@customElement("app-add-human")
export class AppAddHuman extends LitElementResponsive {
  @state()
  private onNameError: boolean = false;

  @state()
  private onAmountError: boolean = false;

  @state()
  private thisHuman: IHuman;

  @state()
  private cancelConfirm: boolean = false;

  @state()
  private noMoneyError: boolean = false;

  private isEditing: boolean = false;

  private errorName: string = "";

  constructor() {
    super();
    let ID: string | null = new URLSearchParams(window.location.search).get(
      "id"
    );

    if (!ID) {
      ID = "new";
    }

    this.isEditing = ID !== "new";

    if (ID === "new") {
      this.thisHuman = {
        name: "",
        amountToPay: 0,
        money: [],
      };
    } else {
      this.thisHuman = Services.storage.get.humans[parseInt(ID)];
    }
  }

  override cssQueried(mediaQuery: MediaQuery): CSSResult {
    if (mediaQuery.name == "mobile") {
      return css``;
    }
    return css``;
  }

  defineMediaQuery(): MediaQuery[] {
    return defaultMediaQueries;
  }

  static override styles = css`
    #add-human {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    #add-human .title {
      margin: 70px 0;
    }

    #add-human #money-cards {
      display: flex;
      flex-direction: column;
    }

    #add-human #money-cards money-card {
      margin-bottom: 30px;
    }

    .controls {
      display: flex;
    }

    .error {
      color: red;
    }
  `;

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

  validate(): void {
    if (!this.thisHuman.name) {
      this.onNameError = true;
      this.errorName = "Please enter a name";
      return;
    }

    if (
      !this.isEditing &&
      Services.storage.get.humans.find(
        (human) => human.name === this.thisHuman.name
      )
    ) {
      this.errorName = "There is already a human with this name";
      this.onNameError = true;
      return;
    }

    this.onNameError = false;

    if (!this.thisHuman.amountToPay) {
      this.onAmountError = true;
      return;
    }

    this.onAmountError = false;

    if (this.thisHuman.money.length === 0) {
      this.noMoneyError = true;
      return;
    }

    let count = 0;

    for (let money of this.thisHuman.money) {
      count += money.quantity * money.amount;
    }

    if (count < this.thisHuman.amountToPay) {
      this.noMoneyError = true;
      return;
    }

    if (!this.isEditing) {
      Services.storage.set.humans.push(this.thisHuman);
    }

    Services.storage.set.humans[this.humanIndex] = this.thisHuman;

    location.href = "split";
  }

  updateMoney(index: number, money: IMoney) {
    this.thisHuman.money[index] = money;
  }

  get humanIndex(): number {
    let index = 0;
    Services.storage.get.humans.forEach((human, i) => {
      if (human.name === this.thisHuman.name) {
        index = i;
      }
    });
    return index;
  }

  addMoney() {
    this.thisHuman.money.push({
      amount: 1,
      quantity: 1,
    });
    this.requestUpdate();
  }

  deleteHuman(): void {
    if (!this.cancelConfirm) {
      this.cancelConfirm = true;
      return;
    }

    if (this.isEditing) {
      Services.storage.set.humans.splice(this.humanIndex, 1);
    }

    location.href = "split";
  }

  override htmlQueried(mediaQuery: MediaQuery): TemplateResult<1 | 2> {
    return html`
      <div id="add-human">
        <h1 class="title" .style="${Typography.typeTitle}">Add a new person</h1>
        <mat-input
          icon="person"
          .startingText="${this.isEditing ? this.thisHuman.name : null}"
          tip="${this.onNameError ? this.errorName : "Name should be unique"}"
          color="${this.onNameError
            ? "#b81e1e"
            : Colors.primaryGreenFederation}"
          placeholder="Person name"
          .onChange=${(_: Event, text: string | null) =>
            (this.thisHuman.name = text ?? "")}
        ></mat-input>
        <div-spacer sizev="70px"></div-spacer>
        <mat-input
          icon="payments"
          .startingText="${this.isEditing
            ? this.thisHuman.amountToPay.toString()
            : null}"
          .tip="${this.onAmountError ? "Please enter a valid amount" : null}"
          type="number"
          color="${this.onAmountError
            ? "#b81e1e"
            : Colors.primaryGreenFederation}"
          placeholder="Amount to pay"
          .onChange=${(_: Event, text: string | null) =>
            (this.thisHuman.amountToPay = parseInt(text ?? ""))}
        ></mat-input>
        <div-spacer sizev="70px"></div-spacer>
        <div class="controls">
          <mat-button
            text=${this.cancelConfirm
              ? "Click again to confirm deletion"
              : "Delete person"}
            @click=${this.deleteHuman}
            background="#c41c1c"
            icon=${this.cancelConfirm ? "error" : "delete"}
          ></mat-button>
          <div-spacer size="20px"></div-spacer>
          <mat-button
            text="Add money"
            @click=${this.addMoney}
            background="#a5570c"
            icon="add_circle"
          ></mat-button>
          <div-spacer size="20px"></div-spacer>
          <mat-button
            text="Confirm"
            @click=${this.validate}
            background="${Colors.primaryGreenFederation}"
            icon="check"
          ></mat-button>
        </div>
        <div-spacer sizev="70px"></div-spacer>
        ${this.noMoneyError
          ? html`
              <label .style="${Typography.typeDetailTitle}" class="error"
                >Please add the necessary amount of money</label
              >
              <div-spacer sizev="20px"></div-spacer>
            `
          : null}
        <label .style="${Typography.typeSubtitle}">Money 💸</label>
        <div-spacer sizev="60px"></div-spacer>
        <div id="money-cards">
          ${this.thisHuman.money.map(
            (currMoney, i) => html`
              <money-card
                .money=${currMoney}
                .onSave=${(money: IMoney) => this.updateMoney(i, money)}
              ></money-card>
            `
          )}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-add-human": AppAddHuman;
  }
}
