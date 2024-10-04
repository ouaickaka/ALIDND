import React, { useState, useEffect } from 'react';
import BlogPost from './components/BlogPost';
import Tooltip from './components/Tooltip';
import './styles/main.css';
import postsData from './data/posts.json'; // Importing the JSON data for posts

const App = () => {
  // State for "Litmus" and "Litmus+" toggles
  const [isLitmusOn, setIsLitmusOn] = useState(() => JSON.parse(localStorage.getItem('isLitmusOn')) ?? true);
  const [isLitmusPlusOn, setIsLitmusPlusOn] = useState(() => JSON.parse(localStorage.getItem('isLitmusPlusOn')) ?? true);

  // State for blog posts
  const [posts, setPosts] = useState(postsData);
  const [filteredPosts, setFilteredPosts] = useState(postsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  // Save "Litmus" states to local storage
  useEffect(() => {
    localStorage.setItem('isLitmusOn', JSON.stringify(isLitmusOn));
    localStorage.setItem('isLitmusPlusOn', JSON.stringify(isLitmusPlusOn));
  }, [isLitmusOn, isLitmusPlusOn]);

  // Filter and sort posts whenever search term, category filter, or sort order change
  useEffect(() => {
    let updatedPosts = posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter ? post.category === categoryFilter : true)
    );

    updatedPosts = updatedPosts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    setFilteredPosts(updatedPosts);
  }, [searchTerm, categoryFilter, sortOrder, posts]);

  // Toggle handlers
  const toggleLitmus = () => setIsLitmusOn(!isLitmusOn);
  const toggleLitmusPlus = () => setIsLitmusPlusOn(!isLitmusPlusOn);

  // Badge colors for categories
  const categoryColors = {
    "Tech": "var(--color-blue)",
    "Life": "var(--color-green)",
    "Sample": "var(--color-pink)",
    // Add more categories as needed
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="app-header">
        <h1 style={{ fontFamily: 'Old English Text MT, serif' }}>A Life I Do Not Deserve</h1>
      </header>

      {/* Controls for search, filter, and sort */}
      <div className="controls">
        <Tooltip text="Search blog posts by title">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Tooltip>
        
        <Tooltip text="Filter posts by category">
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Tech">Tech</option>
            <option value="Life">Life</option>
            {/* Add more category options as needed */}
          </select>
        </Tooltip>
        
        <Tooltip text="Sort posts by date">
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Sort by Date Ascending</option>
            <option value="desc">Sort by Date Descending</option>
          </select>
        </Tooltip>
      </div>

      {/* Blog Posts List */}
      {filteredPosts.map(post => (
        <BlogPost
          key={post.id}
          title={post.title}
          content={post.content}
          date={post.date}
          category={post.category}
          isLitmusOn={isLitmusOn}
          isLitmusPlusOn={isLitmusPlusOn}
          categoryColor={categoryColors[post.category] || 'var(--color-charcoal)'}
        />
      ))}

      {/* Footer with toggles */}
      <footer className="footer">
        <Tooltip text="Toggle color cycle effect">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={isLitmusOn}
              onChange={toggleLitmus}
            />
            Litmus
          </label>
        </Tooltip>
        
        <Tooltip text="Toggle color cycle animation">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={isLitmusPlusOn}
              onChange={toggleLitmusPlus}
              disabled={!isLitmusOn} // Disable "Litmus+" when "Litmus" is off
            />
            Litmus+
          </label>
        </Tooltip>
      </footer>
    </div>
  );
};

export default App;
