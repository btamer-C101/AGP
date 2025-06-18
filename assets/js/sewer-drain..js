// Sewer & Drain page specific JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // Sewer & Drain hero animation
    function initSewerDrainHeroAnimation() {
        const heroContent = document.querySelector('.sewer-drain-hero-content');
        
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                heroContent.style.transition = 'all 1s ease';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 300);
        }
    }
    
    // Services overview animation
    function initOverviewAnimation() {
        const overviewText = document.querySelector('.overview-text');
        const overviewImage = document.querySelector('.overview-image');
        
        if (overviewText && overviewImage) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, {
                threshold: 0.2
            });
            
            // Set initial styles
            overviewText.style.opacity = '0';
            overviewText.style.transform = 'translateY(30px)';
            overviewText.style.transition = 'all 0.8s ease';
            
            overviewImage.style.opacity = '0';
            overviewImage.style.transform = 'translateX(30px)';
            overviewImage.style.transition = 'all 0.8s ease 0.2s';
            
            observer.observe(overviewText);
            observer.observe(overviewImage);
        }
    }
    
    // Service cards staggered animation
    function initServiceCardsAnimation() {
        const serviceItems = document.querySelectorAll('.service-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, {
            threshold: 0.1
        });
        
        serviceItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.6s ease';
            observer.observe(item);
        });
    }
    
    // Enhanced service card hover effects
    function initServiceCardHover() {
        const serviceItems = document.querySelectorAll('.service-item');
        
        serviceItems.forEach(item => {
            const icon = item.querySelector('.service-icon');
            const title = item.querySelector('h3');
            
            item.addEventListener('mouseenter', function() {
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                    icon.style.transition = 'transform 0.3s ease';
                }
                
                // Add ripple effect
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    background: rgba(13, 110, 253, 0.3);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 600);
            });
            
            item.addEventListener('mouseleave', function() {
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
    }
    
    // Emergency services special effects
    function initEmergencyEffects() {
        const emergencyBtn = document.querySelector('.emergency-btn');
        const emergencyItems = document.querySelectorAll('.service-item');
        
        // Highlight emergency services
        emergencyItems.forEach(item => {
            const title = item.querySelector('h3');
            if (title && title.textContent.toLowerCase().includes('emergency')) {
                item.style.border = '2px solid #ff6b6b';
                item.style.boxShadow = '0 0 20px rgba(255, 107, 107, 0.3)';
                
                // Pulsing effect
                setInterval(() => {
                    item.style.boxShadow = '0 0 30px rgba(255, 107, 107, 0.5)';
                    setTimeout(() => {
                        item.style.boxShadow = '0 0 20px rgba(255, 107, 107, 0.3)';
                    }, 1000);
                }, 2000);
            }
        });
        
        // Emergency button click tracking
        if (emergencyBtn) {
            emergencyBtn.addEventListener('click', function() {
                // Track emergency call
                console.log('Emergency service call initiated');
                
                // Show confirmation dialog
                const confirmCall = confirm(
                    'You are about to call our emergency line. ' +
                    'Emergency services are available 24/7. Continue?'
                );
                
                if (!confirmCall) {
                    event.preventDefault();
                }
            });
        }
    }
    
    // Emergency section animation
    function initEmergencyAnimation() {
        const emergencyText = document.querySelector('.emergency-text');
        const emergencyImage = document.querySelector('.emergency-image');
        
        if (emergencyText && emergencyImage) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, {
                threshold: 0.2
            });
            
            emergencyText.style.opacity = '0';
            emergencyText.style.transform = 'translateY(30px)';
            emergencyText.style.transition = 'all 0.8s ease';
            
            emergencyImage.style.opacity = '0';
            emergencyImage.style.transform = 'translateX(30px)';
            emergencyImage.style.transition = 'all 0.8s ease 0.2s';
            
            observer.observe(emergencyText);
            observer.observe(emergencyImage);
        }
    }
    
    // Service category color coding
    function initServiceCategoryColors() {
        const drainServices = document.querySelector('.drain-services .services-grid');
        const sewerServices = document.querySelector('.sewer-services .services-grid');
        const specializedServices = document.querySelector('.specialized-services .services-grid');
        
        // Add category-specific styling
        if (drainServices) {
            drainServices.classList.add('drain-category');
        }
        
        if (sewerServices) {
            sewerServices.classList.add('sewer-category');
        }
        
        if (specializedServices) {
            specializedServices.classList.add('specialized-category');
        }
    }
    
    // Parallax effect for hero section
    function initParallaxEffect() {
        const sewerDrainHero = document.querySelector('.sewer-drain-hero');
        
        if (sewerDrainHero) {
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const parallaxSpeed = 0.3;
                
                sewerDrainHero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            });
        }
    }
    
    // Scroll progress indicator
    function initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #28a745, #17a2b8, #ffc107);
            z-index: 9999;
            transition: width 0.3s ease;
        `;
        
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', function() {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.pageYOffset / windowHeight) * 100;
            
            progressBar.style.width = scrolled + '%';
        });
    }
    
    // CTA section animation
    function initCTAAnimation() {
        const ctaContent = document.querySelector('.cta-content');
        
        if (ctaContent) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, {
                threshold: 0.3
            });
            
            ctaContent.style.opacity = '0';
            ctaContent.style.transform = 'translateY(30px)';
            ctaContent.style.transition = 'all 0.8s ease';
            
            observer.observe(ctaContent);
        }
    }
    
    // Feature icons animation
    function initFeatureIconsAnimation() {
        const features = document.querySelectorAll('.feature');
        
        features.forEach((feature, index) => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateX(0)';
                        }, index * 100);
                    }
                });
            });
            
            feature.style.opacity = '0';
            feature.style.transform = 'translateX(-20px)';
            feature.style.transition = 'all 0.5s ease';
            
            observer.observe(feature);
        });
    }
    
    // Button effects
    function initButtonEffects() {
        const buttons = document.querySelectorAll('.sewer-drain-hero .schedule-btn, .sewer-drain-hero .phone-btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
    
    // Add CSS animation for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                width: 100px;
                height: 100px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize all sewer & drain page functionality
    initSewerDrainHeroAnimation();
    initOverviewAnimation();
    initServiceCardsAnimation();
    initServiceCardHover();
    initEmergencyEffects();
    initEmergencyAnimation();
    initServiceCategoryColors();
    initParallaxEffect();
    initScrollProgress();
    initCTAAnimation();
    initFeatureIconsAnimation();
    initButtonEffects();
    
    console.log('Sewer & Drain page JavaScript initialized');
});