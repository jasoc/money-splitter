import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('my-element')
export class MyElement extends LitElement {
  static override styles = css`
      h1 {
        color: green;
      }
    `;

  @property()
  name = 'World';
  
  @property({ type: Number })
  count = 0;

  override render() {
    return html`
      <div class="my-element">
        <h1>${this.sayHello(this.name)}!</h1>
        <button @click=${this._onClick} part="button">
          Click Count: ${this.count}
        </button>
        <slot></slot>
      </div>
    `;
  }

  private _onClick() {
    this.count++;
    this.dispatchEvent(new CustomEvent('count-changed'));
  }

  sayHello(name: string): string {
    return `Hello, ${name}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement;
  }
}
