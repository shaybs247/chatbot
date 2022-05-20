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
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }
  `;

  onSlotChange() {
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
