import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../../common/avatar';

@customElement('chat-header')
export class Header extends LitElement {
  static styles = css`
    :host {
      display: flex;
      color: white;
      transition: height 160ms ease-out 0s;
      background: linear-gradient(135deg, rgb(0, 30, 43) 0%, rgb(0, 0, 0) 100%);
      padding: 24px;
      line-height: 1.4em;
    }

    #description {
      display: flex;
      flex-direction: column;
      margin-left: 15px;
    }

    #name {
      font-size: 30px;
      margin-bottom: 20px;
    }
  `;

  render() {
    return html` <avatar-icon></avatar-icon>
      <div id="description">
        <div id="name">Elon Bot</div>
        <div>Ask me (or the community) everything!</div>
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chat-header': Header;
  }
}
