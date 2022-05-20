import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { createPopper } from '@popperjs/core';

@customElement('chat-tooltip')
export class Tooltip extends LitElement {
  @property({ type: Boolean }) isOpen = false;
  @property({ type: Array }) offset = [0, 0];

  @property({ type: Object }) target: Element | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.target ??= this.previousElementSibling;
  }

  updated(prevProps: PropertyValues<this>) {
    if (prevProps.get('isOpen') !== this.isOpen) {
      createPopper(this.target!, this, {
        placement: 'top',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: this.offset
            }
          }
        ]
      });
    }
  }

  render() {
    if (this.isOpen) {
      return html`<slot></slot> `;
    } else return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chat-tooltip': Tooltip;
  }
}
