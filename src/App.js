import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'; // Import axios for API calls

const NewsSection = ({ title, category }) => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            const NEWS_API_KEY = '2918c18dd5da4a09bf22e359e1b2d9c9';
            const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${NEWS_API_KEY}&country=us`;

            try {
                const response = await axios.get(url);
                setArticles(response.data.articles);
            } catch (error) {
                console.error(`Error fetching ${category} news:`, error);
            }
        };

        fetchNews();
    }, [category]);

    // Variables to manage dragging behavior
    let startX = 0;
    let scrollLeft = 0;
    let isDragging = false;

    const handleMouseDown = (e) => {
        isDragging = true;
        startX = e.pageX - e.currentTarget.offsetLeft;
        scrollLeft = e.currentTarget.scrollLeft;
    };

    const handleMouseUp = () => {
        isDragging = false;
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const x = e.pageX - e.currentTarget.offsetLeft;
        const walk = (x - startX) * 3; // Adjust scrolling speed

        e.currentTarget.scrollLeft = scrollLeft - walk;
    };

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="scroll-container"
                 onMouseDown={handleMouseDown}
                 onMouseUp={handleMouseUp}
                 onMouseMove={handleMouseMove}
                 onMouseLeave={handleMouseUp}>
                {articles.length > 0 ? (
                    articles.map((article, index) => (
                        <div key={index} className="news-item">
                            <a href={article.url} target="_blank" rel="noopener noreferrer">
                                <img src={article.urlToImage || 'https://via.placeholder.com/100'} alt="News" />
                                <h3>{article.title}</h3>
                                <p>{article.description || ''}</p>
                            </a>
                        </div>
                    ))
                ) : (
                    <p>No news articles found.</p>
                )}
            </div>
        </div>
    );
};

const App = () => {
    return (
        <div className="container">
            <header>
                <div className="header-content">
                    <h1>News Portal 123</h1>
                    <p>Welcome to News Portal. <br />Get all the latest news headlines</p>
                </div>
            </header>
            <main>
                <NewsSection title="General News Headlines" category="general" />
                <NewsSection title="Sports News" category="sports" />
                <NewsSection title="Movies News" category="entertainment" />
            </main>
            <footer>
                <div className="footer-content">
                    <div className="social-icons">
                        <a href="https://www.tiktok.com/@mr.j.k.tech?_t=8njlHrN9nT0&_r=1" 
                           target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fab fa-tiktok"></i></a>
                        <a href="https://www.instagram.com/mrjktech?igsh=MTJ5YnBtZ2R3c3d0bw==" 
                           target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fab fa-instagram"></i></a>
                        <a href="https://youtube.com/@mrjktech20?si=VLuc7Zbt5_fZtN1a" 
                           target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fab fa-youtube"></i></a>
                    </div>
                    <p>&copy; 2024 News Portal. All rights reserved.</p>
                    <p>By J&k Tech</p>
                </div>
            </footer>
        </div>
    );
};

export default App;
