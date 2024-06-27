class ArticleDetail extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                #article-detail {
                    padding: 20px;
                }
            </style>
            <div id="article-detail"></div>
        `;
        this.fetchArticleDetail();
    }

    async fetchArticleDetail() {
        const articleId = new URLSearchParams(window.location.search).get('id');
        try {
            const response = await fetch(`/api/articles/${articleId}`);
            if (!response.ok) {
                throw new Error('Article not found');
            }
            const article = await response.json();
            const articleDetail = this.shadowRoot.getElementById('article-detail');

            articleDetail.innerHTML = `
            <h2 id="article-title">${article.title}</h2>
            <p id="article-content">${article.content}</p>
            <p>Price: $<span id="article-price"></span></p>
            <button onclick="window.purchaseArticle(${article.id}, ${article.price})">Buy</button>
            `
        } catch (error) {
            console.error('Error fetching article details:', error);
        }
    }
}

customElements.define('article-detail', ArticleDetail);

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