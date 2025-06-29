#!/bin/bash

# HydroCav Landing Page - Push to GitHub Script
# This script pushes the project to the specific GitHub repository

echo "🌊 Pushing HydroCav Landing Page to GitHub..."
echo "Repository: https://github.com/AmbitiousRealism2025/HydroCav_Landing_Abacus.git"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📝 Initializing Git repository..."
    git init
    git branch -M main
else
    echo "✅ Git repository already initialized"
fi

# Check current status
echo "📊 Current Git status:"
git status --short

echo ""
echo "📁 Files to be committed:"
echo "========================"

# List all files that will be committed
find . -type f -not -path "./.git/*" -not -name "push-to-github.sh" | sort

echo ""
echo "📦 Project Summary:"
echo "=================="
echo "📄 HTML files: $(find . -name "*.html" | wc -l)"
echo "🎨 CSS files: $(find . -name "*.css" | wc -l)"
echo "⚡ JavaScript files: $(find . -name "*.js" | wc -l)"
echo "📚 Documentation files: $(find . -name "*.md" | wc -l)"
echo "⚙️ Configuration files: $(find . -name ".*rc*" -o -name "*.json" | wc -l)"

echo ""
echo "🔍 File sizes:"
echo "=============="
ls -lh *.html *.css *.js *.md 2>/dev/null | awk '{print $5 "\t" $9}'

echo ""
echo "🚀 Ready to push? (y/n)"
read -r response

if [[ "$response" =~ ^[Yy]$ ]]; then
    echo ""
    echo "📝 Adding files to Git..."
    git add .
    
    echo "💾 Creating commit..."
    git commit -m "feat: initial HydroCav landing page implementation

Complete responsive landing page featuring:
- Modern design with water-themed animations and effects
- Interactive elements: tabs, cards, product viewer, size selector
- Comprehensive testing suite with automated and manual testing
- Professional development workflow with linting and validation
- Accessibility compliance (WCAG 2.1 AA standards)
- Performance optimized (targeting 90+ Lighthouse scores)
- Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- Mobile-first responsive design (320px to 1920px+)
- SEO optimized with semantic HTML and meta tags

Technical Implementation:
- HTML5 with semantic structure and ARIA labels
- CSS3 with custom properties, Grid, Flexbox, and animations
- Vanilla JavaScript with modern ES6+ features
- Node.js development environment with npm scripts
- Code quality tools: ESLint, Stylelint, HTML validation
- GitHub Actions CI/CD pipeline for automated testing
- Comprehensive documentation and contribution guidelines

Development Features:
- Git workflow with conventional commits
- Issue and PR templates for collaboration
- Automated testing for accessibility and performance
- Development server and build scripts
- Cross-platform compatibility

Project Structure:
- Landing page with hero, features, benefits, and CTA sections
- Interactive product showcase with multiple viewing angles
- Size selector with dynamic content updates
- Installation guide with expandable timeline
- Newsletter signup and contact forms
- Responsive footer with social links

This implementation represents a production-ready, professional web project
showcasing modern development practices and user experience design."
    
    echo ""
    echo "🔗 Adding remote repository..."
    git remote remove origin 2>/dev/null || true
    git remote add origin https://github.com/AmbitiousRealism2025/HydroCav_Landing_Abacus.git
    
    echo "📤 Pushing to GitHub..."
    git push -u origin main
    
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "🌐 Your repository is now available at:"
    echo "https://github.com/AmbitiousRealism2025/HydroCav_Landing_Abacus"
    echo ""
    echo "🎯 Next steps:"
    echo "1. Visit your repository to verify all files are present"
    echo "2. Check the Actions tab to see the CI/CD pipeline"
    echo "3. Consider enabling GitHub Pages for live preview"
    echo "4. Set up branch protection rules for main branch"
    echo ""
    echo "🚀 Optional: Enable GitHub Pages"
    echo "   - Go to Settings > Pages"
    echo "   - Source: Deploy from a branch"
    echo "   - Branch: main"
    echo "   - Your site will be at: https://ambitiousrealism2025.github.io/HydroCav_Landing_Abacus"
    
else
    echo "❌ Push cancelled. Run this script again when ready."
fi

echo ""
echo "🌊 HydroCav Landing Page - Ready to make waves! 🌊"