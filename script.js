// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Parallax Effect for Hero Image
    const parallaxElements = document.querySelectorAll('.parallax-element');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Technology Tabs
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
    
    // Benefit Cards Expand/Collapse
    const benefitCards = document.querySelectorAll('.benefit-card');
    
    benefitCards.forEach(card => {
        const expandBtn = card.querySelector('.expand-btn');
        
        expandBtn.addEventListener('click', function() {
            card.classList.toggle('expanded');
            const btnText = card.classList.contains('expanded') ? 'Show Less' : 'Learn More';
            expandBtn.innerHTML = `${btnText} <i class="fas fa-chevron-${card.classList.contains('expanded') ? 'up' : 'down'}"></i>`;
        });
    });
    
    // Counter Animation
    const counters = document.querySelectorAll('.counter-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                
                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    // Product View Controls
    const viewButtons = document.querySelectorAll('.view-btn');
    const productImages = document.querySelectorAll('.product-image');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetView = this.dataset.view;
            
            // Update buttons
            viewButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update images
            productImages.forEach(img => {
                img.classList.remove('active');
                if (img.dataset.view === targetView) {
                    img.classList.add('active');
                }
            });
        });
    });
    
    // Size Selector Tabs
    const sizeTabs = document.querySelectorAll('.size-tab');
    const sizePanes = document.querySelectorAll('.size-pane');
    
    sizeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetSize = this.dataset.size;
            
            // Update tabs
            sizeTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update panes
            sizePanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.dataset.size === targetSize) {
                    pane.classList.add('active');
                }
            });
        });
    });
    
    // Installation Steps
    const steps = document.querySelectorAll('.step');
    
    steps.forEach((step, index) => {
        step.addEventListener('click', function() {
            // Remove active class from all steps
            steps.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked step and all previous steps
            for (let i = 0; i <= index; i++) {
                steps[i].classList.add('active');
            }
        });
    });
    
    // Intersection Observer for Animations
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                
                // Add delay if specified
                const delay = entry.target.dataset.aosDelay;
                if (delay) {
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
    
    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const button = this.querySelector('button');
            const originalText = button.textContent;
            
            // Simulate form submission
            button.textContent = 'Subscribing...';
            button.disabled = true;
            
            setTimeout(() => {
                button.textContent = 'Subscribed!';
                button.style.background = '#4CAF50';
                this.reset();
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                    button.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
    
    // Mouse Parallax Effect
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        heroSection.addEventListener('mousemove', function(e) {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            
            const waterAnimation = this.querySelector('.water-animation');
            if (waterAnimation) {
                waterAnimation.style.transform = `translate(${x}px, ${y}px)`;
            }
        });
    }
    
    // Bubble Animation Enhancement
    const bubbles = document.querySelectorAll('.bubble');
    
    bubbles.forEach((bubble, index) => {
        bubble.addEventListener('animationiteration', function() {
            // Randomize bubble position slightly on each iteration
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;
            this.style.transform = `translate(${randomX}px, ${randomY}px)`;
        });
    });
    
    // CTA Button Ripple Effect
    const ctaButtons = document.querySelectorAll('.btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        [data-aos] {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        [data-aos].aos-animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Performance Optimization - Lazy Loading Images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Accessibility - Focus Management
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = document.querySelector('.modal');
    
    if (modal) {
        const focusableContent = modal.querySelectorAll(focusableElements);
        const firstFocusableElement = focusableContent[0];
        const lastFocusableElement = focusableContent[focusableContent.length - 1];
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab' && modal.classList.contains('active')) {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }
    
    // Initialize on page load
    console.log('HydroCav Landing Page Initialized');
});

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScroll = debounce(function() {
    // Scroll-based animations and effects
}, 100);

window.addEventListener('scroll', optimizedScroll);

// Service Worker Registration (for PWA support)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful');
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}