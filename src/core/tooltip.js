class Tooltip extends HTMLElement {
    constructor() {
        super();
        this._tooltipContainer;
        this._tooltipText = '';
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                div{
                    padding:8px;
                    border:1px #888888 solid;
                    border-radius: 8px;
                    box-shadow: 2px 2px 0px #000000;
                    position: absolute;
                    z-index: 10;
                }

                span{
                    cursor:default;
                }
            </style>
            <span>(?)</span>
            <slot></slot>
          
        `
    }


    connectedCallback() {
        if (this.hasAttribute("text")) {
            this._tooltipText = this.getAttribute("text")
        }
        const tooltipIcon = this.shadowRoot.querySelector('span');
        tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));

    }

    _showTooltip() {
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = this._tooltipText;
        this.shadowRoot.appendChild(this._tooltipContainer);
    }

    _hideTooltip() {
        this.shadowRoot.removeChild(this._tooltipContainer);
    }

}



customElements.define("gs-tooltip", Tooltip);


