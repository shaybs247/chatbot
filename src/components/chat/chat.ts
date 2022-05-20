import { LitElement, html, css } from 'lit';
import { state } from 'lit/decorators.js';
import { SocketController } from '../../controller/socket-controller.js';
import { map } from 'lit/directives/map.js';

import './icon';
import './header';
import './conversation';
import './item';
import '../common/tooltip';
import '../common/avatar';
import '../common/input';

export class Chat extends LitElement {
  private readonly socket = new SocketController(this);
  static styles = css`
    #chat-window {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background: rgb(255, 255, 255);
      width: 375px;
      height: 700px;
      border-radius: 8px;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 5px 40px;
    }

    #input {
      margin-top: auto;
    }
  `;

  @state()
  private _isOpen = true;

  onIconClicked() {
    this._isOpen = !this._isOpen;
  }

  onSubmit(e: any) {
    const msg = e.detail.value;

    this.socket.sendMessage({ msg });
    console.log('on-send', msg);
  }

  render() {
    return html`
      <chat-icon
        id="chat-icon"
        ?isOpen="${this._isOpen}"
        @onIconClicked="${this.onIconClicked}"
        ><avatar-icon
          name="${this._isOpen ? 'arrow-down' : 'robot'}"
        ></avatar-icon
      ></chat-icon>
      <chat-tooltip
        id="chat-tooltip"
        ?isOpen="${this._isOpen}"
        .offset=${[-200, 20]}
      >
        <div id="chat-window">
          <chat-header></chat-header>
          <chat-conversation>
            ${map(this.socket.messages, (msg, index) => {
              return html` <chat-item .message="${msg}"> </chat-item> `;
            })}
          </chat-conversation>
          <input-element
            id="input"
            .username="${this.socket.username}"
            @onSubmit="${this.onSubmit}"
          ></input-element>
        </div>
      </chat-tooltip>
    `;
  }
}

customElements.define('chat-app', Chat);
