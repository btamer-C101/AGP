// Sewer Services page specific JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // Sewer Services hero animation
    function initSewerServicesHeroAnimation() {
        const heroContent = document.querySelector('.sewer-services-hero-content');
        
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
    
    // Service cards with category-specific animations
    function initServiceCardsAnimation() {
        const serviceItems = document.querySelectorAll('.service-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        
                        // Add category-specific entrance effect
                        const section = entry.target.closest('section');
                        if (section.classList.contains('sewer-installation')) {
                            entry.target.style.borderColor = '#007bff';
                        } else if (section.classList.contains('sewer-repair')) {
                            entry.target.style.borderColor = '#dc3545';
                        } else if (section.classList.contains('sewer-maintenance')) {
                            entry.target.style.borderColor = '#28a745';
                        } else if (section.classList.contains('specialized-sewer')) {
                            entry.target.style.borderColor = '#6f42c1';
                        }
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
    
    // Technology items special animation
    function initTechItemsAnimation() {
        const techItems = document.querySelectorAll('.tech-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                        
                        // Add tech-specific glow effect
                        entry.target.style.boxShadow = '0 10px 30px rgba(23, 162, 184, 0.3)';
                    }, index * 200);
                }
            });
        }, {
            threshold: 0.1
        });
        
        techItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(40px) scale(0.9)';
            item.style.transition = 'all 0.8s ease';
            observer.observe(item);
        });
    }
    
    // Enhanced service card hover effects
    function initServiceCardHover() {
        const serviceItems = document.querySelectorAll('.service-item');
        
        serviceItems.forEach(item => {
            const icon = item.querySelector('.service-icon');
            
            item.addEventListener('mouseenter', function() {
                if (icon) {
                    icon.style.transform = 'scale(1.2) rotate(10deg)';
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
                    background: rgba(255,255,255,0.3);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    animation: sewerRipple 0.8s ease-out;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 800);
            });
            
            item.addEventListener('mouseleave', function() {
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
    }
    
    // Technology items hover effects
    function initTechItemHover() {
        const techItems = document.querySelectorAll('.tech-item');
        
        techItems.forEach(item => {
            const icon = item.querySelector('.tech-icon');
            
            item.addEventListener('mouseenter', function() {
                if (icon) {
                    icon.style.transform = 'scale(1.15) rotate(360deg)';
                    icon.style.transition = 'transform 0.6s ease';
                }
                
                // Add tech glow effect
                this.style.boxShadow = '0 15px 40px rgba(23, 162, 184, 0.5), 0 0 30px rgba(23, 162, 184, 0.3)';
            });
            
            item.addEventListener('mouseleave', function() {
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
                this.style.boxShadow = '0 10px 30px rgba(23, 162, 184, 0.3)';
            });
        });
    }
    
    // Emergency services special effects
    function initEmergencyEffects() {
        const emergencyBtn = document.querySelector('.emergency-btn');
        const emergencySection = document.querySelector('.emergency-sewer-services');
        
        // Enhanced emergency button effects
        if (emergencyBtn) {
            emergencyBtn.addEventListener('mouseenter', function() {
                this.style.animation = 'none';
                this.style.background = '#ff5252';
                this.style.transform = 'scale(1.05)';
                this.style.boxShadow = '0 8px 25px rgba(255, 107, 107, 0.8)';
            });
            
            emergencyBtn.addEventListener('mouseleave', function() {
                this.style.animation = 'emergencyPulse 2s infinite';
                this.style.background = '#ff6b6b';
                this.style.transform = 'scale(1)';
            });
            
            emergencyBtn.addEventListener('click', function(e) {
                // Add dramatic click effect
                const clickEffect = document.createElement('div');
                clickEffect.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    background: rgba(255,255,255,0.9);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    animation: emergencyClick 0.8s ease-out;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.appendChild(clickEffect);
                
                setTimeout(() => {
                    if (clickEffect.parentNode) {
                        clickEffect.parentNode.removeChild(clickEffect);
                    }
                }, 800);
                
                // Confirm emergency call
                const confirmCall = confirm(
                    '🚨 EMERGENCY SEWER SERVICE 🚨\n\n' +
                    'You are about to call our emergency sewer line.\n' +
                    'This is for urgent sewer system failures only.\n\n' +
                    'Our emergency team is standing by 24/7.\n' +
                    'Continue with emergency call?'
                );
                
                if (!confirmCall) {
                    e.preventDefault();
                }
            });
        }
        
        // Emergency section entrance animation
        if (emergencySection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.background = '#1a1a1a';
                        entry.target.style.boxShadow = 'inset 0 0 100px rgba(255, 107, 107, 0.1)';
                        entry.target.style.transition = 'all 1s ease';
                    }
                });
            }, {
                threshold: 0.3
            });
            
            observer.observe(emergencySection);
        }
    }
    
    // Emergency section animation
    function initEmergencyAnimation() {
        const emergencyText = document.querySelector('.emergency-text');
        const emergencyImage = document.querySelector('.emergency-image');
        const emergencyFeatures = document.querySelectorAll('.feature');
        const emergencyList = document.querySelectorAll('.emergency-situations li');
        
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
        
        // Animate features with sewer-specific icons
        emergencyFeatures.forEach((feature, index) => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateX(0)';
                            
                            // Add feature-specific glow
                            const icon = entry.target.querySelector('.feature-icon');
                            if (icon) {
                                icon.style.textShadow = '0 0 10px #17a2b8';
                            }
                        }, index * 150);
                    }
                });
            });
            
            feature.style.opacity = '0';
            feature.style.transform = 'translateX(-30px)';
            feature.style.transition = 'all 0.5s ease';
            
            observer.observe(feature);
        });
        
        // Animate emergency list items with sewer emojis
        emergencyList.forEach((item, index) => {
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
            
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'all 0.4s ease';
            
            observer.observe(item);
        });
    }
    
    // Service category highlighting with sewer-specific colors
    function initServiceCategoryHighlighting() {
        const sections = document.querySelectorAll('.sewer-installation, .sewer-repair, .sewer-maintenance, .specialized-sewer');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Remove active class from all sections
                    sections.forEach(section => section.classList.remove('active-section'));
                    // Add active class to current section
                    entry.target.classList.add('active-section');
                }
            });
        }, {
            threshold: 0.3
        });
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    // Parallax effect for hero section
    function initParallaxEffect() {
        const sewerServicesHero = document.querySelector('.sewer-services-hero');
        
        if (sewerServicesHero) {
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const parallaxSpeed = 0.3;
                
                sewerServicesHero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            });
        }
    }
    
    // Scroll progress indicator with sewer theme colors
    function initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: #0D6EFD;
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
    
    // CTA section animation with enhanced effects
    function initCTAAnimation() {
        const ctaContent = document.querySelector('.cta-content');
        
        if (ctaContent) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        
                        // Add enhanced shine effect to CTA button
                        const ctaBtn = entry.target.querySelector('.schedule-btn');
                        if (ctaBtn) {
                            setTimeout(() => {
                                ctaBtn.style.position = 'relative';
                                ctaBtn.style.overflow = 'hidden';
                                
                                const shine = document.createElement('div');
                                shine.style.cssText = `
                                    position: absolute;
                                    top: 0;
                                    left: -100%;
                                    width: 100%;
                                    height: 100%;
                                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                                    animation: ctaShine 2.5s ease-in-out;
                                `;
                                
                                ctaBtn.appendChild(shine);
                                
                                setTimeout(() => {
                                    if (shine.parentNode) {
                                        shine.parentNode.removeChild(shine);
                                    }
                                }, 2500);
                            }, 500);
                        }
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
    
    // Button effects
    function initButtonEffects() {
        const buttons = document.querySelectorAll('.sewer-services-hero .schedule-btn, .sewer-services-hero .phone-btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.transition = 'transform 0.3s ease';
                this.style.boxShadow = '0 5px 15px rgba(23, 162, 184, 0.3)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
        });
    }
    
    // Service tracking with sewer-specific analytics
    function initServiceTracking() {
        const serviceItems = document.querySelectorAll('.service-item');
        const techItems = document.querySelectorAll('.tech-item');
        
        serviceItems.forEach(item => {
            item.addEventListener('click', function() {
                const serviceName = this.querySelector('h3').textContent;
                const sectionName = this.closest('section').className;
                
                console.log(`Sewer Service clicked: ${serviceName} in ${sectionName}`);
                
                // Add visual feedback with sewer theme
                this.style.transform = 'scale(0.95)';
                this.style.borderColor = '#17a2b8';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });
        
        techItems.forEach(item => {
            item.addEventListener('click', function() {
                const techName = this.querySelector('h3').textContent;
                console.log(`Technology clicked: ${techName}`);
                
                // Add tech-specific visual feedback
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            });
        });
    }
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sewerRipple {
            to {
                width: 200px;
                height: 200px;
                opacity: 0;
            }
        }
        
        @keyframes emergencyClick {
            to {
                width: 120px;
                height: 120px;
                opacity: 0;
            }
        }
        
        @keyframes ctaShine {
            0% { left: -100%; }
            100% { left: 100%; }
        }
        
        .active-section {
            transition: all 0.5s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Initialize all sewer services page functionality
    initSewerServicesHeroAnimation();
    initOverviewAnimation();
    initServiceCardsAnimation();
    initTechItemsAnimation();
    initServiceCardHover();
    initTechItemHover();
    initEmergencyEffects();
    initEmergencyAnimation();
    initServiceCategoryHighlighting();
    initScrollProgress();
    initCTAAnimation();
    initButtonEffects();
    initServiceTracking();
    
    console.log('Sewer Services page JavaScript initialized');
});