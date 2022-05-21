import { html, css, unsafeCSS, CSSResult } from "lit";
import { customElement } from "lit/decorators.js";
import { LitElementResponsive, LitElementThemable } from "../lit-components";
import { Services } from "../services";
import { Colors, defaultMediaQueries } from "../styles";
import { MediaQuery, Themes } from "../types";

import "../elements/human-card";

@customElement("app-split")
export class AppSplit extends LitElementResponsive {

  constructor() {
    super();
    Services.storage.set.humans.push({
      name: "test",
      money: [],
      amountToPay: 10
    });
  }

  defineMediaQuery(): MediaQuery[] {
    return defaultMediaQueries;
  }
  
  override html() {
    return html`
      <div id="split">
        ${Services.storage.get.humans.map((human) => html`
          <human-card .human=${human}></human-card>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-split": AppSplit;
  }
}
