
# Project Code Structure and Guidelines

## 1. File Organization
- **Components**: Keep React components within `src/components`. Each component should have its own file (or folder if it has multiple subcomponents/styles).
  - Example: `src/components/BlogList.js`, `src/components/Header.js`.
- **Data**: Store JSON data or data models within `src/data`.
  - Example: `src/data/posts.json`.
- **Utilities and Configurations**: Store reusable functions, constants, and configurations in `src/utils`.
  - Example: `src/utils/config.js`.
- **Styles**: Keep CSS files within `src/styles`. Consider using a CSS-in-JS library (like Styled Components) if you want to keep styles closely tied to components.

## 2. Naming Conventions
- **Variables & Functions**: Use `camelCase` for all variables, functions, and object properties.
  - Example: `const blogPosts = [];`, `function handleFilterChange() {}`.
- **Component Names**: Use `PascalCase` for React component names.
  - Example: `BlogPost`, `Controls`.
- **File and Folder Names**: Use `PascalCase` for component files/folders and `kebab-case` for stylesheets and other assets.
  - Example: `BlogPost.js`, `blog-post.css`.
- **CSS Class Names**: Use `kebab-case` for class names, following BEM (Block Element Modifier) methodology for clarity.
  - Example: `.blog-list`, `.blog-post-title`.

## 3. Data Structures

### Blog Post Structure
Define a consistent structure for your blog post objects. All properties should be clear, and any additional properties should extend from this base structure.
\`\`\`json
{
  "id": 1,                         // Unique identifier for the post
  "title": "First Blog Post",      // Title of the post
  "content": "Post content here.", // Body content of the post
  "date": "YYYY-MM-DD",            // Publication date in ISO format
  "category": "CategoryName",      // Post category (e.g., "Tech", "Life")
  "attachments": [                 // Optional array for attachments
    {
      "name": "Attachment Name",   // Name of the attachment
      "url": "https://link.com"    // URL to access the attachment
    }
  ]
}
\`\`\`

- **Conventions**:
  - Use `id` as a unique identifier.
  - Keep `title` and `content` as strings with meaningful values.
  - Store `date` in `YYYY-MM-DD` format for easier parsing and sorting.
  - Keep `category` to a predefined list (use config).
  - Use `attachments` as an optional array, each containing `name` and `url`.

### Configuration Structure
Use a config file to store global variables, settings, and lists that are frequently used throughout the app.
\`\`\`js
// src/utils/config.js

export const categories = [
  'Tech',
  'Life',
  'Business',
  // Add more categories as needed
];

export const sortOptions = [
  { value: 'desc', label: 'Newest' },
  { value: 'asc', label: 'Oldest' },
];
\`\`\`

## 4. CSS & Styling
- **Variables for Theme Consistency**: Define and use CSS variables (`:root {}`) for colors, fonts, and spacing.
  \`\`\`css
  :root {
    --color-bg-dark: #000101;
    --color-text-light: #fafafa;
    --color-primary: #52a2d9;
    --spacing-md: 16px;
  }
  \`\`\`
- **Reusability**: Write reusable utility classes for common styles (e.g., `.text-center`, `.mb-md` for spacing).
- **BEM Naming for Classes**: Follow Block-Element-Modifier methodology for clarity in class names.
  - **Block**: Represents a standalone component (`.blog-post`).
  - **Element**: A child of the block, connected with two underscores (`.blog-post__title`).
  - **Modifier**: A variation of a block or element, appended with two hyphens (`.blog-post--highlighted`).

## 5. React Component Rules
- **Functional Components with Hooks**: Use functional components and React hooks (`useState`, `useEffect`) for state and lifecycle management.
- **Prop-Drilling**: Pass props down from parent to child components as needed. Use destructuring for props to keep the code clean.
  \`\`\`jsx
  const Controls = ({ searchTerm, setSearchTerm }) => { ... };
  \`\`\`
- **Avoid Deep Nesting**: Keep the component structure as flat as possible. If a component is getting large, break it into smaller subcomponents.
- **Reusable Components**: Extract reusable UI elements (e.g., buttons, form controls) into their own components.

## 6. State Management
- **Local State**: Use `useState` for simple local component state (e.g., search input, toggles).
- **Derived State**: Use `useMemo` or `useEffect` to derive state based on other states (e.g., filtered and sorted blog posts).
- **Global State**: For app-wide state that needs to be accessed by multiple components, use a context provider (React Context API).

## 7. Code Styling and Formatting
- **Prettier for Code Formatting**: Use **Prettier** for consistent code formatting.
  - Use 2-space indentations for code clarity.
  - Keep line length around 80-100 characters.
- **ESLint for Linting**: Use **ESLint** to ensure code quality and catch common errors.

## 8. Best Practices for Components
- **Component Names Should Reflect Functionality**: Components should be named based on what they represent, not how they appear.
  - ✅ Good: `BlogPost`, `SearchBar`
  - ❌ Bad: `BlueBox`, `TitleContainer`
- **Keep Components Small and Focused**: Each component should have a single responsibility. If a component is handling multiple concerns, break it into smaller components.
- **Avoid Inline Styles**: Prefer CSS classes over inline styles to keep your components clean.

## 9. Functions and Event Handlers
- **Naming**: Use `handle` as a prefix for event handler functions (e.g., `handleSearchChange`, `handleFilterSelect`).
- **Avoid Anonymous Functions in JSX**: Declare functions separately to avoid performance issues caused by rendering new function instances on every render.
  \`\`\`jsx
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return <input onChange={handleSearchChange} />;
  \`\`\`

## 10. Responsive Design
- **Mobile-First Approach**: Build the layout for mobile first and scale up for larger devices using media queries.
- **CSS Flexbox and Grid**: Use CSS Flexbox and Grid for layout, ensuring that components are responsive and align properly on all screen sizes.

## 11. Documentation and Comments
- **Component Docs**: At the top of each component file, briefly document its purpose.
  \`\`\`jsx
  // Header.js
  // The Header component renders the main title of the blog.
  \`\`\`
- **Comment Where Necessary**: Avoid over-commenting. Comment only on complex logic or areas that might need clarification.

By adhering to these rules and structures, your project will remain clean, scalable, and maintainable as it grows!


## Data Structure

### `posts.json`
The structure of each blog post entry is as follows:
```json
{
  "id": <number>,
  "title": <string>,
  "content": <string>,
  "date": <string in "YYYY-MM-DD" format>,
  "category": <string>
}
```

### App State in `App.js`
- **isLitmusOn (boolean)**: Controls whether the color cycling effect for the blog titles is enabled.
- **isLitmusPlusOn (boolean)**: Controls whether the color cycling animation is active.
- **posts (array)**: Stores the full list of blog posts.
- **filteredPosts (array)**: Contains the posts that match the current search, filter, and sort criteria.
- **searchTerm (string)**: Stores the current search input.
- **categoryFilter (string)**: Holds the selected category for filtering.
- **sortOrder (string)**: Specifies the sort order ('asc' or 'desc').

### Styling Variables
The following CSS variables are used throughout the application:
- **Color Variables**:
  - `--color-white`: Background for light elements.
  - `--color-almost-black`: Primary background color.
  - `--color-charcoal`, `--color-ink`: Additional shades of gray for text and boxes.
  - **Rainbow colors** for title cycling:
    - `--color-red`, `--color-orange`, `--color-yellow`, `--color-green`, `--color-blue`, `--color-indigo`, `--color-pink`, `--color-dark-green`.

- **Font and Spacing Variables**:
  - **Fonts**: `--font-family-heading`, `--font-family-body`.
  - **Spacing**: `--spacing-sm`, `--spacing-md`, `--spacing-lg`.


## Changelog

### Version 1.1 (04/10/24, 22:11)
- **Implemented `Tooltip.js` Component**: Added tooltips for controls and footer toggles, improving UI/UX.
- **`App.js` Major Changes**:
  - Integrated `Tooltip` to `App.js` to wrap controls with tooltips.
  - Refactored `BlogPost` component to dynamically apply category badge colors.
  - Implemented search, filter, and sort functionalities for posts with corresponding state management.
  - Added state persistence for "Litmus" and "Litmus+" toggles using `localStorage`.
- **Styling Improvements in `main.css`**:
  - Ensured tooltips are correctly positioned with `z-index`.
  - Used consistent color variables (`--color-charcoal`, `--color-almost-black`) for background and text styling.
  - Styled controls and footer to match the overall dark theme.
- **`BlogPost.js` Enhancements**:
  - Improved layout for blog post titles and content.
  - Corrected badge rendering to reflect category-specific colors.

### Version 1.0
- **Initial Setup**: Base structure for the blog using React, with initial integration of posts from `posts.json`.
- **Basic UI Components Created**: `BlogPost`, `App`, and fundamental state management.
