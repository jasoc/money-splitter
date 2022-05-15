import { html, css, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Services, Themes } from './services';
import { LitElementThemable, ThemeRule } from './lit-components';

import './elements/mat-button';
import './elements/div-spacer';
import { Colors } from './styles';

@customElement('top-bar')
export class TopBar extends LitElementThemable {

  themedCSS(): ThemeRule[] {
    return [
      {
        theme: Themes.dark,
        css: css`
          #top-bar {
            border-bottom: 1px solid #ffffff3d;
          }

          #top-bar .title {
            color: ${unsafeCSS(Colors.fontDark)}
          }
        `
      },
      {
        theme: Themes.light,
        css: css`
          #top-bar {
            border-bottom: 1px solid #00000033;
          }

          #top-bar .title {
            color: ${unsafeCSS(Colors.fontLight)}
          }
        `
      }
    ]
  }

  static override styles = css`
    #top-bar {
      padding: 7px 0px;
      display: flex;
    }

    #top-bar .title {
      font-size: 1.5em;
      margin: 0;
      font-variation-settings: 'wdth' 120;
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

  html() {
    return html`
    <div id="top-bar">
      <div-spacer size="200px"></div-spacer>
      <div class="top-bar_left">
        <h3 class="title">
          Money splitter
        </h3>
      </div>
      <div class="top-bar_right">
      
        <mat-button
          icon="home"
          ?underline=${true}
          text="Home"
          @click="${() => location.href = 'home'}"
          color="${this.getThemeIconColor()}"
          background="none">
        </mat-button>

        <mat-button
          icon="lightbulb"
          ?underline=${true}
          text="About"
          @click="${() => location.href = 'about'}"
          color="${this.getThemeIconColor()}"
          background="none">
        </mat-button>

        <mat-button
          class="theme-toggle"
          @click=${this.onClickToggleTheme}
          icon="${this.getThemeIcon()}"
          color="${this.getThemeIconColor()}"
          background="none">
        </mat-button>

      </div>
      <div-spacer size="200px"></div-spacer>
    </div>
  `;
  }

  theme: string = Themes[Services.theme.selectedTheme];

  getThemeIcon() {
    return Services.theme.selectedTheme === Themes.dark ? 'dark_mode' : 'brightness_low';
  }

  getThemeIconColor() {
    return Services.theme.selectedTheme === Themes.dark ? Colors.fontDark : Colors.fontLight;
  }

  onClickToggleTheme() {
    Services.theme.selectedTheme = Services.theme.selectedTheme === Themes.dark ? Themes.light : Themes.dark;
    this.theme = Themes[Services.theme.selectedTheme];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'top-bar': TopBar;
  }
}
