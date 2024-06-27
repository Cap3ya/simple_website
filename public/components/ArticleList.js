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
                    <h2>${article.title}</h2>
                    <p>${article.content}</p>
                    <p>Price: $${article.price}</p>
                    <button onclick="purchaseArticle(${article.id})">Buy</button>
                </li>
            `).join('');
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    }
}

customElements.define('article-list', ArticleList);

async function purchaseArticle(articleId) {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please login to purchase an article.');
        return;
    }

    try {
        const response = await fetch('/api/purchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ articleId })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Purchase failed');
        }

        alert('Purchase successful');
    } catch (error) {
        console.error('Error purchasing article:', error);
        alert(`Purchase failed: ${error.message}`);
    }
}
