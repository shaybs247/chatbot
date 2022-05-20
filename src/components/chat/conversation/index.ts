import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../../common/avatar';

@customElement('chat-conversation')
export class Conversation extends LitElement {
  static styles = css`
    :host {
      height: 100%;
      overflow-y: scroll;
    }

    ul {
      //reset css
      list-style: none;
      padding: 0;
      margin: 0;

      display: flex;
      flex-direction: column;
    }
  `;

  onSlotChange() {
    this.requestUpdate();
  }

  updated() {
    this.scroll({ top: this.scrollHeight, behavior: 'smooth' });
  }

  render() {
    return html`<ul>
      <slot @slotchange="${this.onSlotChange}"></slot>
    </ul>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chat-conversation': Conversation;
  }
}
