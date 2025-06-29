// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    function toggleMobileMenu() {
        const isOpen = navMenu.classList.contains('active');
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', (!isOpen).toString());
    }

    hamburger.addEventListener('click', toggleMobileMenu);

    // Add keyboard support for hamburger menu
    hamburger.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMobileMenu();
        }
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

    // Scroll Progress Bar
    const scrollProgressFill = document.querySelector('.scroll-progress-fill');

    function updateScrollProgress() {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / scrollable) * 100;

        if (scrollProgressFill) {
            scrollProgressFill.style.width = `${Math.min(progress, 100)}%`;
        }
    }

    // Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        updateScrollProgress();

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

    // Enhanced Product View Controls with Swipe Support
    const viewButtons = document.querySelectorAll('.view-btn');
    const productImages = document.querySelectorAll('.product-image');
    const productViewer = document.querySelector('.product-3d-view');

    let currentViewIndex = 0;
    const views = ['front', 'side', 'top'];

    function switchToView(viewIndex) {
        const targetView = views[viewIndex];

        // Update buttons
        viewButtons.forEach(btn => btn.classList.remove('active'));
        const targetButton = document.querySelector(`[data-view="${targetView}"]`);
        if (targetButton) targetButton.classList.add('active');

        // Update images with transition effect
        productImages.forEach(img => {
            img.classList.remove('active');
            if (img.dataset.view === targetView) {
                img.classList.add('active');
            }
        });

        currentViewIndex = viewIndex;
    }

    // Button click handlers
    viewButtons.forEach((button) => {
        button.addEventListener('click', function() {
            const targetView = this.dataset.view;
            const viewIndex = views.indexOf(targetView);
            if (viewIndex !== -1) {
                switchToView(viewIndex);
            }
        });
    });

    // Touch/Swipe Support for Product Viewer
    if (productViewer) {
        let startX = 0;
        let startY = 0;
        let isDragging = false;

        productViewer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = true;
        });

        productViewer.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault(); // Prevent scrolling
        });

        productViewer.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;

            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const deltaX = endX - startX;
            const deltaY = endY - startY;

            // Check if this is a horizontal swipe (not vertical scroll)
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    // Swipe right - previous view
                    const newIndex = (currentViewIndex - 1 + views.length) % views.length;
                    switchToView(newIndex);
                } else {
                    // Swipe left - next view
                    const newIndex = (currentViewIndex + 1) % views.length;
                    switchToView(newIndex);
                }
            }
        });

        // Mouse drag support for desktop
        let isMouseDragging = false;
        let mouseStartX = 0;

        productViewer.addEventListener('mousedown', (e) => {
            mouseStartX = e.clientX;
            isMouseDragging = true;
            productViewer.style.cursor = 'grabbing';
        });

        productViewer.addEventListener('mousemove', (e) => {
            if (!isMouseDragging) return;
            e.preventDefault();
        });

        productViewer.addEventListener('mouseup', (e) => {
            if (!isMouseDragging) return;
            isMouseDragging = false;
            productViewer.style.cursor = 'grab';

            const deltaX = e.clientX - mouseStartX;

            if (Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    // Drag right - previous view
                    const newIndex = (currentViewIndex - 1 + views.length) % views.length;
                    switchToView(newIndex);
                } else {
                    // Drag left - next view
                    const newIndex = (currentViewIndex + 1) % views.length;
                    switchToView(newIndex);
                }
            }
        });

        productViewer.addEventListener('mouseleave', () => {
            isMouseDragging = false;
            productViewer.style.cursor = 'grab';
        });

        // Set initial cursor
        productViewer.style.cursor = 'grab';

        // Keyboard navigation
        productViewer.setAttribute('tabindex', '0');
        productViewer.addEventListener('keydown', (e) => {
            switch (e.key) {
            case 'ArrowLeft': {
                const prevIndex = (currentViewIndex - 1 + views.length) % views.length;
                switchToView(prevIndex);
                e.preventDefault();
                break;
            }
            case 'ArrowRight': {
                const nextIndex = (currentViewIndex + 1) % views.length;
                switchToView(nextIndex);
                e.preventDefault();
                break;
            }
            }
        });
    }

    // Enhanced Size Selector with Smooth Transitions
    const sizeTabs = document.querySelectorAll('.size-tab');
    const sizeSelector = document.querySelector('.size-selector');

    function switchToSize(targetSize) {
        // Add transition indicator
        if (sizeSelector) {
            sizeSelector.classList.add('transitioning');
        }

        // Update tabs with staggered animation
        sizeTabs.forEach((tab, index) => {
            tab.classList.remove('active');
            if (tab.dataset.size === targetSize) {
                setTimeout(() => {
                    tab.classList.add('active');
                }, index * 50);
            }
        });

        // Smooth pane transition
        const currentPane = document.querySelector('.size-pane.active');
        const targetPane = document.querySelector(`[data-size="${targetSize}"]`);

        if (currentPane && targetPane && currentPane !== targetPane) {
            // Fade out current pane
            currentPane.style.opacity = '0';
            currentPane.style.transform = 'translateY(20px)';

            setTimeout(() => {
                currentPane.classList.remove('active');
                targetPane.classList.add('active');

                // Fade in target pane
                requestAnimationFrame(() => {
                    targetPane.style.opacity = '1';
                    targetPane.style.transform = 'translateY(0)';
                });

                // Remove transition indicator
                setTimeout(() => {
                    if (sizeSelector) {
                        sizeSelector.classList.remove('transitioning');
                    }
                }, 300);
            }, 300);
        }
    }

    sizeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetSize = this.dataset.size;
            switchToSize(targetSize);
        });

        // Add hover effect for better UX
        tab.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-2px) scale(1.02)';
                this.style.boxShadow = 'var(--shadow-lg)';
            }
        });

        tab.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = '';
                this.style.boxShadow = '';
            }
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

    // Enhanced Scroll Reveal Animation System
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered delay for sibling elements
                const siblingElements = [...entry.target.parentNode.children].filter(el =>
                    el.classList.contains('scroll-reveal'));
                const elementIndex = siblingElements.indexOf(entry.target);

                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, elementIndex * 100); // 100ms stagger delay

                // Optional: unobserve after revealing
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    scrollRevealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // Intersection Observer for Animations (Legacy support)
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

    // Before/After Comparison Slider
    const comparisonContainer = document.querySelector('.comparison-container');
    const afterImage = document.querySelector('.after-image');
    const sliderHandle = document.querySelector('.slider-handle');
    const sliderLine = document.querySelector('.slider-line');

    // Slider helper functions
    const updateSlider = (percentage) => {
        // Clamp percentage between 0 and 100
        percentage = Math.max(0, Math.min(100, percentage));

        // Update clip-path for after image
        afterImage.style.clipPath = `polygon(${percentage}% 0%, 100% 0%, 100% 100%, ${percentage}% 100%)`;

        // Update handle and line position
        sliderHandle.style.left = `${percentage}%`;
        sliderLine.style.left = `${percentage}%`;
    };

    const getPercentageFromEvent = (e) => {
        const rect = comparisonContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        return (x / rect.width) * 100;
    };

    if (comparisonContainer && afterImage && sliderHandle && sliderLine) {
        let isSliding = false;

        // Mouse events
        sliderHandle.addEventListener('mousedown', (e) => {
            isSliding = true;
            e.preventDefault();
        });

        comparisonContainer.addEventListener('mousemove', (e) => {
            if (isSliding) {
                const percentage = getPercentageFromEvent(e);
                updateSlider(percentage);
            }
        });

        comparisonContainer.addEventListener('click', (e) => {
            if (!isSliding) {
                const percentage = getPercentageFromEvent(e);
                updateSlider(percentage);
            }
        });

        document.addEventListener('mouseup', () => {
            isSliding = false;
        });

        // Touch events for mobile
        sliderHandle.addEventListener('touchstart', (e) => {
            isSliding = true;
            e.preventDefault();
        });

        comparisonContainer.addEventListener('touchmove', (e) => {
            if (isSliding) {
                const touch = e.touches[0];
                const rect = comparisonContainer.getBoundingClientRect();
                const x = touch.clientX - rect.left;
                const percentage = (x / rect.width) * 100;
                updateSlider(percentage);
                e.preventDefault();
            }
        });

        document.addEventListener('touchend', () => {
            isSliding = false;
        });

        // Keyboard accessibility
        sliderHandle.setAttribute('tabindex', '0');
        sliderHandle.setAttribute('role', 'slider');
        sliderHandle.setAttribute('aria-valuemin', '0');
        sliderHandle.setAttribute('aria-valuemax', '100');
        sliderHandle.setAttribute('aria-valuenow', '50');
        sliderHandle.setAttribute('aria-label', 'Comparison slider');

        sliderHandle.addEventListener('keydown', (e) => {
            let currentPercentage = parseFloat(sliderHandle.style.left) || 50;

            switch (e.key) {
            case 'ArrowLeft': {
                currentPercentage -= 5;
                updateSlider(currentPercentage);
                sliderHandle.setAttribute('aria-valuenow', Math.round(currentPercentage));
                e.preventDefault();
                break;
            }
            case 'ArrowRight': {
                currentPercentage += 5;
                updateSlider(currentPercentage);
                sliderHandle.setAttribute('aria-valuenow', Math.round(currentPercentage));
                e.preventDefault();
                break;
            }
            }
        });
    }

    // Interactive Technology Hotspots
    const hotspots = document.querySelectorAll('.hotspot');
    const tooltip = document.getElementById('tech-tooltip');
    const tooltipContent = tooltip.querySelector('.tooltip-content');

    hotspots.forEach(hotspot => {
        hotspot.addEventListener('mouseenter', function() {
            const tooltipText = this.dataset.tooltip;
            tooltipContent.textContent = tooltipText;

            // Position tooltip
            const rect = this.getBoundingClientRect();
            const svgRect = this.closest('.cavitation-svg').getBoundingClientRect();

            tooltip.style.left = `${rect.left - svgRect.left + rect.width / 2}px`;
            tooltip.style.top = `${rect.top - svgRect.top - 10}px`;
            tooltip.classList.add('show');
        });

        hotspot.addEventListener('mouseleave', function() {
            tooltip.classList.remove('show');
        });
    });

    // Bubble Animation Enhancement
    const bubbles = document.querySelectorAll('.bubble');

    bubbles.forEach((bubble) => {
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

    // Advanced Particle System
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas?.getContext('2d');
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;
    let animationId;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Particle system helper functions
    const resizeCanvas = () => {
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    };

    const createParticle = () => {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.6 + 0.2,
            color: `hsla(${190 + Math.random() * 30}, 70%, 60%, ${Math.random() * 0.4 + 0.2})`,
            life: Math.random() * 100 + 50,
            maxLife: 150,
            connections: 0
        };
    };

    const initParticles = () => {
        particles = [];
        const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }
    };

    const updateParticle = (particle) => {
        // Mouse interaction
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
            const force = (100 - distance) / 100;
            particle.vx += (dx / distance) * force * 0.01;
            particle.vy += (dy / distance) * force * 0.01;
        }

        // Physics
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Boundaries with wrapping
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Life cycle
        particle.life--;
        if (particle.life <= 0) {
            Object.assign(particle, createParticle());
        }

        // Opacity based on life
        const lifeRatio = particle.life / particle.maxLife;
        particle.opacity = Math.max(0.1, lifeRatio * 0.6);
    };

    const drawParticle = (particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();

        // Add subtle glow effect
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = particle.size * 2;
        ctx.fill();
        ctx.shadowBlur = 0;
    };

    const drawConnections = () => {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    const opacity = (120 - distance) / 120 * 0.2;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 180, 216, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    };

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        particles.forEach(particle => {
            updateParticle(particle);
            drawParticle(particle);
        });

        // Draw connections between nearby particles
        drawConnections();

        animationId = requestAnimationFrame(animate);
    };

    if (canvas && ctx && !prefersReducedMotion) {

        // Mouse tracking for particle interaction
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        });

        // Initialize and start
        resizeCanvas();
        initParticles();
        animate();

        // Handle resize
        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });

        // Cleanup on page unload
        window.addEventListener('beforeunload', () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        });
    }

    // Initialize on page load - could add initialization logging here if needed
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
        navigator.serviceWorker.register('/sw.js').then(function(_registration) {
            // ServiceWorker registration successful - could add success handling here
        }, function(err) {
            // ServiceWorker registration failed - could add error handling here
            console.warn('ServiceWorker registration failed: ', err);
        });
    });
}
