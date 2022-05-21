import { html, css, unsafeCSS, CSSResult, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { Services } from "./services";
import { LitElementResponsive } from "./lit-components";

import "./elements/mat-button";
import "./elements/context-menu";
import "./elements/div-spacer";

import { Colors, defaultMediaQueries, Sizes } from "./styles";
import { MediaQuery, Themes } from "./types";
import { Context } from "./elements/context-menu";
import { pointInsideArea } from "./utils";

@customElement("top-bar")
export class TopBar extends LitElementResponsive {
  contextMenuArr(): Context[] {
    return [
      {
        text: "Home",
        icon: "home",
        action: () => (location.href = "home"),
      },
      {
        text: "Split",
        icon: "splitscreen",
        action: () => (location.href = "split"),
      },
      {
        text: "Change theme",
        icon: this.getThemeIcon(),
        action: () => this.onClickToggleTheme(),
      },
    ];
  }

  @state()
  contextMenuVisible: boolean = false;

  contextMenuX: number = 0;
  contextMenuY: number = 0;

  defineMediaQuery(): MediaQuery[] {
    return defaultMediaQueries;
  }

  override cssThemed(theme: Themes): CSSResult {
    switch (theme) {
      case Themes.dark:
        return css`
          #top-bar {
            border-bottom: 1px solid #ffffff1a;
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
      min-height: 50px;
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
        <div-spacer
          size="${mediaQuery.name == "desktop" ? Sizes.sideGap : "3vw"}"
        ></div-spacer>

        <div class="top-bar_left">
          <h3 class="title">Money splitter</h3>
        </div>

        <div class="top-bar_right">
          ${mediaQuery.name == "desktop"
            ? html`
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
                  icon="splitscreen"
                  ?underline=${true}
                  text="Split"
                  @click="${() => (location.href = "split")}"
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
              `
            : html`
                <mat-button
                  icon="menu"
                  @click="${this.toggleContextMenu}"
                  color="${this.getThemeIconColor()}"
                  background="none"
                >
                </mat-button>

                ${this.contextMenuVisible
                  ? html`<context-menu
                      .context=${this.contextMenuArr()}
                      x=${this.contextMenuX}
                      y=${this.contextMenuY}
                    ></context-menu>`
                  : ""}
              `}
        </div>

        <div-spacer
          size="${mediaQuery.name == "desktop" ? Sizes.sideGap : "3vw"}">
        </div-spacer>
      </div>
    `;
  }

  toggleContextMenu(event) {
    this.contextMenuVisible = !this.contextMenuVisible;
    if (!window.onclick) {
      window.onclick = (event) => {
        const contextMenuElement = this.shadowRoot
          ?.querySelector("context-menu")
          ?.shadowRoot?.querySelector(".context-menu");

        if (contextMenuElement) {
          const isInside = pointInsideArea(
            event.clientX,
            event.clientY,
            contextMenuElement.getBoundingClientRect().left,
            contextMenuElement.getBoundingClientRect().top,
            contextMenuElement.clientWidth,
            contextMenuElement.clientHeight
          );
          
          if (!isInside) {
            this.contextMenuVisible = false;
          }
        }
      };
    }
    this.contextMenuX = event.clientX;
    this.contextMenuY = event.clientY;
  }

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
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "top-bar": TopBar;
  }
}
