import { html, css, unsafeCSS, CSSResult } from "lit";
import { customElement } from "lit/decorators.js";
import { LitElementResponsive, LitElementThemable } from "../lit-components";
import { Colors, defaultMediaQueries } from "../styles";
import { MediaQuery, Themes } from "../types";

@customElement("app-split")
export class AppSplit extends LitElementResponsive {

  defineMediaQuery(): MediaQuery[] {
    return defaultMediaQueries;
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
    "app-split": AppSplit;
  }
}
