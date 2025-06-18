// About Us page specific JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // About hero animation
    function initAboutHeroAnimation() {
        const heroContent = document.querySelector('.about-hero-content');
        
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
    
    // About content animations
    function initAboutContentAnimation() {
        const aboutText = document.querySelector('.about-text');
        
        if (aboutText) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateTextContent(entry.target);
                    }
                });
            }, {
                threshold: 0.2
            });
            
            observer.observe(aboutText);
        }
    }
    
    // Animate text content with staggered effect
    function animateTextContent(container) {
        const heading = container.querySelector('h2');
        const paragraphs = container.querySelectorAll('p');
        
        // Initially hide elements
        [heading, ...paragraphs].forEach((el, index) => {
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = `all 0.6s ease ${index * 0.1}s`;
                
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 100 + (index * 100));
            }
        });
    }
    
    // Parallax effect for hero background
    function initParallaxEffect() {
        const aboutHero = document.querySelector('.about-hero');
        
        if (aboutHero) {
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const parallaxSpeed = 0.5;
                
                aboutHero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            });
        }
    }
    
    // Count up animation for statistics (if any are added)
    function initStatisticsAnimation() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        if (statNumbers.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateNumber(entry.target);
                    }
                });
            });
            
            statNumbers.forEach(stat => {
                observer.observe(stat);
            });
        }
    }
    
    // Number animation function
    function animateNumber(element) {
        const finalNumber = parseInt(element.textContent);
        const duration = 2000;
        const startTime = Date.now();
        
        function updateNumber() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentNumber = Math.floor(finalNumber * easeOutQuart);
            
            element.textContent = currentNumber;
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        }
        
        requestAnimationFrame(updateNumber);
    }
    
    // Button hover effects
    function initButtonEffects() {
        const buttons = document.querySelectorAll('.about-hero .schedule-btn, .about-hero .phone-btn');
        
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
    
    // Typewriter effect for heading
    function initTypewriterEffect() {
        const heading = document.querySelector('.about-hero h1');
        
        if (heading) {
            const text = heading.textContent;
            heading.textContent = '';
            heading.style.borderRight = '2px solid white';
            
            let index = 0;
            
            function typeWriter() {
                if (index < text.length) {
                    heading.textContent += text.charAt(index);
                    index++;
                    setTimeout(typeWriter, 50);
                } else {
                    // Remove cursor after typing is complete
                    setTimeout(() => {
                        heading.style.borderRight = 'none';
                    }, 1000);
                }
            }
            
            // Start typewriter effect after initial animation
            setTimeout(typeWriter, 1000);
        }
    }
    
    // Background image lazy loading
    function initBackgroundLazyLoad() {
        const aboutHero = document.querySelector('.about-hero');
        
        if (aboutHero) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Load high-quality background image
                        const img = new Image();
                        img.onload = function() {
                            aboutHero.style.backgroundImage = `
                                linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), 
                                url('${this.src}')
                            `;
                        };
                        img.src = '../imgs/team-background-hq.jpg';
                        
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(aboutHero);
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
            background: #0c3b7e;
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
    
    // Interactive elements
    function initInteractiveElements() {
        const aboutText = document.querySelector('.about-text');
        
        if (aboutText) {
            const paragraphs = aboutText.querySelectorAll('p');
            
            paragraphs.forEach(paragraph => {
                paragraph.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateX(10px)';
                    this.style.transition = 'transform 0.3s ease';
                    this.style.borderLeft = '3px solid #0c3b7e';
                    this.style.paddingLeft = '15px';
                });
                
                paragraph.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateX(0)';
                    this.style.borderLeft = 'none';
                    this.style.paddingLeft = '0';
                });
            });
        }
    }
    
    // Load additional content on scroll
    function initDynamicContent() {
        const aboutContent = document.querySelector('.about-content');
        
        if (aboutContent) {
            window.addEventListener('scroll', function() {
                const scrollPercent = (window.pageYOffset / document.documentElement.scrollHeight) * 100;
                
                // Load additional testimonials or company info at 80% scroll
                if (scrollPercent > 80 && !aboutContent.classList.contains('extra-content-loaded')) {
                    aboutContent.classList.add('extra-content-loaded');
                    loadExtraContent();
                }
            });
        }
    }
    
    // Load extra content function
    function loadExtraContent() {
        const aboutText = document.querySelector('.about-text');
        
        if (aboutText) {
            const extraContent = document.createElement('div');
            extraContent.className = 'extra-content';
            extraContent.style.cssText = `
                margin-top: 40px;
                padding-top: 40px;
                border-top: 1px solid #eee;
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            `;
            
            extraContent.innerHTML = `
                <h3 style="color: #0c3b7e; margin-bottom: 20px;">Why Choose Anderson Plumbing?</h3>
                <ul style="list-style: none; padding: 0;">
                    <li style="margin-bottom: 10px;">✓ 45+ years of trusted service</li>
                    <li style="margin-bottom: 10px;">✓ Woman-owned, family-operated business</li>
                    <li style="margin-bottom: 10px;">✓ BBB A+ rated contractor</li>
                    <li style="margin-bottom: 10px;">✓ Over 500,000 satisfied customers</li>
                    <li style="margin-bottom: 10px;">✓ 24/7 emergency services available</li>
                </ul>
            `;
            
            aboutText.appendChild(extraContent);
            
            // Animate in
            setTimeout(() => {
                extraContent.style.opacity = '1';
                extraContent.style.transform = 'translateY(0)';
            }, 100);
        }
    }
    
    // Initialize all about page functionality
    initAboutHeroAnimation();
    initAboutContentAnimation();
    initStatisticsAnimation();
    initButtonEffects();
    initBackgroundLazyLoad();
    initScrollProgress();
    initInteractiveElements();
    initDynamicContent();
    
    console.log('About Us page JavaScript initialized');
});