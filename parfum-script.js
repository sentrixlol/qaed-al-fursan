/* ========================================
   QAED AL FURSAN - Modern JavaScript
   Preview-only interactions
======================================== */

// Initialize all components
document.addEventListener('DOMContentLoaded', function() {
    initializeThumbnails();
    initializeNewsletter();
    initializeSmoothScroll();
    initializeActiveNav();
    initializeMobileMenu();
    initializeScrollAnimations();
});

// Product Image Thumbnails
function initializeThumbnails() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.main-image img');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Update main image
            if (mainImage) {
                mainImage.src = this.src;
                mainImage.style.opacity = '0';
                setTimeout(() => {
                    mainImage.style.transition = 'opacity 0.3s ease';
                    mainImage.style.opacity = '1';
                }, 50);
            }
        });
    });
}

// Newsletter Form
function initializeNewsletter() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const input = this.querySelector('.newsletter-input');
        const email = input.value;
        
        if (email) {
            showNotification('Vielen Dank! Sie wurden erfolgreich angemeldet.');
            input.value = '';
        }
    });
}

// Smooth Scrolling
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Active Navigation Highlight
function initializeActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Mobile Menu Toggle
function initializeMobileMenu() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileBtn) return;
    
    mobileBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        
        if (navLinks) {
            if (window.innerWidth <= 768) {
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
                
                if (navLinks.style.display === 'flex') {
                    navLinks.style.position = 'absolute';
                    navLinks.style.top = '100%';
                    navLinks.style.left = '0';
                    navLinks.style.right = '0';
                    navLinks.style.background = 'white';
                    navLinks.style.flexDirection = 'column';
                    navLinks.style.padding = '2rem';
                    navLinks.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                    navLinks.style.zIndex = '999';
                }
            }
        }
    });
    
    // Close mobile menu on link click
    if (navLinks) {
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                    mobileBtn.classList.remove('active');
                }
            });
        });
    }
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animate collection cards
    document.querySelectorAll('.collection-card, .note-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Notification System
function showNotification(message) {
    // Remove existing notification
    const existing = document.querySelector('.custom-notification');
    if (existing) existing.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'custom-notification';
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem;">
            <span style="font-size: 1.5rem;">✓</span>
            <p style="margin: 0;">${message}</p>
        </div>
    `;
    
    // Styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: #000;
        color: white;
        padding: 1.25rem 1.75rem;
        border-radius: 8px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.4s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// Search Button
const searchBtn = document.querySelector('.search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', function() {
        showNotification('Suchfunktion in Entwicklung');
    });
}

// Add keyframe animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

console.log('✨ Qaed Al Fursan - Website geladen');
