import { LitElement, html, css } from 'lit';

export class App extends LitElement {
  render() {
    return html` <h1>Shay Ben Simon's Chatbot</h1> `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('app-index', App);
