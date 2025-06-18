// Common JavaScript functionality for Anderson Plumbing website

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu functionality
    function initMobileMenu() {
        const menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-btn';
        menuButton.innerHTML = '☰';
        menuButton.style.display = 'none';
        
        const header = document.querySelector('.header');
        const nav = document.querySelector('.main-nav');
        
        if (header && nav) {
            header.appendChild(menuButton);
            
            menuButton.addEventListener('click', function() {
                nav.classList.toggle('mobile-nav-open');
            });
        }
    }
    
    // Phone number click functionality
    function initPhoneNumbers() {
        const phoneButtons = document.querySelectorAll('.phone-btn');
        const phoneNumbers = document.querySelectorAll('.phone-number, .footer-phone');
        
        phoneButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const phoneNumber = this.textContent.replace(/\D/g, '');
                window.location.href = `tel:+1${phoneNumber}`;
            });
        });
        
        phoneNumbers.forEach(phone => {
            phone.style.cursor = 'pointer';
            phone.addEventListener('click', function() {
                const phoneNumber = this.textContent.replace(/\D/g, '');
                window.location.href = `tel:+1${phoneNumber}`;
            });
        });
    }
    
    // Chat widget functionality
    function initChatWidget() {
        const chatWidget = document.querySelector('.chat-widget');
        
        if (chatWidget) {
            chatWidget.addEventListener('click', function() {
                // Simulate chat functionality
                alert('Chat functionality would be implemented here.');
            });
        }
    }
    
    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Header scroll effect
    function initHeaderScrollEffect() {
        const header = document.querySelector('.header');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // Financing banner close functionality
    function initFinancingBanner() {
        const financingBanner = document.querySelector('.financing-banner');
        
        if (financingBanner) {
            // Add close button
            const closeButton = document.createElement('button');
            closeButton.innerHTML = '×';
            closeButton.className = 'banner-close';
            closeButton.style.cssText = `
                background: none;
                border: none;
                font-size: 20px;
                cursor: pointer;
                padding: 0 10px;
                color: #666;
            `;
            
            financingBanner.appendChild(closeButton);
            
            closeButton.addEventListener('click', function() {
                financingBanner.style.display = 'none';
            });
        }
    }
    
    // Form validation helper
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function validatePhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/\D/g, ''));
    }
    
    // Initialize all functionality
    initMobileMenu();
    initScheduleButtons();
    initPhoneNumbers();
    initChatWidget();
    initSmoothScrolling();
    initHeaderScrollEffect();
    initFinancingBanner();
        
    // Make validation functions available globally
    window.validateEmail = validateEmail;
    window.validatePhone = validatePhone;
    
    // Analytics tracking simulation
    function trackEvent(action, category, label) {
        console.log(`Analytics Event: ${category} - ${action} - ${label}`);
        // Real implementation would send to Google Analytics or other service
    }
    
    // Track button clicks
    document.addEventListener('click', function(e) {
        if (e.target.matches('.phone-btn')) {
            trackEvent('click', 'CTA', 'Phone Call');
        } else if (e.target.matches('.chat-widget')) {
            trackEvent('click', 'Support', 'Chat Widget');
        }
    });
    
    console.log('AGP Plumbing website loaded successfully');

    function initMobileMenu() {
        const menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-btn';
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        
        const header = document.querySelector('.header');
        const nav = document.querySelector('.main-nav');
        
        if (header && nav) {
            header.insertBefore(menuButton, nav);
            
            menuButton.addEventListener('click', function() {
                nav.classList.toggle('mobile-nav-open');
                menuButton.classList.toggle('active');
                // Toggle between hamburger and close icons
                menuButton.innerHTML = menuButton.classList.contains('active') 
                    ? '<i class="fas fa-times"></i>' 
                    : '<i class="fas fa-bars"></i>';
            });
        }
    }
});