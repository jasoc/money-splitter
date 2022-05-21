import { html, css, unsafeCSS, CSSResult } from "lit";
import { customElement } from "lit/decorators.js";
import { LitElementThemable } from "./lit-components";

import { Colors } from "./styles";
import { initRouter } from "./routes";
import "./elements";
import "./top-bar";
import { Themes } from "./types";

@customElement("app-root")
export class AppRoot extends LitElementThemable {
  cssThemed(theme: Themes): CSSResult {
    switch (theme) {
      case Themes.dark:
        return css`
        #app-root {
          background-color: ${unsafeCSS(Colors.backgroundDark)};
        }
      `;
      case Themes.light:
        return css`
          #app-root {
            background-color: ${unsafeCSS(Colors.backgroundLight)};
          }
        `;
    }
  }

  constructor() {
    super();
    setTimeout(() => this.attachRouterOutlet());
  }
  
  attachRouterOutlet(): void {
    const router = this.shadowRoot?.getElementById("router");
    if (router) {
      initRouter(router);
    }
  }

  static override styles = css`
    #app-root {
      width: 100%;
      min-height: 100%;
      display: flex;
      flex-direction: column;
    }

    top-bar {
      position: sticky;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
    }

    #router {
      height: 100%;
      z-index: 0;
    }
  `;

  override html() {
    return html`
      <div id="app-root">
        <top-bar></top-bar>
        <div id="router"></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-root": AppRoot;
  }
}
