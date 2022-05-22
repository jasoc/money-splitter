import { html, css, unsafeCSS, TemplateResult, CSSResult } from "lit";
import { customElement } from "lit/decorators.js";
import { LitElementResponsive } from "../lit-components";
import { Colors, Typography } from "../styles";
import "../elements/div-spacer";
import "../elements/mat-button";
import { MediaQuery, Themes } from "../types";
import { defaultMediaQueries } from "../styles";

@customElement("app-home")
export class AppHome extends LitElementResponsive {
  static override styles = css`
    #home {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
    }

    #hero,
    #hero * {
      grid-row: 2;
    }

    #hero #hero__img {
      grid-column: 3;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    #hero #hero__img label {
      font-size: 110px;
    }

    footer {
      width: 100%;
      margin-top: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100px;
    }

    footer .footer__right,
    footer .footer__left {
      display: flex;
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

  defineMediaQuery(): MediaQuery[] {
    return defaultMediaQueries;
  }

  getSizeGap(mediaQuery: MediaQuery): string {
    if (mediaQuery.name == "desktop") {
      return "20vw";
    }
    return "10vw";
  }

  getGithubImage(): string {
    if (this.currentTheme == Themes.dark) {
      return "assets/images/github_white.png";
    }
    return "assets/images/github_black.png";
  }

  getLinkedinImage(): string {
    if (this.currentTheme == Themes.dark) {
      return "assets/images/linkedin_white.png";
    }
    return "assets/images/linkedin_black.png";
  }

  override cssQueried(mediaQuery: MediaQuery): CSSResult {
    if (mediaQuery.name == "mobile") {
      return css`
        #hero {
          height: 70vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        #hero #hero__text {
          padding: 0 8vw 0 8vw;
          text-align: center;
          margin-bottom: 10vh;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          padding: 0 20px 0 0;
        }
      `;
    }

    return css`
      #hero {
        display: grid;
        grid-template-columns: auto auto auto auto;
        grid-template-rows: 20vh auto 20vh;
      }

      #hero #hero__text {
        padding: 0 20px 0 0;
      }

      #hero #hero__img {
        padding: 0 0 0 20px;
      }
    `;
  }

  override htmlQueried(mediaQuery: MediaQuery): TemplateResult<1 | 2> {
    return html`
      <div id="home">
        <div id="hero">
          <div
            style="grid-column: 1;
            width: ${this.getSizeGap(mediaQuery)}"
          ></div>

          <div id="hero__text">
            <h1 .style="${Typography.typeTitle}">Hello there</h1>
            <h2 .style="${Typography.typeDetail}">
              Split your money with your friends without struggling if you are
              dumb at math 🙉🚀
            </h2>
          </div>

          <div id="hero__img">
            <label>💸</label>
          </div>

          <div
            style="grid-column: 4;
            width: ${this.getSizeGap(mediaQuery)}"
          ></div>
        </div>
        <mat-button
          background="${Colors.primaryGreenFederation}"
          icon="alt_route"
          text="Start splitting"
          @click="${() => location.href = "split"}"
        ></mat-button>
        <footer>
          <div class="footer__right">
            <div-spacer size="10vw"></div-spacer>
            <p .style="${Typography.typeDetail}">
              Made with ❤️ by <a href="https://github.com/jasoc">Parisius</a>
            </p>
          </div>

          <div class="footer__left">
            <mat-button
              @click="${() =>
                (location.href =
                  "https://www.linkedin.com/in/paride-giunta-96264918b")}"
              customImage="${this.getLinkedinImage()}"
              background="none"
            >
            </mat-button>
            <mat-button
              @click="${() =>
                (location.href = "https://github.com/jasoc/money-splitter")}"
              customImage="${this.getGithubImage()}"
              background="none"
            >
            </mat-button>
            <div-spacer size="10vw"></div-spacer>
          </div>
        </footer>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-home": AppHome;
  }
}
