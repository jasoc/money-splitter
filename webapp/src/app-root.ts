import { html, css, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import { LitElementThemable } from "./lit-components";
import { Themes } from "./services";

import { Colors } from "./styles";
import { initRouter } from './routes';
import "./elements";
import "./top-bar";

@customElement("app-root")
export class AppRoot extends LitElementThemable {
  constructor() {
    super();
    setTimeout(() => initRouter());
  }

  override createRenderRoot() {
    return this;
  }

  override themedCSS() {
    return [
      {
        theme: Themes.dark,
        css: css`
          #app-root {
            background-color: ${unsafeCSS(Colors.backgroundDark)};
          }
        `
      },
      {
        theme: Themes.light,
        css: css`
          #app-root {
            background-color: ${unsafeCSS(Colors.backgroundLight)};
          }
        `
      }
    ]
  }

  override html() {
    return html`
      <div
        id="app-root"
        style="
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
        ">
        <top-bar
          style="
            position: sticky;
            top: 0;
            left: 0;
            right: 0;
          "></top-bar>
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
