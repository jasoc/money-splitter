import { html, css, unsafeCSS, CSSResult, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LitElementResponsive } from "../lit-components";
import { Colors, defaultMediaQueries, Typography } from "../styles";
import { MediaQuery, Themes } from "../types";
import "../elements/mat-input";
import "../elements/div-spacer";
import "../elements/mat-button";

@customElement("app-add-human")
export class AppAddHuman extends LitElementResponsive {

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

  private name: string | null = null;
  private amount: number | null = null;

  @state()
  private onNameError: boolean = false;

  @state()
  private onAmountError: boolean = false;

  validate(): void {
    
    if (!this.name) {
      this.onNameError = true;
      return;
    }
    
    this.onNameError = false;

    if (!this.amount) {
      this.onAmountError = true;
      return;
    }

    this.onAmountError = false;
  }

  override htmlQueried(mediaQuery: MediaQuery): TemplateResult<1 | 2> {
    return html`
      <div id="add-human">
        <h1 class="title" .style="${Typography.typeTitle}">
          Add a new person
        </h1>
        <mat-input
          icon="person"
          tip="${this.onNameError ? 'Please enter a name' : 'Name should be unique'}"
          color="${this.onNameError ? '#b81e1e' : Colors.primaryGreenFederation}"
          placeholder="Person name"
          .onChange=${(_: Event, text: string | null) => (this.name = text)}
        ></mat-input>
        <div-spacer sizev="70px"></div-spacer>
        <mat-input
          icon="payments"
          .tip="${this.onAmountError ? 'Please enter a valid amount' : null}"
          type="number"
          color="${this.onAmountError ? '#b81e1e' : Colors.primaryGreenFederation}"
          placeholder="Amount to pay"
          .onChange=${(_: Event, text: string | null) => (this.amount = parseInt(text ?? ''))}
        ></mat-input>
        <div-spacer sizev="70px"></div-spacer>
        <mat-button
          text="Confirm"
          @click=${this.validate}
          background="${Colors.primaryGreenFederation}"
          icon="check"
        ></mat-button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-add-human": AppAddHuman;
  }
}
