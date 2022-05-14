import { html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Services, Themes } from './services';
import { LitElementThemable } from './lit-components';

import './elements/mat-button';
import './elements/div-spacer';

@customElement('top-bar')
export class TopBar extends LitElementThemable {

  constructor() {
    super();

  }

  static override styles = css`
      #top-bar {
        /* background-color: rgba(0, 0, 0, 0.45); */
        padding: 24px 0px;
        display: flex;
      }

      .top-bar_left {
        display: flex;
        width: 50%;
        justify-content: flex-start;
      }

      .top-bar_right {
        display: flex;
        width: 50%;
        justify-content: flex-end;
      }
    `;

  @state()
  theme: string = Themes[Services.theme.selectedTheme];

  override render() {
    return html`
      <div
        id="top-bar"
        style="
          ${Services.theme.selectedTheme == Themes.dark ?  'background-color: rgba(0, 0, 0, 0.45);' : ''}
          ${Services.theme.selectedTheme == Themes.light ? 'background-color: rgba(0, 0, 0, 0.0);' : ''}
        ">
        <div-spacer size="30px"></div-spacer>
        <div class="top-bar_left">
        </div>
        <div class="top-bar_right">
          <mat-button @click=${this._onClickPremiQui} icon="edit" border="min">${this.theme}</mat-button>
        </div>
        <div-spacer size="30px"></div-spacer>
      </div>
    `;
  }

  _onClickPremiQui() {
    Services.theme.selectedTheme = Services.theme.selectedTheme === Themes.dark ? Themes.light : Themes.dark;
    this.theme = Themes[Services.theme.selectedTheme];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'top-bar': TopBar;
  }
}
