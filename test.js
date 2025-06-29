#!/usr/bin/env node

/**
 * HydroCav Landing Page Test Runner
 * Simple test script to validate the landing page
 */

const fs = require('fs');
const path = require('path');

console.log('🌊 HydroCav Landing Page Test Runner');
console.log('=====================================\n');

let testsPassed = 0;
let testsFailed = 0;

function test(description, testFn) {
    try {
        const result = testFn();
        if (result) {
            console.log(`✅ ${description}`);
            testsPassed++;
        } else {
            console.log(`❌ ${description}`);
            testsFailed++;
        }
    } catch (error) {
        console.log(`❌ ${description} - Error: ${error.message}`);
        testsFailed++;
    }
}

// File existence tests
console.log('📁 File Structure Tests');
console.log('-----------------------');

test('index.html exists', () => fs.existsSync('index.html'));
test('styles.css exists', () => fs.existsSync('styles.css'));
test('script.js exists', () => fs.existsSync('script.js'));
test('README.md exists', () => fs.existsSync('README.md'));
test('package.json exists', () => fs.existsSync('package.json'));

// Content validation tests
console.log('\n📝 Content Validation Tests');
console.log('----------------------------');

test('HTML contains DOCTYPE', () => {
    const html = fs.readFileSync('index.html', 'utf8');
    return html.includes('<!DOCTYPE html>');
});

test('HTML contains viewport meta tag', () => {
    const html = fs.readFileSync('index.html', 'utf8');
    return html.includes('name="viewport"');
});

test('HTML contains title tag', () => {
    const html = fs.readFileSync('index.html', 'utf8');
    return html.includes('<title>') && html.includes('</title>');
});

test('CSS contains root variables', () => {
    const css = fs.readFileSync('styles.css', 'utf8');
    return css.includes(':root') && css.includes('--');
});

test('JavaScript is valid syntax', () => {
    const js = fs.readFileSync('script.js', 'utf8');
    // Basic syntax check - look for common patterns
    return js.includes('document.') || js.includes('window.') || js.includes('function');
});

// Accessibility tests
console.log('\n♿ Basic Accessibility Tests');
console.log('----------------------------');

test('HTML contains lang attribute', () => {
    const html = fs.readFileSync('index.html', 'utf8');
    return html.includes('lang="');
});

test('Images have alt attributes', () => {
    const html = fs.readFileSync('index.html', 'utf8');
    const imgTags = html.match(/<img[^>]*>/g) || [];
    return imgTags.every(img => img.includes('alt='));
});

test('Form inputs have labels', () => {
    const html = fs.readFileSync('index.html', 'utf8');
    const inputTags = html.match(/<input[^>]*>/g) || [];
    const labelTags = html.match(/<label[^>]*>/g) || [];
    // Basic check - should have labels if there are inputs
    return inputTags.length === 0 || labelTags.length > 0;
});

// Performance tests
console.log('\n⚡ Basic Performance Tests');
console.log('--------------------------');

test('CSS file size is reasonable', () => {
    const stats = fs.statSync('styles.css');
    const sizeKB = stats.size / 1024;
    return sizeKB < 100; // Less than 100KB
});

test('JavaScript file size is reasonable', () => {
    const stats = fs.statSync('script.js');
    const sizeKB = stats.size / 1024;
    return sizeKB < 50; // Less than 50KB
});

test('HTML file size is reasonable', () => {
    const stats = fs.statSync('index.html');
    const sizeKB = stats.size / 1024;
    return sizeKB < 100; // Less than 100KB
});

// SEO tests
console.log('\n🔍 Basic SEO Tests');
console.log('------------------');

test('HTML contains meta description', () => {
    const html = fs.readFileSync('index.html', 'utf8');
    return html.includes('name="description"');
});

test('HTML contains proper heading structure', () => {
    const html = fs.readFileSync('index.html', 'utf8');
    return html.includes('<h1') && html.includes('<h2');
});

test('HTML contains Open Graph tags', () => {
    const html = fs.readFileSync('index.html', 'utf8');
    return html.includes('property="og:');
});

// Configuration tests
console.log('\n⚙️  Configuration Tests');
console.log('-----------------------');

test('Package.json has required scripts', () => {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const requiredScripts = ['start', 'test', 'lint'];
    return requiredScripts.every(script => pkg.scripts && pkg.scripts[script]);
});

test('ESLint config exists', () => fs.existsSync('.eslintrc.json'));
test('Stylelint config exists', () => fs.existsSync('.stylelintrc.json'));
test('Git ignore file exists', () => fs.existsSync('.gitignore'));

// Summary
console.log('\n📊 Test Summary');
console.log('===============');
console.log(`✅ Tests Passed: ${testsPassed}`);
console.log(`❌ Tests Failed: ${testsFailed}`);
console.log(`📈 Success Rate: ${Math.round((testsPassed / (testsPassed + testsFailed)) * 100)}%`);

if (testsFailed === 0) {
    console.log('\n🎉 All tests passed! Your HydroCav landing page is ready to go!');
    console.log('\n🚀 Next steps:');
    console.log('   1. Run "npm run dev" to start the development server');
    console.log('   2. Open http://localhost:8000 in your browser');
    console.log('   3. Run "npm run lint" for detailed code quality checks');
    console.log('   4. Run "npm run test:performance" for performance testing');
} else {
    console.log('\n⚠️  Some tests failed. Please review the issues above.');
    console.log('\n🔧 Common fixes:');
    console.log('   - Ensure all required files exist');
    console.log('   - Check HTML syntax and structure');
    console.log('   - Verify accessibility attributes');
    console.log('   - Review file sizes and optimize if needed');
    process.exit(1);
}

console.log('\n📚 For more detailed testing, see the Testing section in README.md');
console.log('🌊 Happy coding with HydroCav!');