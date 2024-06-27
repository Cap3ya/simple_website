// public/components/Footer.js
class FooterComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                footer {
                    background-color: #333;
                    color: #fff;
                    text-align: center;
                    padding: 10px;
                    position: fixed;
                    bottom: 0;
                    width: 100%;
                }
            </style>
            <footer>
                <p>&copy; 2024 Simple Website. All rights reserved.</p>
            </footer>
        `;
    }
}

customElements.define('footer-component', FooterComponent);