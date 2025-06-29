# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern, responsive landing page for HydroCav's HydroLoop water treatment system. It's a static website built with vanilla HTML, CSS, and JavaScript, focusing on performance, accessibility, and visual appeal.

**Architecture**: Single-page application with three core files:
- `index.html` - Semantic HTML structure with sections for hero, technology, benefits, features, and contact
- `styles.css` - CSS with custom properties, modern layout techniques (Grid/Flexbox), and responsive design
- `script.js` - Vanilla JavaScript for interactive features and smooth animations

## Development Commands

```bash
# Start development server
npm run dev                    # Opens browser automatically
npm start                      # Basic server without auto-open

# Testing and validation
npm test                       # Run all tests (linting + validation)
npm run test:quick            # Quick test without full validation
npm run lint                  # Run all linting (HTML, CSS, JS)
npm run lint:html             # HTML validation only
npm run lint:css              # CSS linting with Stylelint
npm run lint:js               # JavaScript linting with ESLint
npm run lint:fix              # Auto-fix linting issues

# Performance and accessibility
npm run test:performance      # Lighthouse audit (requires server running)
npm run test:accessibility    # Pa11y accessibility test
npm run validate              # HTML validation

# Build and deployment
npm run build                 # Minify CSS and JS to dist/
npm run serve:dist            # Serve production build
npm run clean                 # Remove dist/ and reports/
```

## Code Architecture

### CSS Architecture
- **CSS Custom Properties**: Centralized theming in `:root` with color palette, shadows, and transitions
- **BEM Methodology**: Block__Element--Modifier naming convention for classes
- **Mobile-First**: Responsive breakpoints at 768px (tablet) and 1024px (desktop)
- **Modern CSS**: Uses CSS Grid for layout, Flexbox for components, and CSS animations

### JavaScript Architecture
- **Vanilla JS**: No frameworks, uses modern ES6+ features
- **Event-Driven**: DOM event listeners for user interactions
- **Feature Modules**: Grouped functionality (navigation, animations, forms, etc.)
- **Accessibility**: Proper ARIA handling and keyboard navigation support

### Key Interactive Features
- **Mobile Navigation**: Hamburger menu with smooth animations
- **Technology Tabs**: Dynamic content switching with animated transitions
- **Benefit Cards**: Expandable cards with hover effects
- **Product Viewer**: Multi-angle product showcase
- **Size Selector**: Dynamic content updates based on selection
- **Smooth Scrolling**: Between page sections with navigation highlighting

### Responsive Design
- **Breakpoints**: 320px (mobile), 768px (tablet), 1024px+ (desktop)
- **Images**: Responsive with proper alt text and lazy loading
- **Touch Targets**: Minimum 44px for mobile accessibility
- **Performance**: Optimized animations targeting 60fps

## Testing Requirements

### Before Committing
Always run these commands before committing changes:
```bash
npm run lint          # Fix code quality issues
npm test             # Ensure all validations pass
```

### Cross-Browser Testing
Test in: Chrome, Firefox, Safari, Edge, plus mobile browsers (iOS Safari, Chrome Mobile)

### Accessibility Standards
- WCAG AA compliance required (4.5:1 color contrast)
- Keyboard navigation must work for all interactive elements
- Screen reader compatibility with proper ARIA labels
- `prefers-reduced-motion` support for animations

### Performance Targets
- Lighthouse Performance: 90+
- Accessibility: 95+
- First Contentful Paint: < 1.5s
- Cumulative Layout Shift: < 0.1

## File Structure Patterns

### Adding New Sections
Follow this HTML pattern:
```html
<section id="section-name" class="section-name">
    <div class="container">
        <h2 class="section-title">Section Title</h2>
        <p class="section-subtitle">Description</p>
        <!-- Section content -->
    </div>
</section>
```

### CSS Class Naming
Use BEM methodology consistently:
```css
.component-name { }           /* Block */
.component-name__element { }  /* Element */
.component-name--modifier { } /* Modifier */
```

### JavaScript Patterns
- Use `document.addEventListener('DOMContentLoaded', ...)` for initialization
- Implement error handling with try-catch blocks
- Use event delegation for dynamic content
- Update ARIA attributes for accessibility

## Design System

### Colors (CSS Custom Properties)
- `--primary-blue: #0066CC` - Main brand color
- `--deep-ocean: #003366` - Dark text and accents
- `--light-aqua: #00B4D8` - Interactive elements
- `--aqua-accent: #00E5FF` - Highlights and hover states

### Typography
- Headings: Montserrat (400, 600, 700)
- Body: Open Sans (300, 400, 600)
- Line height: 1.6 for body, 1.2 for headings

### Animation Guidelines
- Use CSS custom properties for transition durations
- Respect `prefers-reduced-motion` media query
- Target 60fps performance for smooth animations
- Keep animations subtle and purposeful

## Important Configuration Files

- `package.json` - Development scripts and dependencies
- `lighthouserc.js` - Performance testing configuration with strict thresholds
- `.gitignore` - Excludes node_modules, dist/, and reports/
- Linting configs: `.eslintrc.json`, `.stylelintrc.json`, `.htmlvalidate.json`

## Common Tasks

### Adding Images
Place in `assets/images/` and reference with proper alt text. Use responsive images with srcset when possible.

### Modifying Colors
Update CSS custom properties in `:root` selector in `styles.css`.

### Performance Optimization
- Images: Use WebP format with fallbacks
- CSS: Minimize unused styles, use efficient selectors
- JavaScript: Debounce scroll events, use event delegation
- Always test with Lighthouse after changes