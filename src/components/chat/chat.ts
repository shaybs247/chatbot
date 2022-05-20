import { LitElement, html, css } from 'lit';
import { query, state } from 'lit/decorators.js';
import './icon';
import './header';
import '../common/tooltip';
import '../common/avatar';

export class Chat extends LitElement {
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
  `;

  @query('chat-icon')
  chatIcon: any;

  @state()
  private _isOpen = true;

  onIconClicked() {
    this._isOpen = !this._isOpen;
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
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.t
        </div>
      </chat-tooltip>
    `;
  }
}

customElements.define('chat-app', Chat);
