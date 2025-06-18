// Plumbing page specific JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // Plumbing hero animation
    function initPlumbingHeroAnimation() {
        const heroContent = document.querySelector('.plumbing-hero-content');
        
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
    
    // Services section animations
    function initServicesAnimation() {
        const servicesText = document.querySelector('.services-text');
        const servicesImage = document.querySelector('.services-image');
        
        if (servicesText && servicesImage) {
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
            servicesText.style.opacity = '0';
            servicesText.style.transform = 'translateY(30px)';
            servicesText.style.transition = 'all 0.8s ease';
            
            servicesImage.style.opacity = '0';
            servicesImage.style.transform = 'translateX(30px)';
            servicesImage.style.transition = 'all 0.8s ease 0.2s';
            
            observer.observe(servicesText);
            observer.observe(servicesImage);
        }
    }
    
    // Service cards animation
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
    
    // Service card hover effects
    function initServiceCardHover() {
        const serviceItems = document.querySelectorAll('.service-item');
        
        serviceItems.forEach(item => {
            const icon = item.querySelector('.service-icon');
            
            item.addEventListener('mouseenter', function() {
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                    icon.style.transition = 'transform 0.3s ease';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
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
    
    // Parallax effect for hero section
    function initParallaxEffect() {
        const plumbingHero = document.querySelector('.plumbing-hero');
        
        if (plumbingHero) {
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const parallaxSpeed = 0.3;
                
                plumbingHero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
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
    
    // Section navigation highlighting
    function initSectionNavigation() {
        const sections = document.querySelectorAll('.commercial-plumbing, .industrial-plumbing, .government-plumbing');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add visual indicator for current section
                    entry.target.style.borderLeft = '4px solid #0D6EFD';
                    entry.target.style.paddingLeft = '16px';
                    entry.target.style.transition = 'all 0.3s ease';
                }
            });
        }, {
            threshold: 0.5
        });
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    // Button interactions
    function initButtonEffects() {
        const buttons = document.querySelectorAll('.plumbing-hero .schedule-btn, .plumbing-hero .phone-btn');
        
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
    
    // Service grid responsive adjustment
    function initResponsiveGrid() {
        const servicesGrids = document.querySelectorAll('.services-grid');
        
        function adjustGrid() {
            const windowWidth = window.innerWidth;
            
            servicesGrids.forEach(grid => {
                if (windowWidth < 768) {
                    grid.style.gridTemplateColumns = '1fr';
                } else if (windowWidth < 1024) {
                    grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
                } else {
                    grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(350px, 1fr))';
                }
            });
        }
        
        adjustGrid();
        window.addEventListener('resize', adjustGrid);
    }
    
    // Emergency service highlight
    function initEmergencyHighlight() {
        const emergencyServices = document.querySelectorAll('.service-item');
        
        emergencyServices.forEach(service => {
            const title = service.querySelector('h3');
            if (title && title.textContent.toLowerCase().includes('emergency')) {
                service.style.border = '2px solid #ff6b6b';
                service.addEventListener('mouseenter', function() {
                    this.style.background = '#ff6b6b';
                    this.style.borderColor = '#ff6b6b';
                });
                
                service.addEventListener('mouseleave', function() {
                    this.style.background = '#333333';
                    this.style.borderColor = '#ff6b6b';
                });
            }
        });
    }
    
    // Initialize all plumbing page functionality
    initPlumbingHeroAnimation();
    initServicesAnimation();
    initServiceCardsAnimation();
    initServiceCardHover();
    initCTAAnimation();
    initScrollProgress();
    initSectionNavigation();
    initButtonEffects();
    initResponsiveGrid();
    initEmergencyHighlight();
    
    console.log('Plumbing page JavaScript initialized');
});