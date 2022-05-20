import { css, LitElement, html, PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import '@ui5/webcomponents/dist/Popover.js';
import { RefOrCallback, createRef } from 'lit/directives/ref.js';
import { createPopper } from '@popperjs/core';
import {
  autoPlacement,
  computePosition,
  offset,
  ReferenceElement,
  shift
} from '@floating-ui/dom';

@customElement('chat-tooltip')
export class Tooltip extends LitElement {
  @property({ type: Boolean }) isOpen = false;

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
              offset: [-60, 10]
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
