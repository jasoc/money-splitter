import { css, CSSResult, html, LitElement, TemplateResult } from "lit";
import { state } from "lit/decorators.js";
import { Services } from "./services";
import { Themes, SizeState } from "./types";

export interface ThemeRule {
  theme: Themes;
  css: CSSResult;
}

export abstract class LitElementThemable extends LitElement {
  protected static _instances: LitElementThemable[] = [];

  private _sizeState: SizeState = SizeState.desktop;

  public get sizeState(): SizeState {
    return this._sizeState;
  }

  private set sizeState(newState: SizeState) {
    if (newState == this._sizeState) {
      return;
    }
    this._sizeState = newState;
    this.toggleAllThemable();
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

export interface MediaQuery {
  name: string;
  minWidth: number;
  minHeight?: number;
}

export abstract class LitElementResponsive extends LitElementThemable {

  protected static override _instances: LitElementResponsive[] = [];

  private _matchedMediaQuery: MediaQuery = this._DefaultMediaQuery();

  constructor() {
    super();
    if (LitElementResponsive._instances.length == 0) {
      window.addEventListener("resize", () => {
        this._MatchAllResponsiveElement(window);
      });
    }
    LitElementResponsive._instances.push(this);
    this.matchMediaQuery(window);
  }

  private _MatchAllResponsiveElement(window: Window): void {
    for (let inst of LitElementResponsive._instances) {
      inst.matchMediaQuery(window);
    }
  }

  private _DefaultMediaQuery(): MediaQuery {
    return {
      name: "default",
      minWidth: 0,
    };
  }

  abstract defineMediaQuery(): MediaQuery[];

  htmlQueried(mediaQuery: MediaQuery): TemplateResult {
    throw new Error("Method not implemented.");
  }

  cssQueried(mediaQuery: MediaQuery): CSSResult {
    throw new Error("Method not implemented.");
  }

  override html(): TemplateResult {
    throw new Error("Method not implemented.");
  }

  override css(): CSSResult {
    throw new Error("Method not implemented.");
  }

  get MatchedMediaQuery(): MediaQuery {
    return this._matchedMediaQuery;
  }

  set MatchedMediaQuery(newMq: MediaQuery) {
    if (newMq.name != this._matchedMediaQuery.name) {
      this._matchedMediaQuery = newMq;
      this.requestUpdate();
    }
  }

  matchMediaQuery(window: Window): void {
    const sortedMq = this.defineMediaQuery().sort(
      (a, b) => a.minWidth - b.minWidth
    );
    let found: boolean = false;
    for (let mq of sortedMq) {
      if (window.innerWidth <= mq.minWidth) {
        this.MatchedMediaQuery = mq;
        found = true;
        break;
      }
    }
    if (!found) {
      this.MatchedMediaQuery = sortedMq[sortedMq.length - 1];
    }
  }

  private getCss(): CSSResult {
    try {
      return this.cssQueried(this.MatchedMediaQuery);
    } catch { }
    try {
      return this.css();
    } catch { }
    return css``;
  }

  private getHtml(): TemplateResult {
    try {
      return this.htmlQueried(this.MatchedMediaQuery);
    } catch {
      // Ignored, check if the other
      // method is implemented;
    }
    try {
      return this.html();
    } catch {
      throw new Error("You need to implement htmlQueried() or html().");
    }
  }

  override render() {
    return html`
      <style>
        /* * { transition-duration: 0.2s; } */
        ${this.getCss()}
        ${this.getCssFor(Services.theme.selectedTheme)}
      </style>
      ${this.getHtml()}
    `;
  }
}
