import { LitElement, html } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { ref, createRef } from 'lit/directives/ref.js';
import './chat-icon';
import './tooltip';

export class Chat extends LitElement {
  @query('chat-icon')
  chatIcon: any;

  @state()
  private _isOpen = false;

  // chatIcon = createRef();

  onIconClicked() {
    this._isOpen = !this._isOpen;
  }

  render() {
    return html`
      <chat-icon
        id="chat-icon"
        ?isOpen="${this._isOpen}"
        @onIconClicked="${this.onIconClicked}"
      ></chat-icon>
      <chat-tooltip id="chat-tooltip" ?isOpen="${this._isOpen}">
        <h1>kaki</h1>
      </chat-tooltip>
    `;
  }
}

customElements.define('chat-app', Chat);
