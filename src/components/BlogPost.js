import React from 'react';
import ColorCycleTitle from './ColorCycleTitle'; // Handles the title cycling
import '../styles/main.css';

const BlogPost = ({ title, content, date, category, isLitmusOn, isLitmusPlusOn, categoryColors }) => {
  // Get the background color from categoryColors or default to "Unknown"
  const backgroundColor = categoryColors[category] || categoryColors["Unknown"];
  // Format the date into 'Month DD, YYYY'
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="blog-post">
      {/* Title Box */}
      <div className="blog-post-title-box">
        <ColorCycleTitle text={title} isLitmusOn={isLitmusOn} isLitmusPlusOn={isLitmusPlusOn} />
      </div>

      {/* Content Box */}
      <div className="blog-post-content-box">
        <p>{content}</p>
      </div>

      {/* Date and Category */}
      <div className="blog-post-footer">
        <span className="blog-post-date">{formattedDate}</span>
        <span className="blog-post-category" style={{ backgroundColor: backgroundColor }}>
          {category}
        </span>
      </div>
    </div>
  );
};

export default BlogPost;
