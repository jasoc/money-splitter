import { html, css, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import { LitElementThemable, ThemeRule } from "../lit-components";
import { Colors, Sizes } from "../styles";
import "../elements/div-spacer";
import "../elements/mat-button";
import { Themes } from "../types";

@customElement("app-home")
export class AppHome extends LitElementThemable {

  constructor() {
    super();

  }

  static override styles = css`
    #home {
      height: 100%;
    }

    #hero {
      display: grid;
      grid-template-columns: auto auto auto;
      grid-template-rows: 10vh auto;
    }

    #hero #hero__text {
      grid-column: 2;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  `;

  override themedCSS(): ThemeRule[] {
    return [
      {
        theme: Themes.dark,
        css: css`
          h1,
          h2 {
            color: ${unsafeCSS(Colors.fontDark)};
          }
        `,
      },
      {
        theme: Themes.light,
        css: css`
          h1,
          h2 {
            color: ${unsafeCSS(Colors.fontLight)};
          }
        `,
      },
    ];
  }

  override html() {
    return html`
      <div id="home">
        <div id="hero">
          <div style="grid-column: 1; grid-row: 2; width: ${Sizes.sideGap}"></div>
          <div id="hero__text" style="grid-row: 2; width: calc(100vw - ${Sizes.sideGap} - ${Sizes.sideGap})">
            <h1>Ciao</h1>
            <h2>Coglione</h2>
          </div>
          <div style="grid-column: 3; grid-row: 2; width: ${Sizes.sideGap}"></div>
        </div>
      </div>
    `;
  }

  onClick() {
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-home": AppHome;
  }
}
