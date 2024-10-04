import React, { useState, useEffect, useRef } from 'react';
import BlogPost from './components/BlogPost';
import BadgeFilterControls from './components/Controls';
import Tooltip from './components/Tooltip';
import TimeDisplay from './components/TimeDisplay'; // Import the new component
import postsData from './data/posts.json';
import './styles/main.css';

// Main app function
const App = () => {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('desc'); // Default to descending order
  const [filteredPosts, setFilteredPosts] = useState(postsData);
  const [isLitmusOn, setIsLitmusOn] = useState(() => JSON.parse(localStorage.getItem('isLitmusOn')) ?? true);
  const [isLitmusPlusOn, setIsLitmusPlusOn] = useState(() => JSON.parse(localStorage.getItem('isLitmusPlusOn')) ?? true);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Array of refs to track each blog post
  const postRefs = useRef([]);

  // Centralize category colors
  const categoryColors = {
    Unknown: "var(--color-charcoal)", // Neutral color for unknown
    Life: "var(--color-green)", // Green for life and vitality
    Tech: "var(--color-indigo)", // Tech and innovation feel
    Health: "var(--color-dark-green)", // Health and wellness
    Money: "var(--color-yellow)", // Wealth and prosperity
    Travel: "var(--color-blue)", // Travel and exploration
    Food: "var(--color-orange)", // Food and appetite
    Games: "var(--color-red)", // Excitement for games
    Learn: "var(--color-pink)" // Learning and creativity
  };  

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Clean up the event listener on unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter and sort posts based on search, category, and date
  useEffect(() => {
    let posts = [...postsData];

    // Filter by category if selected
    if (categoryFilter) {
      posts = posts.filter(post => post.category === categoryFilter);
    }

    // Filter by search query
    if (searchQuery) {
      posts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort posts by date
    posts.sort((a, b) => {
      if (sortOrder === 'asc') {
        return new Date(a.date) - new Date(b.date);
      } else {
        return new Date(b.date) - new Date(a.date);
      }
    });

    setFilteredPosts(posts);
  }, [categoryFilter, searchQuery, sortOrder]);

  // Save litmus state to local storage
  useEffect(() => {
    localStorage.setItem('isLitmusOn', JSON.stringify(isLitmusOn));
    localStorage.setItem('isLitmusPlusOn', JSON.stringify(isLitmusPlusOn));
  }, [isLitmusOn, isLitmusPlusOn]);

  // Toggle handlers for Litmus
  const toggleLitmus = () => setIsLitmusOn(!isLitmusOn);
  const toggleLitmusPlus = () => setIsLitmusPlusOn(!isLitmusPlusOn);

  // Function to calculate opacity based on scroll position
  const calculateOpacity = (elementTop) => {
    const windowHeight = window.innerHeight;
    const fadeOutPoint = windowHeight * 0.3; // Adjust this value to change the fade-out effect distance
    const distanceFromViewport = elementTop - scrollPosition;

    // Calculate opacity
    let opacity = (windowHeight - distanceFromViewport) / (windowHeight - fadeOutPoint);
    opacity = Math.max(0, Math.min(opacity, 1)); // Clamp the opacity between 0 and 1
    return opacity;
  };

  // Handle fade effect for all posts on scroll
  useEffect(() => {
    postRefs.current.forEach((postRef) => {
      if (postRef) {
        const rect = postRef.getBoundingClientRect();
        const opacity = calculateOpacity(rect.top + scrollPosition);
        postRef.style.opacity = opacity;
      }
    });
  }, [scrollPosition, filteredPosts]);

  return (
    <div className="container">
{/* Header */}
<header className="app-header">
  <h1 style={{ fontFamily: 'Old English Text MT, serif' }}>A Life I Do Not Deserve</h1>
  {/* Display Time Below Header */}
  <div> {/* Optional: Add margin to space it out */}
    <TimeDisplay />
  </div>
</header>


      
      {/* Badge Filter Controls */}
      <BadgeFilterControls
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        categoryColors={categoryColors}
      />

      {/* Blog Posts */}
      {filteredPosts.map((post, index) => (
        <div
          key={post.id}
          ref={(el) => (postRefs.current[index] = el)}
          className="blog-post-container"
        >
          <BlogPost
            title={post.title}
            content={post.content}
            date={post.date}
            category={post.category}
            categoryColors={categoryColors} // Pass categoryColors prop
            isLitmusOn={isLitmusOn}
            isLitmusPlusOn={isLitmusPlusOn}
          />
        </div>
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
              disabled={!isLitmusOn}
            />
            Litmus+
          </label>
        </Tooltip>
      </footer>
    </div>
  );
};

export default App;
