import { LitElement, html, css, CSSResult, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { LitElementThemable } from "../lit-components";
import { Colors, Typography } from "../styles";
import { Themes } from "../types";
import "./mat-icon";

@customElement("mat-input")
export class MatInput extends LitElementThemable {

  @property({ type: String })
  color: string = "royalblue";

  @property({ type: String })
  type: string = "text";

  @property({ type: Boolean })
  flexible: boolean = false;

  @property({ type: String })
  icon: string | null = null;

  @property({ type: String })
  tip: string | null = null;

  @property({ type: String })
  placeholder: string = "Text here";

  @property({ attribute: false })
  onChange: (event: Event, text: string | null) => void = () => {};

  @state()
  _onFocus: boolean = false;

  get onFocus(): boolean {
    return this._onFocus || this.text != null;
  }

  static override styles = css`
    :host {
      font-family: "Roboto flex";
    }

    .mat-input {
      border-radius: 7px;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 20px;
    }

    .mat-input .placeholder {
      position: absolute;
      pointer-events: none;
      left: 0;
      transform: translate(20%, -50%);
    }

    .mat-input .tip {
      font-size: 0.7em !important;
      position: absolute;
      bottom: -23px;
    }

    .mat-input input {
      background: none;
      outline: none;
      border: none;
      width: 100%;
    }

    .mat-input mat-icon {
      font-size: 1.4em;
      user-select: none;
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

  get text(): string | null {
    const txt = this.shadowRoot?.querySelector("input")?.value;
    return txt != '' ? txt ?? null : null;
  }

  onTextChange(event: Event): void {
    this.onChange(event, this.text);
  }

  override html() {
    return html`
      <div
        class="mat-input"
        style="
          border: ${this.onFocus
          ? `3px solid ${this.color}`
          : `1px solid grey`};
          padding: ${this.onFocus ? `13px` : `15px`};
          width: ${this.flexible ? '100%' : '300px'};
        "
      >
        <label
          class="placeholder"
          .style="
            color: ${this.onFocus ? `${this.color}` : 'grey'};
            ${Typography.typeClick};
            top: ${this.onFocus ? '-50%' : '50%'};
          "
        >
          ${this.placeholder}
        </label>
        <label
          class="tip"
          .style="
            color: ${this.onFocus ? `${this.color}` : 'grey'};
            ${Typography.typeClick};
          "
        >
          ${this.tip}
        </label>
        <input
          @focus="${() => (this._onFocus = true)}"
          @blur="${() => (this._onFocus = false)}"
          @change=${this.onTextChange}
          .type="${this.type}"
        />
        ${this.icon ? html`
          <mat-icon
            .icon="${this.icon}"
            style="
              color: ${this.onFocus ? `${this.color}` : 'grey'};
            "
          ></mat-icon>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mat-input": MatInput;
  }
}
