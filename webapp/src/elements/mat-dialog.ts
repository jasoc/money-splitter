import { LitElement, html, css, CSSResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { LitElementResponsive } from '../lit-components';
import { defaultMediaQueries, Materialize } from '../styles';
import { MediaQuery, Themes } from '../types';
import "./mat-button";

@customElement('mat-dialog')
export class MatDialog extends LitElementResponsive {

  defineMediaQuery(): MediaQuery[] {
    return defaultMediaQueries;
  }

  static override styles = css`
    .mat-dialog {
      position: absolute;
      ${Materialize.mat3Shadow};
      border-radius: 13px;
      z-index: 999;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      ${Materialize.mat3Shadow};
    }
    
    .mat-dialog__inner {
      position: relative;
      padding: 60px 35px 40px 35px;
    }

    .close {
      position: absolute;
      top: 0;
      right: 0;
      border-radius: 1000px;
    }
  `;

  override cssThemed(theme: Themes): CSSResult {
      if (theme == Themes.dark) {
        return css`
          .mat-dialog {
            background-color: #19171c;
          }
        `;
      }

      return css`
        .mat-dialog {
          background-color: #e6e6e6;
        }
      `;
  }

  getButtonColor() {
    if (this.currentTheme == Themes.dark) {
      return '#fff';
    }

    return '#000';
  }

  override html() {
    return html`
      <div class="mat-dialog">
        <div class="mat-dialog__inner">
          <mat-button
            icon="close"
            class="close"
            background="none"
            color="${this.getButtonColor()}"
          ></mat-button>
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mat-dialog': MatDialog;
  }
}
