import { html, css, unsafeCSS, TemplateResult, CSSResult } from "lit";
import { customElement } from "lit/decorators.js";
import {
  LitElementResponsive,
  LitElementThemable,
  MediaQuery,
  ThemeRule,
} from "../lit-components";
import { Colors, Sizes } from "../styles";
import "../elements/div-spacer";
import "../elements/mat-button";
import { Themes } from "../types";

@customElement("app-home")
export class AppHome extends LitElementResponsive {
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

  defineMediaQuery(): MediaQuery[] {
    return [
      {
        name: "mobile",
        minWidth: 900,
      },
      {
        name: "desktop",
        minWidth: 3000,
      },
      {
        name: "wide",
        minWidth: 4000,
      },
    ];
  }

  getSizeGap(mediaQuery: MediaQuery): string {
    if (mediaQuery.name == "desktop") {
      return Sizes.sideGap;
    }
    return "10vw";
  }

  override cssQueried(mediaQuery: MediaQuery): CSSResult {
      
  }

  override htmlQueried(mediaQuery: MediaQuery): TemplateResult<1 | 2> {
    return html`
      <div id="home">
        <div id="hero">
          <div
            style="grid-column: 1;
            grid-row: 2;
            width: ${this.getSizeGap(mediaQuery)}"
          ></div>
          <div
            id="hero__text"
            style="grid-row: 2;
            width: calc(100vw - ${Sizes.sideGap} - ${Sizes.sideGap})"
          >
            <h1>Ciao</h1>
            <h2>Coglione su ${mediaQuery.name}</h2>
          </div>
          <div
            style="grid-column: 3;
            grid-row: 2;
            width: ${this.getSizeGap(mediaQuery)}"
          ></div>
        </div>
      </div>
    `;
  }

  onClick() {}
}

declare global {
  interface HTMLElementTagNameMap {
    "app-home": AppHome;
  }
}
