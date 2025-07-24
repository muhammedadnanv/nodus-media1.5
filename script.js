// Mobile menu functionality
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    
    if (mobileNav.style.display === 'none' || mobileNav.style.display === '') {
        mobileNav.style.display = 'flex';
        menuIcon.style.display = 'none';
        closeIcon.style.display = 'inline';
    } else {
        mobileNav.style.display = 'none';
        menuIcon.style.display = 'inline';
        closeIcon.style.display = 'none';
    }
}

function closeMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    
    mobileNav.style.display = 'none';
    menuIcon.style.display = 'inline';
    closeIcon.style.display = 'none';
}

// Smooth scrolling functionality
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Contact form functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                company: formData.get('company'),
                service: formData.get('service'),
                message: formData.get('message')
            };
            
            // Basic validation
            if (!data.name || !data.email || !data.service || !data.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission
            console.log('Form submitted:', data);
            alert('Thank you for your inquiry! We\'ll get back to you within 24 hours.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const mobileNav = document.getElementById('mobileNav');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const header = document.querySelector('.header');
        
        if (mobileNav && mobileNav.style.display === 'flex') {
            if (!header.contains(e.target)) {
                closeMobileMenu();
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const mobileNav = document.getElementById('mobileNav');
        if (window.innerWidth > 768 && mobileNav) {
            closeMobileMenu();
        }
    });
    
    // Add scroll effect to header
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove background opacity based on scroll
        if (scrollTop > 100) {
            header.style.backgroundColor = 'rgba(254, 253, 251, 0.98)';
        } else {
            header.style.backgroundColor = 'rgba(254, 253, 251, 0.95)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.value-card, .service-card, .contact-info-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add hover effects for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        
        if (heroImage && scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
    
    // Form input animations
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.style.borderColor = 'var(--ring)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
            this.style.borderColor = 'var(--border)';
        });
    });
    
    // Add loading states for form submission
    const submitBtn = document.querySelector('.form-submit');
    if (submitBtn) {
        const originalText = submitBtn.textContent;
        
        contactForm.addEventListener('submit', function() {
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Add typewriter effect to hero title (optional enhancement)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Uncomment the following lines to enable typewriter effect
    // const heroTitle = document.querySelector('.hero-title');
    // if (heroTitle) {
    //     const titleText = heroTitle.textContent;
    //     typeWriter(heroTitle, titleText, 50);
    // }
});

// Utility functions
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

// Add debounced scroll handler for performance
const debouncedScrollHandler = debounce(function() {
    // Any heavy scroll operations can go here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Service worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when you have a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(function(registration) {
        //         console.log('ServiceWorker registration successful');
        //     })
        //     .catch(function(err) {
        //         console.log('ServiceWorker registration failed');
        //     });
    });
}

// Analytics placeholder (replace with your preferred analytics solution)
function trackEvent(eventName, eventData) {
    console.log('Event tracked:', eventName, eventData);
    // Replace with actual analytics tracking
    // gtag('event', eventName, eventData);
}

// Track button clicks
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn')) {
        trackEvent('button_click', {
            button_text: e.target.textContent.trim(),
            page_location: window.location.href
        });
    }
});

// Track form submissions
document.addEventListener('submit', function(e) {
    if (e.target.matches('#contactForm')) {
        trackEvent('form_submit', {
            form_name: 'contact_form',
            page_location: window.location.href
        });
    }
});