import { html, css, unsafeCSS, CSSResult, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { Services } from "./services";
import { LitElementResponsive } from "./lit-components";

import "./elements/mat-button";
import "./elements/div-spacer";

import { Colors, defaultMediaQueries, Sizes } from "./styles";
import { MediaQuery, Themes } from "./types";

@customElement("top-bar")
export class TopBar extends LitElementResponsive {

  defineMediaQuery(): MediaQuery[] {
    return defaultMediaQueries;
  }

  override cssThemed(theme: Themes): CSSResult {
    switch (theme) {
      case Themes.dark:
        return css`
          #top-bar {
            border-bottom: 1px solid #ffffff3d;
          }

          #top-bar .title {
            color: ${unsafeCSS(Colors.fontDark)};
          }
        `;
      case Themes.light:
        return css`
          #top-bar {
            border-bottom: 1px solid #00000033;
          }

          #top-bar .title {
            color: ${unsafeCSS(Colors.fontLight)};
          }
        `;
    }
  }

  static override styles = css`
    #top-bar {
      padding: 7px 0px;
      display: flex;
    }

    #top-bar .title {
      font-size: 1.5em;
      margin: 0;
      font-variation-settings: "wdth" 120;
    }

    .top-bar_left {
      display: flex;
      width: 50%;
      justify-content: flex-start;
      align-items: center;
    }

    .top-bar_right {
      display: flex;
      width: 50%;
      justify-content: flex-end;
    }

    .theme-toggle {
      font-size: 1.2em;
    }
  `;

  override htmlQueried(mediaQuery: MediaQuery): TemplateResult<1 | 2> {
    return html`
      <div id="top-bar">
        ${mediaQuery.name == 'desktop'
          ? html`<div-spacer size="${Sizes.sideGap}"></div-spacer>`
          : ""}

        <div class="top-bar_left">
          <h3 class="title">Money splitter</h3>
        </div>

        <div class="top-bar_right">
          <mat-button
            icon="home"
            ?underline=${true}
            text="Home"
            @click="${() => (location.href = "home")}"
            color="${this.getThemeIconColor()}"
            background="none"
          >
          </mat-button>

          <mat-button
            icon="lightbulb"
            ?underline=${true}
            text="About"
            @click="${() => (location.href = "about")}"
            color="${this.getThemeIconColor()}"
            background="none"
          >
          </mat-button>

          <mat-button
            class="theme-toggle"
            @click=${this.onClickToggleTheme}
            icon="${this.getThemeIcon()}"
            color="${this.getThemeIconColor()}"
            background="none"
          >
          </mat-button>
        </div>

        ${mediaQuery.name == 'desktop'
          ? html`<div-spacer size="${Sizes.sideGap}"></div-spacer>`
          : ""}
      </div>
    `;
  }

  theme: string = Themes[Services.storage.set.currentTheme];

  getThemeIcon() {
    return Services.theme.selectedTheme === Themes.dark
      ? "dark_mode"
      : "brightness_low";
  }

  getThemeIconColor() {
    return Services.theme.selectedTheme === Themes.dark
      ? Colors.fontDark
      : Colors.fontLight;
  }

  onClickToggleTheme() {
    Services.theme.selectedTheme =
      Services.storage.set.currentTheme === Themes.dark
        ? Themes.light
        : Themes.dark;
    this.theme = Themes[Services.storage.set.currentTheme];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "top-bar": TopBar;
  }
}
