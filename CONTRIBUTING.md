# Contributing to HydroCav Landing Page

Thank you for your interest in contributing to the HydroCav landing page project! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Git installed on your local machine
- Modern web browser for testing
- Basic knowledge of HTML, CSS, and JavaScript
- Text editor or IDE (VS Code recommended)

### Development Setup
1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/hydrocav-landing-page.git
   cd hydrocav-landing-page
   ```

2. **Set up upstream remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/hydrocav-landing-page.git
   ```

3. **Install development tools (optional)**
   ```bash
   # If using Node.js for development server
   npm install -g http-server
   
   # Or use Python's built-in server
   python -m http.server 8000
   ```

4. **Start development server**
   ```bash
   http-server
   # Navigate to http://localhost:8080
   ```

## 📋 Development Workflow

### Branch Naming Convention
- **Feature branches**: `feature/description-of-feature`
- **Bug fixes**: `fix/description-of-bug`
- **Documentation**: `docs/description-of-change`
- **Performance**: `perf/description-of-optimization`

### Making Changes
1. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the coding standards outlined below
   - Test your changes across different browsers
   - Ensure responsive design works on mobile devices

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new interactive feature"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**
   - Go to GitHub and create a PR from your branch
   - Fill out the PR template with detailed information
   - Link any related issues

## 📝 Coding Standards

### HTML Guidelines
- Use semantic HTML5 elements
- Include proper ARIA labels for accessibility
- Maintain proper heading hierarchy (h1 → h2 → h3)
- Use descriptive alt text for images
- Validate markup using W3C validator

```html
<!-- Good -->
<section class="benefits-section" aria-labelledby="benefits-title">
    <h2 id="benefits-title">Key Benefits</h2>
    <img src="benefit.jpg" alt="HydroLoop system reducing chemical usage by 75%">
</section>

<!-- Avoid -->
<div class="section">
    <div class="title">Benefits</div>
    <img src="benefit.jpg" alt="image">
</div>
```

### CSS Guidelines
- Use CSS custom properties for consistent theming
- Follow BEM methodology for class naming
- Mobile-first responsive design approach
- Use modern CSS features (Grid, Flexbox)
- Maintain consistent spacing and typography

```css
/* Good - BEM naming */
.benefit-card {
    /* Block */
}

.benefit-card__title {
    /* Element */
}

.benefit-card--featured {
    /* Modifier */
}

/* Good - CSS custom properties */
:root {
    --primary-color: #0066CC;
    --spacing-lg: 2rem;
}

.component {
    color: var(--primary-color);
    margin: var(--spacing-lg);
}
```

### JavaScript Guidelines
- Use modern ES6+ syntax
- Write clean, readable code with proper comments
- Handle errors gracefully
- Use event delegation for better performance
- Follow accessibility best practices

```javascript
// Good - Modern syntax with error handling
const initializeFeature = () => {
    try {
        const elements = document.querySelectorAll('.interactive-element');
        
        elements.forEach(element => {
            element.addEventListener('click', handleClick);
        });
    } catch (error) {
        console.error('Failed to initialize feature:', error);
    }
};

// Good - Accessible event handling
const handleClick = (event) => {
    const button = event.target;
    
    // Update ARIA states
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', !expanded);
};
```

## 🧪 Testing Guidelines

### Browser Testing
Test your changes in:
- **Desktop**: Chrome, Firefox, Safari, Edge
- **Mobile**: iOS Safari, Chrome Mobile, Samsung Internet
- **Accessibility**: Screen readers, keyboard navigation

### Performance Testing
- Check Core Web Vitals scores
- Test on slow network connections
- Verify image optimization
- Ensure animations run at 60fps

### Accessibility Testing
- Use keyboard-only navigation
- Test with screen readers
- Verify color contrast ratios
- Check focus indicators

## 🎨 Design Guidelines

### Visual Consistency
- Follow the established color palette
- Use consistent spacing and typography
- Maintain visual hierarchy
- Ensure proper contrast ratios

### Animation Guidelines
- Keep animations subtle and purposeful
- Respect `prefers-reduced-motion` setting
- Target 60fps performance
- Use easing functions for natural motion

### Responsive Design
- Mobile-first approach
- Test on various screen sizes
- Ensure touch targets are at least 44px
- Optimize for both portrait and landscape

## 📊 Performance Guidelines

### Image Optimization
- Use WebP format with fallbacks
- Implement lazy loading
- Provide appropriate alt text
- Use responsive images with srcset

### CSS Performance
- Minimize unused CSS
- Use efficient selectors
- Avoid layout thrashing
- Optimize critical rendering path

### JavaScript Performance
- Minimize DOM manipulation
- Use event delegation
- Debounce scroll events
- Lazy load non-critical features

## 🔍 Code Review Process

### Before Submitting
- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] Accessibility requirements met
- [ ] Performance impact assessed
- [ ] Cross-browser testing completed

### Review Criteria
- **Functionality**: Does it work as expected?
- **Performance**: Does it maintain good performance?
- **Accessibility**: Is it accessible to all users?
- **Code Quality**: Is it maintainable and readable?
- **Design**: Does it match the design system?

## 🐛 Bug Reports

### Before Reporting
1. Check if the issue already exists
2. Test in multiple browsers
3. Clear cache and try again
4. Check console for errors

### Bug Report Template
```markdown
**Bug Description**
A clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior**
What you expected to happen

**Screenshots**
If applicable, add screenshots

**Environment**
- Browser: [e.g. Chrome 91]
- Device: [e.g. iPhone 12]
- Screen size: [e.g. 1920x1080]
```

## 💡 Feature Requests

### Feature Request Template
```markdown
**Feature Description**
Clear description of the proposed feature

**Problem Statement**
What problem does this solve?

**Proposed Solution**
How should this feature work?

**Alternatives Considered**
Other solutions you've considered

**Additional Context**
Any other relevant information
```

## 📚 Resources

### Documentation
- [MDN Web Docs](https://developer.mozilla.org/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [JavaScript Best Practices](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

### Tools
- [W3C Markup Validator](https://validator.w3.org/)
- [WAVE Accessibility Checker](https://wave.webaim.org/)
- [Lighthouse Performance Audit](https://developers.google.com/web/tools/lighthouse)
- [Can I Use](https://caniuse.com/) - Browser compatibility

### Design Resources
- [Material Design Guidelines](https://material.io/design)
- [Inclusive Design Principles](https://inclusivedesignprinciples.org/)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

## 🤝 Community Guidelines

### Code of Conduct
- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Focus on the code, not the person

### Communication
- Use clear, descriptive commit messages
- Provide detailed PR descriptions
- Respond to feedback promptly
- Ask questions when unsure

## 📞 Getting Help

### Channels
- **GitHub Issues**: Technical problems and bugs
- **GitHub Discussions**: General questions and ideas
- **Email**: Direct contact for sensitive issues

### Response Times
- **Bug reports**: 1-2 business days
- **Feature requests**: 3-5 business days
- **Pull requests**: 2-3 business days

Thank you for contributing to the HydroCav landing page project! 🌊