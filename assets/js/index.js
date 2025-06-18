// Homepage specific JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // Hero section animations
    function initHeroAnimations() {
        const heroText = document.querySelector('.hero-text');
        const heroImage = document.querySelector('.hero-image');
        const heroStats = document.querySelectorAll('.stat');
        
        // Fade in animation on load
        if (heroText && heroImage) {
            heroText.style.opacity = '0';
            heroText.style.transform = 'translateY(30px)';
            heroImage.style.opacity = '0';
            heroImage.style.transform = 'translateX(30px)';
            
            setTimeout(() => {
                heroText.style.transition = 'all 0.8s ease';
                heroImage.style.transition = 'all 0.8s ease';
                heroText.style.opacity = '1';
                heroText.style.transform = 'translateY(0)';
                heroImage.style.opacity = '1';
                heroImage.style.transform = 'translateX(0)';
            }, 300);
        }
        
        // Animate stats when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumber(entry.target);
                }
            });
        });
        
        heroStats.forEach(stat => {
            observer.observe(stat);
        });
    }
    
    // Number animation for stats
    function animateNumber(element) {
        const numberElement = element.querySelector('.stat-number');
        if (!numberElement) return;
        
        const finalNumber = parseFloat(numberElement.textContent);
        const duration = 2000; // 2 seconds
        const startTime = Date.now();
        
        function updateNumber() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentNumber = finalNumber * easeOutQuart;
            
            if (finalNumber % 1 === 0) {
                numberElement.textContent = Math.floor(currentNumber);
            } else {
                numberElement.textContent = currentNumber.toFixed(1);
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        }
        
        requestAnimationFrame(updateNumber);
    }
    
    // Service area map interaction
    // function initServiceMap() {
    //     const serviceMap = document.querySelector('.service-map img');
        
    //     if (serviceMap) {
    //         serviceMap.addEventListener('click', function() {
    //             // Simulate opening full map or directions
    //             alert('Interactive map functionality would be implemented here.');
    //         });
            
    //         serviceMap.style.cursor = 'pointer';
    //         serviceMap.title = 'Click to view full service area map';
    //     }
    // }
    
    // CTA cards hover effects
    function initCTACards() {
        const ctaCards = document.querySelectorAll('.cta-card');
        
        ctaCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
    
    // Tagline section parallax effect
    function initParallaxEffect() {
        const taglineSection = document.querySelector('.tagline-section');
        const taglineImage = document.querySelector('.tagline-image');
        
        if (taglineSection && taglineImage) {
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const sectionTop = taglineSection.offsetTop;
                const sectionHeight = taglineSection.offsetHeight;
                const windowHeight = window.innerHeight;
                
                // Check if section is in viewport
                if (scrolled + windowHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
                    const parallaxSpeed = 0.5;
                    const yPos = -(scrolled - sectionTop) * parallaxSpeed;
                    taglineImage.style.transform = `translateY(${yPos}px)`;
                }
            });
        }
    }
    
    // Emergency service notice
    function initEmergencyNotice() {
        const emergencyButton = document.querySelector('.cta-phone');
        
        if (emergencyButton) {
            emergencyButton.addEventListener('click', function(e) {
                e.preventDefault();
                
                const currentTime = new Date();
                const currentHour = currentTime.getHours();
                
                // Check if within business hours (7am - 7pm)
                if (currentHour >= 7 && currentHour < 19) {
                    window.location.href = 'tel:+16197286130';
                } else {
                    const confirmCall = confirm(
                        'It\'s currently outside our regular business hours (7am-7pm). ' +
                        'Emergency services are available. Would you like to call now?'
                    );
                    
                    if (confirmCall) {
                        window.location.href = 'tel:+16197286130';
                    }
                }
            });
        }
    }
    
    // Team photo modal (for larger view)
    function initTeamPhotoModal() {
        const teamPhoto = document.querySelector('.hero-image img');
        
        if (teamPhoto) {
            teamPhoto.style.cursor = 'pointer';
            teamPhoto.title = 'Click to view larger image';
            
            teamPhoto.addEventListener('click', function() {
                // Create modal overlay
                const modal = document.createElement('div');
                modal.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    cursor: pointer;
                `;
                
                const modalImg = document.createElement('img');
                modalImg.src = this.src;
                modalImg.style.cssText = `
                    max-width: 90%;
                    max-height: 90%;
                    border-radius: 10px;
                `;
                
                modal.appendChild(modalImg);
                document.body.appendChild(modal);
                
                modal.addEventListener('click', function() {
                    document.body.removeChild(modal);
                });
            });
        }
    }
    
    // Service area hover effects
    function initServiceAreaEffects() {
        const serviceText = document.querySelector('.service-text');
        const serviceMap = document.querySelector('.service-map');
        
        if (serviceText && serviceMap) {
            serviceText.addEventListener('mouseenter', function() {
                serviceMap.style.transform = 'scale(1.02)';
                serviceMap.style.transition = 'transform 0.3s ease';
            });
            
            serviceText.addEventListener('mouseleave', function() {
                serviceMap.style.transform = 'scale(1)';
            });
        }
    }
    
    // Initialize all homepage functionality
    initHeroAnimations();
    initServiceMap();
    initCTACards();
    initParallaxEffect();
    initEmergencyNotice();
    initTeamPhotoModal();
    initServiceAreaEffects();
    
    console.log('Homepage JavaScript initialized');
});