/* globals customElements document */
import {ApiBaseElement} from './api-base.js'
import {getSharedStyleSheets} from './shared-styles.js'

// Template for the console panel
const template = document.createElement('template')
template.innerHTML = `
<style>
:host {
  grid-area: console;
  overflow: hidden;
}

@media (max-width: 40rem) {
  :host {
    max-height: 400px;
    min-height: 200px;
    overflow: auto;
  }
}
</style>
<div id="console-container" class="relative y-scroll h-100 max-h-100 bg-base pad-t-0 pad-r-3 pad-b-7 pad-l-5 border-top">
  <div class="sticky top-0 left-0 right-0 mar-t-0 mar-b-0">
    <h3 class="config-label mar-t-0 mar-b-0 pad-t-3 bg-base z-32">
      Console
    </h3>
    <div class="bg-base flex items-center pad-0 pad-b-2 flex-end">
      <toggle-switch toggle-key="preserveLog">
        <span class="slab-text mar-l-1">Preserve Log</span>
      </toggle-switch>
      <clear-button></clear-button>
    </div>
  </div>
  <pre id="console-output" class="pad-0 mar-t-0 mar-r-0 mar-b-5 mar-l-0 pre-wrap break-word"></pre>
</div>
`

class ConsolePanel extends ApiBaseElement {
  constructor() {
    super()
    this.attachShadow({mode: 'open'}).appendChild(template.content.cloneNode(true))
  }
  updateConsole = ({result}) => {
    // Guard against element not being ready or API not injected yet
    if (!this.consoleOutput || !result) return

    const {error, logs} = result
    let update = ''
    if (error) {
      // Display error details in the console
      update = (error.stack || error.message || error.name) ?? 'An error occurred.'
    } else {
      // Display regular logs
      update = logs ?? '' // Handle case where logs might be null/undefined
    }

    if (this.api.store.preserveLog) {
      this.consoleOutput.innerText = this.consoleOutput.innerText + update
    } else {
      this.consoleOutput.innerText = update
    }
  }

  clear = () => {
    const backUp = this.api.store.preserveLog
    this.api.store.result = {logs: undefined, error: undefined}
    this.consoleOutput.innerText = ''
    this.api.store.preserveLog = backUp
  }

  async connectedCallback() {
    const sheets = await getSharedStyleSheets()
    this.shadowRoot.adoptedStyleSheets = sheets

    this.consoleOutput = this.shadowRoot.querySelector('#console-output')
    this.addEventListener('clear-console', this.clear)

    // Subscribe to changes in the result state to update the console
    if (this.api) {
      this.api.subscribe(this.updateConsole, ['result'])
      // Initial update in case result is already populated
      if (this.api.store.result) {
        this.updateConsole({result: this.api.store.result})
      }
    } else {
      console.error('API context not available for console-panel on connect.')
      // Optionally, set up a mechanism to wait for API initialization if needed
    }
  }

  disconnectedCallback() {
    this.removeEventListener('clear-console', this.clear)
    // Unsubscribe when the element is removed from the DOM
    if (this.api) {
      this.api.unsubscribe(this.updateConsole)
    }
  }
}

// Define the new custom element
customElements.define('console-panel', ConsolePanel)
