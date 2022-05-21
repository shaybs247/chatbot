import { css, LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('chat-icon')
export class ChatIcon extends LitElement {
  @property({ type: Boolean }) isOpen = false;
  static styles = css`
    :host {
      display: flex;
      position: fixed;
      z-index: 1;
      right: 0;
      bottom: 0;
      margin-bottom: 30px;
      margin-right: 30px;
      transition: all 0.7s ease-out;
      box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.07);
      border-radius: 50%;
    }
    .button {
      display: contents;
      border: none;
      border-radius: 50%;
      background-color: transparent;
      cursor: pointer;
    }
  `;

  onClick() {
    this.dispatchEvent(
      new CustomEvent('onIconClicked', { detail: { value: !this.isOpen } })
    );
  }

  render() {
    return html`
      <button class="button" @click=${this.onClick}>
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chat-icon': ChatIcon;
  }
}
