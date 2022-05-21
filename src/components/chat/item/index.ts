import { css, LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html';
import { stringToMarkup } from '../../../helpers/string-to-markup';
import { Message } from '../../../typings/types';

@customElement('chat-item')
export class ChatItem extends LitElement {
  @property({ type: Object }) message: Message | undefined = undefined;

  static styles = css`
    li {
      display: flex;
      margin: 0;
      padding: 16px;
      text-indent: 0;
      list-style-type: 0;
    }

    li.me {
      flex-direction: row-reverse;
    }

    .username {
      font-weight: bolder;
      margin-top: auto;
      margin-right: 20px;
      padding: 2px 7px;
      font-size: 18px;
      border-radius: 6px;
      border: 2px solid black;
      text-overflow: ellipsis;
      max-width: 100px;
      overflow: hidden;
      white-space: nowrap;
      flex: 0 0 auto;
    }

    .username.me {
      margin-right: 0px;
      margin-left: 20px;
    }

    .message {
      width: auto;
      padding: 17px 20px;
      border-radius: 5px;
      max-width: 75%;
      font-size: 14px;
      position: relative;
      white-space: pre-line;
      line-height: 1.4em;
    }

    .message.bot::after,
    .message.chat-user::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 10;
      width: 0;
      height: 0;
      border: 14px solid transparent;
      border-left: 0;
      border-bottom: 0;
      margin-top: -5px;
      margin-left: -14px;
    }

    .message.chat-user {
      background-color: #f5f5f5;
    }

    .message.chat-user::after {
      border-right-color: #f5f5f5;
    }

    .message.me {
      background-color: #60aeff;
    }

    .message.me::after {
      content: '';
      position: absolute;
      right: 0;
      bottom: 10;
      width: 0;
      height: 0;
      border: 14px solid transparent;
      border-left-color: #60aeff;
      border-right: 0;
      border-bottom: 0;
      margin-top: -5px;
      margin-right: -14px;
    }

    .message.bot {
      background-color: #c3fddd;
    }

    .message.bot::after {
      border-right-color: #c3fddd;
    }
  `;

  render() {
    return html`
      <li class="item ${this.message?.type}">
        <div class="username ${this.message?.type}">
          ${this.message?.username}
        </div>
        <div class="message ${this.message?.type}">
          ${unsafeHTML(stringToMarkup(this.message?.text || ''))}
        </div>
      </li>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chat-item': ChatItem;
  }
}
