import { css, LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('chat-icon')
export class ChatIcon extends LitElement {
  static styles = css`
    .wrapper {
      display: flex;
      position: fixed;
      z-index: 1;
      right: 0;
      bottom: 0;
      margin-bottom: 30px;
      margin-right: 30px;
    }
    .button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60px;
      height: 60px;
      transition: all 0.7s ease-out;
      box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.07);
      border: solid 4px #fff;
      border-radius: 50%;
      background-color: #ccd5ae;
      cursor: pointer;
    }
  `;

  @property({ type: Boolean }) isOpen = false;

  onClick() {
    this.dispatchEvent(
      new CustomEvent('kaki', { detail: { value: !this.isOpen } })
    );
  }
  render() {
    return html`
      <div class="wrapper">
        <button class="button" @click=${this.onClick}>${this.isOpen}</button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chat-icon': ChatIcon;
  }
}
