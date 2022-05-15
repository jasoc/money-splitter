import { html, css, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import { LitElementThemable, ThemeRule } from "../lit-components";
import { Themes } from "../services";
import { Colors } from "../styles";

@customElement("app-about")
export class AppAbout extends LitElementThemable {
  
  override themedCSS(): ThemeRule[] {
    return [
      {
        theme: Themes.dark,
        css: css`
          h1, h2 {
            color: ${unsafeCSS(Colors.fontDark)};
          }
        `
      },
      {
        theme: Themes.light,
        css: css`
          h1, h2 {
            color: ${unsafeCSS(Colors.fontLight)};
          }
        `
      }
    ]
  }

  override html() {
    return html`
      <div id="home">
        <h1>
          Questo sito è bellissimo
        </h1>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-about": AppAbout;
  }
}
