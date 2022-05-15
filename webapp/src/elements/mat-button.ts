import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./mat-icon";
import "./div-spacer";
import {
  mat3Shadow,
  mat3Border,
  robotoFlexSemibold,
} from "../styles/materialize.css";
import "@polymer/paper-ripple";

@customElement("mat-button")
export class MatButton extends LitElement {

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
      transition-duration: 0.3s;
      ${robotoFlexSemibold};
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

  @property({ type: String })
  border: "min" | "shadow" | null = null;

  override render() {
    return html`
      <button
        style="
          background: ${this.background};
          color: ${this.color};
          ${this.border === "shadow" ? mat3Shadow : ""}
          ${this.border === "min" ? mat3Border : ""}
        "
      >
        ${this.icon ? html` <mat-icon icon="${this.icon}"></mat-icon> ` : ""}
        ${this.text && this.icon
          ? html` <div-spacer size="12px"></div-spacer> `
          : ""}
        ${this.text}
        <paper-ripple></paper-ripple>
        <slot></slot>
        ${this.underline ? html`
          <div
            class="hover-bar"
            style="background-color: ${this.color}"
            ></div>
        ` : ""}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mat-button": MatButton;
  }
}
