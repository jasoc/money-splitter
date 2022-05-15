import { css, CSSResult, html, LitElement, TemplateResult } from "lit";
import { state } from "lit/decorators.js";
import { Services, Themes } from "./services";

export class LitElementComponent extends LitElement {
  

  constructor() {
    super();
  }

  @state()
  private _toggle: boolean = false;

  toggle() {
    this._toggle = !this._toggle;
  }
}

export interface ThemeRule {
  theme: Themes;
  css: CSSResult;
}

export abstract class LitElementThemable extends LitElementComponent {
  
  private static _instances: LitElementThemable[] = [];

  constructor() {
    super();

    if (LitElementThemable._instances.length == 0) {
      Services.theme.registerEventOnChange(this.toggleAllThemable);
    }
    LitElementThemable._instances.push(this);
  }

  abstract themedCSS(): ThemeRule[];
  
  abstract html(): TemplateResult;

  toggleAllThemable() {
    LitElementThemable._instances.forEach((el) => {
      el.toggle();
    });
  }

  getCssFor(theme: Themes): CSSResult {
    let src = this.themedCSS()
      .filter((rule) => rule.theme == theme);
    if (src.length > 0) {
      return src[0].css;
    }
    return css``;
  }

  override render() {
    return html`
      <style>
        ${this.getCssFor(Services.theme.selectedTheme)}
      </style>
      ${this.html()}
    `;
  }
}
