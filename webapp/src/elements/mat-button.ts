import { html, css, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./mat-icon";
import "./div-spacer";
import "@polymer/paper-ripple";
import { LitElementResponsive } from "../lit-components";
import { MediaQuery } from "../types";
import { Materialize, Typography } from "../styles";

@customElement("mat-button")
export class MatButton extends LitElementResponsive {

  defineMediaQuery(): MediaQuery[] {
    return [];
  }

  static override styles = css`
    button {
      position: relative;
      padding: 18px 20px;
      border: none;
      outline: none;
      border-radius: 9px;
      font-size: 13px;
      color: green;
      white-space: nowrap;
      font-size: 1em;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      ${Typography.typeClick};
    }

    button .button-inner {
      width: 100%;
      display: flex;
      border-radius: 5px;
      flex-direction: row;
      align-items: center;
    }

    button img {
      width: 24px;
    }

    button .hover-bar {
      position: absolute;
      transition-duration: 0.3s;
      bottom: 0;
      width: 0;
      height: 2px;
      opacity: 0.3;
      border-radius: 5px;
    }

    button:hover .hover-bar {
        width: 80%;
    }

    mat-icon {
      font-size: 1.3em;
    }
  `;

  @property({ type: String })
  background: string = "royalblue";

  @property({ type: String })
  color: string = "white";

  @property({ type: String })
  icon: string | null = null;

  @property({ type: String })
  text: string | null = null;

  @property({ type: Boolean })
  underline: boolean = false;

  @property({ type: Boolean })
  flexible: boolean = false;

  @property({ type: String })
  align: 'left' | 'center' | 'right' = 'center';

  @property({ type: String })
  border: "min" | "shadow" | null = null;

  @property({ type: String })
  customImage?: string;

  override css() {
    return css`

      button {
        ${unsafeCSS(this.flexible ? css`width: 100%` : 'auto')};
      }

      button button-inner {
        ${unsafeCSS(this.align === 'left' ? css`justify-content: flex-start` : '')};
        ${unsafeCSS(this.align === 'center' ? css`justify-content: center` : '')};
        ${unsafeCSS(this.align === 'right' ? css`justify-content: flex-end` : '')};
      }
    `;
  }

  override html() {
    return html`
      <button
        style="
          background: ${this.background};
          color: ${this.color};
          ${this.border === "shadow" ? Materialize.mat3Shadow : ""}
          ${this.border === "min" ? Materialize.mat3Border : ""}
        "
      >
      <paper-ripple></paper-ripple>
      <div class="button-inner">
          ${this.icon ? html` <mat-icon icon="${this.icon}"></mat-icon> ` : ""}
          ${this.customImage ? html` <img src="${this.customImage}"> ` : ""}
          ${this.text && this.icon
            ? html` <div-spacer size="12px"></div-spacer> `
            : ""}
          ${this.text}
          <slot></slot>
          ${this.underline ? html`
            <div
              class="hover-bar"
              style="background-color: ${this.color}">
            </div>
          ` : ""}
        </div>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mat-button": MatButton;
  }
}
