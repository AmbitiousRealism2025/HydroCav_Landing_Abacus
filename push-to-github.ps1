# HydroCav Landing Page - Windows PowerShell Push Script
# This script pushes the project to GitHub using Windows commands

Write-Host "🌊 HydroCav Landing Page - Push to GitHub" -ForegroundColor Cyan
Write-Host "Repository: https://github.com/AmbitiousRealism2025/HydroCav_Landing_Abacus.git" -ForegroundColor Yellow
Write-Host ""

# Check if git is available
try {
    git --version | Out-Null
    Write-Host "✅ Git is available" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Git from https://git-scm.com/download/win"
    exit 1
}

# Check if we're in a git repository
if (Test-Path ".git") {
    Write-Host "✅ Git repository already initialized" -ForegroundColor Green
} else {
    Write-Host "📝 Initializing Git repository..." -ForegroundColor Yellow
    git init
    git branch -M main
}

# Show current status
Write-Host ""
Write-Host "📊 Current Git status:" -ForegroundColor Cyan
git status --short

# Show files to be committed
Write-Host ""
Write-Host "📁 Files in project:" -ForegroundColor Cyan
Write-Host "===================" -ForegroundColor Cyan
Get-ChildItem -File | Where-Object { $_.Name -notlike "*.ps1" -and $_.Name -notlike ".git*" } | Format-Table Name, Length -AutoSize

# Show project summary
$htmlFiles = (Get-ChildItem -Filter "*.html").Count
$cssFiles = (Get-ChildItem -Filter "*.css").Count
$jsFiles = (Get-ChildItem -Filter "*.js").Count
$mdFiles = (Get-ChildItem -Filter "*.md").Count

Write-Host ""
Write-Host "📦 Project Summary:" -ForegroundColor Cyan
Write-Host "==================" -ForegroundColor Cyan
Write-Host "📄 HTML files: $htmlFiles" -ForegroundColor White
Write-Host "🎨 CSS files: $cssFiles" -ForegroundColor White
Write-Host "⚡ JavaScript files: $jsFiles" -ForegroundColor White
Write-Host "📚 Documentation files: $mdFiles" -ForegroundColor White

# Ask for confirmation
Write-Host ""
$response = Read-Host "🚀 Ready to push to GitHub? (y/n)"

if ($response -match "^[Yy]$") {
    Write-Host ""
    Write-Host "📝 Adding files to Git..." -ForegroundColor Yellow
    git add .
    
    Write-Host "💾 Creating commit..." -ForegroundColor Yellow
    $commitMessage = @"
feat: initial HydroCav landing page implementation

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

This implementation represents a production-ready, professional web project
showcasing modern development practices and user experience design.
"@
    
    git commit -m $commitMessage
    
    Write-Host ""
    Write-Host "🔗 Adding remote repository..." -ForegroundColor Yellow
    try {
        git remote remove origin 2>$null
    } catch {
        # Remote doesn't exist, that's fine
    }
    git remote add origin https://github.com/AmbitiousRealism2025/HydroCav_Landing_Abacus.git
    
    Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
        Write-Host ""
        Write-Host "🌐 Your repository is now available at:" -ForegroundColor Cyan
        Write-Host "https://github.com/AmbitiousRealism2025/HydroCav_Landing_Abacus" -ForegroundColor Blue
        Write-Host ""
        Write-Host "🎯 Next steps:" -ForegroundColor Cyan
        Write-Host "1. Visit your repository to verify all files are present"
        Write-Host "2. Check the Actions tab to see the CI/CD pipeline"
        Write-Host "3. Consider enabling GitHub Pages for live preview"
        Write-Host "4. Set up branch protection rules for main branch"
        Write-Host ""
        Write-Host "🚀 Optional: Enable GitHub Pages" -ForegroundColor Yellow
        Write-Host "   - Go to Settings > Pages"
        Write-Host "   - Source: Deploy from a branch"
        Write-Host "   - Branch: main"
        Write-Host "   - Your site will be at: https://ambitiousrealism2025.github.io/HydroCav_Landing_Abacus"
    } else {
        Write-Host ""
        Write-Host "❌ Push failed. Please check the error messages above." -ForegroundColor Red
        Write-Host "Common solutions:" -ForegroundColor Yellow
        Write-Host "1. Make sure you're authenticated with GitHub"
        Write-Host "2. Check if the repository exists and you have write access"
        Write-Host "3. Try using a personal access token for authentication"
    }
    
} else {
    Write-Host "❌ Push cancelled. Run this script again when ready." -ForegroundColor Red
}

Write-Host ""
Write-Host "🌊 HydroCav Landing Page - Ready to make waves! 🌊" -ForegroundColor Cyan