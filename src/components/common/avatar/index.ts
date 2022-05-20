import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('avatar-icon')
export class Avatar extends LitElement {
  @property({ type: String }) name = 'robot';

  static styles = css`
    :host {
      background: black;
      height: 60px;
      width: 60px;
      box-shadow: rgb(0 0 0 / 7%) 0px 2px 20px 0px;
      border: 4px solid rgb(255, 255, 255);
      border-radius: 50%;
      padding: 5px;
      display: flex;
      box-sizing: border-box;
    }
    #robot {
      background: url('./images/avatars/robot.svg');
    }
    #robot {
      background: url('./images/avatars/robot.svg');
    }
  `;

  render() {
    return html`<img
      id=${this.name}
      src="./images/avatars/${this.name}.svg"
    />`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'avatar-icon': Avatar;
  }
}
