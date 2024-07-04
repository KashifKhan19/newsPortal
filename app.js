document.addEventListener('DOMContentLoaded', () => {
    const scrollContainers = document.querySelectorAll('.scroll-container');

    // Track touch start position
    let touchStartX = 0;

    // Add touch event listeners for touch devices
    scrollContainers.forEach(container => {
        container.addEventListener('touchstart', (event) => {
            touchStartX = event.touches[0].clientX;
        });

        container.addEventListener('touchmove', (event) => {
            const touchMoveX = event.touches[0].clientX;
            const deltaX = touchStartX - touchMoveX;

            // Scroll container horizontally based on touch movement
            container.scrollLeft += deltaX;
            touchStartX = touchMoveX;
            event.preventDefault();
        });
    });

    // Add mouse event listeners for desktop devices
    scrollContainers.forEach(container => {
        container.addEventListener('mousedown', (event) => {
            touchStartX = event.clientX;
            container.style.cursor = 'grabbing'; // Change cursor style
        });

        container.addEventListener('mousemove', (event) => {
            if (touchStartX) {
                const touchMoveX = event.clientX;
                const deltaX = touchStartX - touchMoveX;

                // Scroll container horizontally based on mouse movement
                container.scrollLeft += deltaX;
                touchStartX = touchMoveX;
            }
        });

        container.addEventListener('mouseup', () => {
            touchStartX = 0;
            container.style.cursor = 'grab'; // Restore cursor style
        });

        container.addEventListener('mouseleave', () => {
            touchStartX = 0;
            container.style.cursor = 'grab'; // Restore cursor style
        });
    });

    // Function to fetch news based on category
    function fetchNews(category, container) {
        const apiKey = '2918c18dd5da4a09bf22e359e1b2d9c9';
        const apiUrl = `https://newsapi.org/v2/top-headlines?category=${category}&country=us&apiKey=${apiKey}`;

        fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (!data.articles || !Array.isArray(data.articles)) {
            throw new Error('Invalid data format or empty articles array');
        }
        displayNews(data.articles, container);
    })
    .catch(error => {
        console.error(`Error fetching ${category} news:`, error);
        container.innerHTML = '<p>Could not fetch news headlines.</p>';
    });

    }

    // Function to display news articles
    function displayNews(articles, container) {
        if (articles.length === 0) {
            container.innerHTML = '<p>No news articles found.</p>';
            return;
        }

        container.innerHTML = articles.map(article => `
            <div class="news-item">
                <a href="${article.url}" target="_blank">
                    <img src="${article.urlToImage || 'https://via.placeholder.com/100'}" alt="News Image">
                    <h3>${article.title}</h3>
                    <p>${article.description || ''}</p>
                </a>
            </div>
        `).join('');
    }

    // Fetch news for each category
    fetchNews('general', document.getElementById('news'));
    fetchNews('sports', document.getElementById('sports-news'));
    // fetchNews('entertainment', document.getElementById('video-games-news'));
    fetchNews('entertainment', document.getElementById('movies-news'));
});
