import { LitElement, html, css } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

@customElement('input-element')
export class InputElement extends LitElement {
  @property({ type: String }) username = '';
  @property({ type: String }) value = '';
  @state() _isMetaPressed = false;

  @query('#submit-icon')
  submitIcon!: HTMLElement;

  static styles = css`
    :host {
      min-height: 56px;
      max-height: 200px;
      border-top: 1px solid rgb(230, 230, 230);
      display: flex;
    }

    textarea {
      box-sizing: border-box;
      padding: 18px;
      width: 100%;
      height: 100%;
      font-family: 'Roboto', sans-serif;
      font-size: 14px;
      background-color: rgb(255, 255, 255);
      white-space: pre-wrap;
      overflow-wrap: break-word;
      overflow: auto;
      color: rgb(0, 0, 0);
      resize: none;
      border: none;
      transition: background-color 200ms ease 0s, box-shadow 200ms ease 0s;
      outline-offset: -2px;
    }

    #submit-button {
      border: none;
      background-color: transparent;
      padding: 20px;
      height: 100%;
      cursor: pointer;
    }

    #submit-icon {
      visibility: hidden;
      height: 16px;
      width: 15px;
      margin: auto;
    }
  `;

  handleInput(e: any) {
    this.value = e.target.value;

    this.dispatchEvent(
      new CustomEvent('inputChanged', { detail: { value: e.target.value } })
    );
  }

  onSubmit() {
    this.dispatchEvent(
      new CustomEvent('onSubmit', { detail: { value: this.value } })
    );
    this.value = '';
  }

  handleKeyDown(e: KeyboardEvent) {
    if (e) {
      if (this._isMetaPressed && e.key == 'Enter') {
        this.value = this.value + '\n';
      } else if (this._isMetaPressed) {
        this._isMetaPressed = false;
      }

      if (e.key == 'Meta') {
        this._isMetaPressed = true;
      }
    }
  }
  handleKeyUp(e: KeyboardEvent) {
    if (e && e.key == 'Enter') {
      e.preventDefault();
      this.onSubmit();
    }
  }

  updated() {
    if (this.value) {
      this.submitIcon.style.visibility = 'visible';
    }
  }

  render() {
    return html`<textarea
        name="message"
        placeholder=${this.username
          ? `${this.username}, Please write us something...`
          : 'Start typing...'}
        aria-label="Start typing..."
        tabindex="0"
        .value="${this.value}"
        @input="${this.handleInput}"
        @keydown="${this.handleKeyDown}"
        @keypress="${this.handleKeyUp}"
      ></textarea>
      <button id="submit-button" @click="${this.onSubmit}">
        <svg
          id="submit-icon"
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 16 16"
        >
          <path
            d="M1.388 15.77c-.977.518-1.572.061-1.329-1.019l1.033-4.585c.123-.543.659-1.034 1.216-1.1l6.195-.72c1.648-.19 1.654-.498 0-.687l-6.195-.708c-.55-.063-1.09-.54-1.212-1.085L.056 1.234C-.187.161.408-.289 1.387.231l12.85 6.829c.978.519.98 1.36 0 1.88l-12.85 6.83z"
            fill-rule="evenodd"
          ></path>
        </svg>
      </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'input-element': InputElement;
  }
}
