import { LitElement, html } from 'lit';

import './components/chat/chat.js';

export class App extends LitElement {
  render() {
    return html`
      <h1>Shay Ben Simon's Chatbot</h1>
      <chat-app></chat-app>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('app-index', App);
