import { css, LitElement, html, PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import '@ui5/webcomponents/dist/Popover.js';
import { RefOrCallback, createRef } from 'lit/directives/ref.js';
import { createPopper } from '@popperjs/core';

@customElement('chat-tooltip')
export class Tooltip extends LitElement {
  static styles = css`
    :host {
      display: none;
    }
    .wrapper {
      border: 5px solid black;
    }
  `;

  @property({ type: Boolean }) isOpen = false;
  @property({ type: Object }) chatIcon: RefOrCallback = createRef();

  @query('#chat-tooltip-wrapper')
  tooltipWrapper!: HTMLDivElement;

  openTooltip() {
    console.log('open');
  }

  updated(prevProps: PropertyValues<this>) {
    if (prevProps.get('isOpen') !== this.isOpen && this.isOpen) {
      const kaki = document.querySelector('#chat-icon');
      console.log(kaki);
      if (kaki) {
        createPopper(kaki, {
          //@ts-ignore
          content: this.tooltipWrapper,
          allowHTML: true,
          arrow: true,
          animation: 'fade',
          enabled: this.isOpen, // mouseenter, click
          interactive: true
        });
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    const kaki = document.querySelector('#chat-icon');
    console.log(this.querySelector('#chat-tooltip-wrapper'));
    if (kaki) {
      createPopper(kaki, {
        //@ts-ignore
        content: this.shadowRoot.querySelector('#chat-tooltip-wrapper'),
        allowHTML: true,
        arrow: true,
        animation: 'fade',
        enabled: this.isOpen, // mouseenter, click
        interactive: true
      });
    }
  }

  render() {
    return html`
      <div id="chat-tooltip-wrapper" class="wrapper">
        <div class="flex-column">hara</div>
      </div>
      <div slot="footer" class="popover-footer">kaki</div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chat-tooltip': Tooltip;
  }
}
