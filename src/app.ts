import { LitElement, html } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { ref, createRef } from 'lit/directives/ref.js';
import './components/chat-icon';
import './components/kaki.js';
import './components/chat/tooltip';

export class App extends LitElement {
  @property({
    type: Boolean
  })
  isOpen = false;

  chatIcon = createRef();

  onIconClicked() {
    console.log(
      '🚀 ~ file: app.ts ~ line 9 ~ App ~ onIconClicked ~ onIconClicked',
      this.isOpen
    );
    this.isOpen = !this.isOpen;
  }

  render() {
    return html`
      <h1>Shay Ben Simon's Chatbot</h1>
      <chat-tooltip id="chat-tooltip" ?isOpen="${this.isOpen}"></chat-tooltip>
      <chat-icon
        id="chat-icon"
        ${ref(this.chatIcon)}
        ?isOpen="${this.isOpen}"
        @kaki="${this.onIconClicked}"
      ></chat-icon>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('app-index', App);
