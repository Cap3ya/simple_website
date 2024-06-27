async function purchaseArticle(articleId, price) {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please login to purchase an article.');
        return;
    }

    try {
        const response = await fetch('/api/articles/purchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ articleId, price })
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

// Make sure this function is globally accessible
window.purchaseArticle = purchaseArticle;
