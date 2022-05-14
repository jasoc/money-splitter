import { html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { LitElementThemable } from "./lit-components";
import { Themes } from "./services";
import { Colors } from "./styles";

import "./top-bar";

@customElement("app-root")
export class AppRoot extends LitElementThemable {
  constructor() {
    super();
    this.registerThemes();
  }

  registerThemes() {
    this.registerFor(Themes.dark, [
      ["background-color", Colors.backgroundDark],
    ]);
    this.registerFor(Themes.light, [
      ["background-color", Colors.backgroundLight],
    ]);
  }

  static override styles = css`
    #app-root {
      width: 100%;
      height: 100vh;
      display: flex;
      flex-direction: column;
    }

    #app-main {
      animation-duration: 100ms;
    }

    top-bar {
      position: sticky;
      top: 0;
      left: 0;
      right: 0;
    }
  `;

  override render() {
    return html`
      <div id="app-root">
        <top-bar></top-bar>

        <div
          id="app-main"
          style="${this.getAllValues()}"
        >
          ${[...Array(1000).keys()].map((el) => html`<div>${el}</div>`)}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-root": AppRoot;
  }
}
