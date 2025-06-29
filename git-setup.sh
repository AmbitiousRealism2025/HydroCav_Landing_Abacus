#!/bin/bash

# HydroCav Landing Page - Git Repository Setup Script
# This script initializes the Git repository with proper configuration

echo "🌊 Initializing HydroCav Landing Page Git Repository..."

# Initialize Git repository
git init

# Set up Git configuration (you may want to customize these)
echo "📝 Setting up Git configuration..."

# Set commit message template
git config commit.template .gitmessage

# Set up useful Git aliases
git config alias.st status
git config alias.co checkout
git config alias.br branch
git config alias.ci commit
git config alias.unstage 'reset HEAD --'
git config alias.last 'log -1 HEAD'
git config alias.visual '!gitk'
git config alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"

# Set up line ending handling
git config core.autocrlf input
git config core.safecrlf true

# Set up default branch name
git config init.defaultBranch main

# Add all files to staging
echo "📁 Adding files to Git..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "feat: initial HydroCav landing page implementation

- Complete responsive landing page with modern design
- Interactive elements and animations
- Accessibility features and performance optimizations
- Comprehensive documentation and development setup
- CI/CD pipeline configuration
- Issue and PR templates for collaboration

Features included:
- Hero section with animated background
- Problem statement with hover effects
- Technology showcase with interactive tabs
- Benefit cards with expandable content
- Product viewer with multiple angles
- Size selector with dynamic content
- Installation guide with step timeline
- Call-to-action section with particle effects
- Responsive footer with newsletter signup

Technical highlights:
- CSS Grid and Flexbox layouts
- CSS custom properties for theming
- Intersection Observer for animations
- Debounced scroll events for performance
- ARIA labels and keyboard navigation
- Mobile-first responsive design
- Cross-browser compatibility
- SEO optimization"

# Create development branch
echo "🌿 Creating development branch..."
git checkout -b develop

# Switch back to main
git checkout main

# Display repository status
echo "✅ Git repository initialized successfully!"
echo ""
echo "📊 Repository Status:"
git status
echo ""
echo "📝 Recent Commits:"
git log --oneline -5
echo ""
echo "🌿 Available Branches:"
git branch -a
echo ""
echo "🚀 Next Steps:"
echo "1. Add remote repository: git remote add origin <repository-url>"
echo "2. Push to remote: git push -u origin main"
echo "3. Push develop branch: git push -u origin develop"
echo "4. Set up branch protection rules on GitHub"
echo "5. Configure GitHub Pages or deployment service"
echo ""
echo "💡 Useful Git Commands:"
echo "- git lg                 # Pretty log with graph"
echo "- git st                 # Short status"
echo "- git co develop         # Switch to develop branch"
echo "- git co -b feature/name # Create and switch to feature branch"
echo ""
echo "📚 Documentation:"
echo "- README.md              # Project overview and setup"
echo "- CONTRIBUTING.md        # Development guidelines"
echo "- .github/               # Issue and PR templates"