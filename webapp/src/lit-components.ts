import { css, CSSResult, html, LitElement, TemplateResult } from "lit";
import { state } from "lit/decorators.js";
import { Services } from "./services";
import { Themes, SizeState } from "./types";


export interface ThemeRule {
  theme: Themes;
  css: CSSResult;
}

export abstract class LitElementThemable extends LitElement {
  private static _instances: LitElementThemable[] = [];
  
  private _sizeState: SizeState = SizeState.desktop;

  public get sizeState(): SizeState {
    return this._sizeState;
  }

  private set sizeState(newState: SizeState) {
    if (newState == this._sizeState) {
      return;
    }
    this._sizeState = newState;
    this.requestUpdate();
  }

  public isDesktop(): boolean {
    return window.innerWidth < 900;
  }
  
  constructor() {
    super();

    if (LitElementThemable._instances.length == 0) {
      Services.theme.registerEventOnChange(this.toggleAllThemable);
    }
    LitElementThemable._instances.push(this);

    window.addEventListener('resize', () => {
      if (window.innerWidth < window.innerHeight) {
        this.sizeState = SizeState.mobile;
      } else {
        this.sizeState = SizeState.desktop;
      }
    });
  }

  abstract themedCSS(): ThemeRule[];

  toggleAllThemable() {
    LitElementThemable._instances.forEach((el) => {
      el.requestUpdate();
    });
  }

  getCssFor(theme: Themes): CSSResult {
    let src = this.themedCSS().filter((rule) => rule.theme == theme);
    if (src.length > 0) {
      return src[0].css;
    }
    return css``;
  }

  css(): CSSResult {
    return css``;
  }

  abstract html(): TemplateResult;

  override render() {
    return html`
      <style>
        * {
          transition-duration: 0.2s;
        }
        ${this.css()}
        ${this.getCssFor(Services.theme.selectedTheme)}
      </style>
      ${this.html()}
    `;
  }
}
