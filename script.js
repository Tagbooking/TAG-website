// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const contactForm = document.getElementById('contactForm');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const floatingBtn = document.getElementById('floatingBtn');
    const progressBar = document.querySelector('.progress-bar');

    // Mobile Navigation Toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.toggle('active');
            }
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });
    }

    // Close mobile menu when clicking on overlay
    if (mobileMenuOverlay && hamburger && navMenu) {
        mobileMenuOverlay.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Close mobile menu when clicking on nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.remove('active');
            }
            document.body.style.overflow = 'auto';
        });
    });

    // Let browser handle anchor navigation naturally
    // Removed smooth scrolling to prevent navigation issues

    // Navbar Scroll Effect and Progress Bar
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // Update progress bar
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }
        
        // Navbar scroll effect
        if (navbar) {
            if (scrollTop > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        // Update active navigation link
        updateActiveNavLink();
    });

    // Update Active Navigation Link
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Floating Action Button
    if (floatingBtn) {
        floatingBtn.addEventListener('click', () => {
            floatingBtn.classList.toggle('active');
        });

        // Close floating menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!floatingBtn.contains(e.target)) {
                floatingBtn.classList.remove('active');
            }
        });
    }

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
            }
        });
    }, observerOptions);

    // Elements to animate on scroll
    const animateElements = document.querySelectorAll('.about-card, .service-card, .gallery-item, .contact-item, .stat-item');
    animateElements.forEach(el => {
        if (el) {
            observer.observe(el);
        }
    });

    // Stats Counter Animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber && !statNumber.classList.contains('animated')) {
                    statNumber.classList.add('animated');
                    const finalValue = statNumber.textContent;
                    
                    // Extract number and suffix
                    const match = finalValue.match(/(\d+)(\+|%|K\+)?/);
                    if (match) {
                        const targetNumber = parseInt(match[1]);
                        const suffix = match[2] || '';
                        
                        // Animate counter
                        animateCounter(statNumber, targetNumber, suffix);
                    }
                }
            }
        });
    }, { threshold: 0.5 });

    // Observe stat items
    document.querySelectorAll('.stat-item').forEach(item => {
        if (item) {
            statsObserver.observe(item);
        }
    });

    // Gallery Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // Gallery Image Hover Effect
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotateY(5deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotateY(0deg)';
        });
    });

    // Lightbox Functionality
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');

    const galleryData = [
        {
            src: 'images/c37c1cd9d11ab968e79d8602f4dda05c.jpg',
            title: 'Game in Action',
            description: 'Intense sports moments captured on our premium turfs'
        },
        {
            src: 'images/56b5ff42f7e2f51e143d6ecd6f585f1b.jpg',
            title: 'Community Events',
            description: 'Building connections through sports and teamwork'
        },
        {
            src: 'images/a4c0fdcf45d6f0bdcc12124471c3a38e.jpg',
            title: 'Premium Turf',
            description: 'Quality facilities designed for optimal performance'
        },
        {
            src: 'images/424a17359ec7bbbd0925f13b6f52a045.jpg',
            title: 'Tournaments',
            description: 'Competitive spirit and athletic excellence'
        },
        {
            src: 'images/6cd6673b801641aa00c1522f11f2ae63.jpg',
            title: 'Athletic Excellence',
            description: 'Peak performance moments on our world-class turfs'
        },
        {
            src: 'images/19a030f68a16d23ab618802d1b1db5c0.jpg',
            title: 'Team Spirit',
            description: 'Unity in sports - where champions are made'
        }
    ];

    let currentImageIndex = 0;

    // Make lightbox functions global so they can be called from HTML
    window.openLightbox = function(index) {
        currentImageIndex = index;
        const imageData = galleryData[index];
        
        if (lightboxImage && lightboxTitle && lightboxDescription && lightboxModal) {
            lightboxImage.src = imageData.src;
            lightboxImage.alt = imageData.title;
            lightboxTitle.textContent = imageData.title;
            lightboxDescription.textContent = imageData.description;
            
            lightboxModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeLightbox = function() {
        if (lightboxModal) {
            lightboxModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };

    window.nextImage = function() {
        currentImageIndex = (currentImageIndex + 1) % galleryData.length;
        window.openLightbox(currentImageIndex);
    };

    window.prevImage = function() {
        currentImageIndex = (currentImageIndex - 1 + galleryData.length) % galleryData.length;
        window.openLightbox(currentImageIndex);
    };

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        if (lightboxModal && lightboxModal.classList.contains('active')) {
            if (e.key === 'Escape') {
                window.closeLightbox();
            } else if (e.key === 'ArrowRight') {
                window.nextImage();
            } else if (e.key === 'ArrowLeft') {
                window.prevImage();
            }
        }
    });

    // Heart button functionality
    document.querySelectorAll('.gallery-btn').forEach(btn => {
        if (btn.querySelector('.fa-heart')) {
            btn.addEventListener('click', function() {
                const heart = this.querySelector('.fa-heart');
                if (heart.classList.contains('fas')) {
                    heart.classList.remove('fas');
                    heart.classList.add('far');
                    this.style.color = 'var(--primary-green)';
                } else {
                    heart.classList.remove('far');
                    heart.classList.add('fas');
                    this.style.color = '#ff4757';
                }
            });
        }
    });

    // Contact Form Handling
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                turfName: formData.get('turfName'),
                phone: formData.get('phone'),
                message: formData.get('message')
            };
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Reset form
                this.reset();
                
                // Show success message
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Form Field Animation
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        field.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if field has value on load
        if (field.value !== '') {
            field.parentElement.classList.add('focused');
        }
    });

    // 3D Hover Effect for Cards
    document.querySelectorAll('.about-card, .service-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });

    // Initialize floating elements
    createFloatingElements();

    // Initialize cursor trail on desktop
    if (window.innerWidth > 768) {
        initializeCursorTrail();
    }

    // Console welcome message
    console.log('%c🏆 Welcome to TAG - Turf And Ground! 🏆', 'color: #00ff88; font-size: 20px; font-weight: bold;');
    console.log('%cTag Your Turf. Grow Your Game.', 'color: #00cc6a; font-size: 16px;');
    console.log('%cWebsite crafted with ❤️ and modern web technologies', 'color: #666; font-size: 14px;');
});

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="close-btn">&times;</button>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--primary-green)' : '#007bff'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease-out;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Scroll-triggered Counter Animation
function animateCounter(element, target, suffix = '', duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.round(current) + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + suffix;
        }
    };
    
    updateCounter();
}

// Dynamic background for hero section
function createFloatingElements() {
    const hero = document.querySelector('.hero-background');
    if (!hero) return;
    
    for (let i = 0; i < 20; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: rgba(0, 255, 136, ${Math.random() * 0.5 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 6 + 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(element);
    }
}

// Cursor Trail Effect
function initializeCursorTrail() {
    let mouseX = 0;
    let mouseY = 0;
    let trailElements = [];

    function createTrailElement() {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--primary-green);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0.7;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(trail);
        return trail;
    }

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create trail element
        const trail = createTrailElement();
        trail.style.left = mouseX + 'px';
        trail.style.top = mouseY + 'px';
        
        trailElements.push(trail);
        
        // Remove trail after animation
        setTimeout(() => {
            trail.style.opacity = '0';
            setTimeout(() => {
                if (trail.parentNode) {
                    trail.remove();
                }
            }, 300);
        }, 100);
        
        // Limit trail elements
        if (trailElements.length > 20) {
            const oldTrail = trailElements.shift();
            if (oldTrail && oldTrail.parentNode) {
                oldTrail.remove();
            }
        }
    });
}

// Loading Screen
window.addEventListener('load', function() {
    const loadingScreen = document.querySelector('.loading');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }
});

// Add loading screen HTML
const loadingHTML = `
    <div class="loading">
        <div class="loading-spinner"></div>
    </div>
`;

// Add loading screen on page load
if (!document.querySelector('.loading')) {
    document.body.insertAdjacentHTML('afterbegin', loadingHTML);
}

// Performance optimization
let ticking = false;

function updateAnimations() {
    // Update any ongoing animations here
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
}

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Removed smooth page transitions to prevent navigation issues
// Let browser handle all link navigation naturally

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Add notification animations to CSS
const notificationStyles = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .notification .close-btn {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        margin-left: auto;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    }
    
    .notification .close-btn:hover {
        opacity: 1;
    }
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Add form field focus styles
const formStyles = `
    .form-group.focused label {
        color: var(--primary-green);
        font-weight: 600;
    }
    
    .form-group.focused input,
    .form-group.focused textarea {
        border-color: var(--primary-green);
        box-shadow: 0 0 0 3px rgba(0, 255, 136, 0.2);
    }
`;

const formStyleSheet = document.createElement('style');
formStyleSheet.textContent = formStyles;
document.head.appendChild(formStyleSheet); 