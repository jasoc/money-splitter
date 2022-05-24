import { LitElement, html, css, CSSResult, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { LitElementResponsive } from '../lit-components';
import { Colors, defaultMediaQueries, Materialize, Typography } from '../styles';
import { MediaQuery, Themes } from '../types';
import "./mat-button";
import "./mat-dialog";

@customElement('add-human-dialog')
export class AddHumanDialog extends LitElementResponsive {

  defineMediaQuery(): MediaQuery[] {
    return defaultMediaQueries;
  }
  
  override cssThemed(theme: Themes): CSSResult {
    if (theme == Themes.dark) {
      return css`
        * {
          color: ${unsafeCSS(Colors.fontDark)};
        }
      `;
    }

    return css`
      * {
        color: ${unsafeCSS(Colors.fontLight)};
      }
    `;
  }

  override html() {
    return html`
      <mat-dialog>
        <div class="add-human-dialog">
          <label .style="${Typography.typeTitle}">
            Add new human
          </label>
        </div>
      </mat-dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'add-human-dialog': AddHumanDialog;
  }
}
