import { html, css, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import { LitElementThemable, ThemeRule } from "../lit-components";
import { Colors } from "../styles";
import "../elements/div-spacer";
import "../elements/mat-button";
import { Themes } from "../types";

@customElement("app-home")
export class AppHome extends LitElementThemable {
  static override styles = css`
    #home {
      display: flex;
      flex-direction: column;
    }
    #home #hero {
      height: 40vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    #home #hero h1 {
      font-size: 5em;
    }

    #home #hero h1 {
      font-size: 3em;
    }

    .cards {
      display: flex;
      flex-direction: row;
      width: 100%;
    }

    .hero-card {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 50%;
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
          <div class="cards">
            <div class="hero-card" style="align-items: center">
              <h1>Money splitter</h1>
              <div-spacer sizev="35px"></div-spacer>
              <h2>Split your money when you pay if ur dumb a math! 🙉🚀</h2>
            </div>
            <div-spacer size="100px"></div-spacer>
            <div class="hero-card" style="align-items: flex-start">
              <mat-button
                @click=${this.onClick}
                text="Start splitting"
                icon="horizontal_split"
                background="#1b913c"
                border="shadow"
              ></mat-button>
            </div>
          </div>
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
