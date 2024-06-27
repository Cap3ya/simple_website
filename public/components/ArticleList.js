class ArticleList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
             <style>
                ul {
                    list-style-type: none;
                    padding: 0;
                }
                li {
                    background: #f4f4f4;
                    margin: 5px 0;
                    padding: 10px;
                    border: 1px solid #ddd;
                }
                button {
                    padding: 5px 10px;
                    margin-top: 5px;
                }
                a {
                    text-decoration: none;
                    color: inherit;
                }
            </style>
            <ul id="article-list"></ul>
        `;
        this.fetchArticles();
    }

    async fetchArticles() {
        try {
            const response = await fetch('/api/articles');
            const articles = await response.json();
            const articleList = this.shadowRoot.getElementById('article-list');
            articleList.innerHTML = articles.map(article => `
                <li>
                    <a href="/article?id=${article.id}">
                        <h2>${article.title}</h2>
                        <p>${article.content}</p>
                        <p>Price: $${article.price}</p>
                    </a>
                </li>
            `).join('');
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    }
}

customElements.define('article-list', ArticleList);
