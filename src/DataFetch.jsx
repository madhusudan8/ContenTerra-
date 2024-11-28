import React, { useEffect, useState } from "react";
import "./App.css";

const Fetch = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch("https://www.reddit.com/r/reactjs.json");
                const data = await response.json();
                const postsData = data?.data?.children.map((child) => ({
                    title: child.data.title,
                    selfTextHTML: child.data.selftext_html,
                    url: child.data.url,
                    score: child.data.score,
                }));
                setPosts(postsData);
            } catch (err) {
                setError("Failed to fetch data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (isLoading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="app">
            <h1 className="header">Reddit ReactJS Posts</h1>
            <div className="card-container">
                {posts.map((post, index) => (
                    <div className="card" key={index}>
                        <h2 className="card-title">{post.title}</h2>
                        {post.selfTextHTML && (
                            <div
                                className="card-content"
                                dangerouslySetInnerHTML={{ __html: post.selfTextHTML }}
                            />
                        )}
                        <a href={post.url} className="card-link" target="_blank" rel="noopener noreferrer">
                            Visit Post
                        </a>
                        <div className="card-footer">Score: {post.score}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Fetch;
