import { html, css, CSSResult, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { LitElementResponsive } from "../lit-components";
import { Colors, defaultMediaQueries, Materialize } from "../styles";
import { MediaQuery, Themes } from "../types";

import './mat-button';

export interface Context {
  text: string;
  icon: string;
  action: () => any;
}

@customElement("context-menu")
export class ContextMenu extends LitElementResponsive {

  @state()
  private _styleFloatWidth: 'left' | 'right' = 'left';

  @state()
  private _styleFloatHeight: 'top' | 'bottom' = 'top';

  constructor() {
    super();
    setTimeout(() => {
      let contextMenuElement = this.shadowRoot?.querySelector('.context-menu');

      const width = this.mobile ? window.outerWidth : window.innerWidth;
      const height = this.mobile ? window.outerHeight : window.innerHeight;

      if (contextMenuElement) {

        if (width <= this.x + contextMenuElement.clientWidth) {
          this._styleFloatWidth = 'right';
          this.x = width - this.x;
        }
  
        if (height <= this.y + contextMenuElement.clientHeight) {
          this._styleFloatHeight = 'bottom';
          this.x = height - this.y;
        }
      }
    });
  }

  defineMediaQuery(): MediaQuery[] {
    return defaultMediaQueries;
  }

  @property({ type: Array })
  context: Context[] = [];

  @property({ type: Number })
  x: number = 0;

  @property({ type: Number })
  y: number = 0;
  
  getButtonColor(): string {
    if (this.currentTheme == Themes.dark) {
      return Colors.fontDark;
    }
    else {
      return Colors.fontLight;
    }
  }

  static override styles = css`
    .context-menu {
      position: absolute;
      border-radius: 10px;
      ${Materialize.mat3Shadow};
    }

    mat-button {
      width: 100%;
    }
  `;

  override cssThemed(theme: Themes): CSSResult {
    if (theme == Themes.dark) {
      return css`
        .context-menu {
          background-color: #212121;
          color: #ccc;
        }
      `;
    }

    if (theme == Themes.light) {
      return css`
        .context-menu {
          background-color: #e9e9e9;
          color: #0f0f0f;
      `;
    }

    return css``;
  }

  override css(): CSSResult {
    return css`
      .context-menu {
        ${unsafeCSS(this._styleFloatWidth)}: ${this.x}px;
        ${unsafeCSS(this._styleFloatHeight)}: ${this.y}px;
      }
    `;
  }

  override html() {
    return html`
      <div class="context-menu">
        ${this.context.map(
          (item) => html`
            <mat-button
              @click=${() => item.action()}
              icon=${item.icon}
              background='none'
              align=left
              ?flexible=${true}
              color=${this.getButtonColor()}
              text=${item.text}
            ></mat-button>
          `
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "context-menu": ContextMenu;
  }
}
