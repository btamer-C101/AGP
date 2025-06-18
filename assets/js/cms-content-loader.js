// CMS Content Loader for American Gulf Plumbing Website
// This script loads content from JSON files created by Decap CMS

class CMSContentLoader {
    constructor() {
        this.contentCache = {};
        this.init();
    }

    async init() {
        try {
            await this.loadAllContent();
            this.applyContentToPage();
        } catch (error) {
            console.log('CMS content not available, using default content');
        }
    }

    async loadAllContent() {
        // Load all content files
        const contentFiles = [
            'content/homepage.json',
            'content/about.json', 
            'content/contact.json',
            'content/services.json',
            'content/images.json',
            'content/social.json'
        ];

        for (const file of contentFiles) {
            try {
                const response = await fetch(file);
                if (response.ok) {
                    const data = await response.json();
                    const fileName = file.split('/')[1].replace('.json', '');
                    this.contentCache[fileName] = data;
                }
            } catch (error) {
                console.log(`Could not load ${file}`);
            }
        }
    }

    applyContentToPage() {
        const currentPage = this.getCurrentPage();
        
        // Apply global content first
        this.applyGlobalContent();
        
        // Apply page-specific content
        switch (currentPage) {
            case 'homepage':
                this.applyHomepageContent();
                break;
            case 'about':
                this.applyAboutContent();
                break;
            case 'contact':
                this.applyContactContent();
                break;
            case 'plumbing':
                this.applyServiceContent('plumbing');
                break;
            case 'sewer-services':
                this.applyServiceContent('sewer');
                break;
            case 'drain-services':
                this.applyServiceContent('drain');
                break;
        }
    }

    getCurrentPage() {
        const path = window.location.pathname;
        
        if (path === '/' || path.includes('index.html') || path === '') {
            return 'homepage';
        } else if (path.includes('about-us.html')) {
            return 'about';
        } else if (path.includes('contact.html')) {
            return 'contact';
        } else if (path.includes('plumbing.html')) {
            return 'plumbing';
        } else if (path.includes('sewer-services.html')) {
            return 'sewer-services';
        } else if (path.includes('drain-services.html')) {
            return 'drain-services';
        }
        return 'unknown';
    }

    applyGlobalContent() {
        // Update contact information
        if (this.contentCache.contact) {
            this.updateContactInfo(this.contentCache.contact);
        }

        // Update images
        if (this.contentCache.images) {
            this.updateImages(this.contentCache.images);
        }

        // Update social media links
        if (this.contentCache.social) {
            this.updateSocialLinks(this.contentCache.social);
        }
    }

    updateContactInfo(contact) {
        // Update phone numbers
        const phoneSelectors = [
            '.phone-number',
            '.footer-phone',
            'a[href*="tel"]'
        ];

        phoneSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                if (el.textContent.includes('866') && contact.emergency_phone) {
                    el.textContent = contact.emergency_phone;
                    el.href = `tel:${contact.emergency_phone.replace(/\D/g, '')}`;
                } else if (el.textContent.includes('813') && contact.main_phone) {
                    el.textContent = contact.main_phone;
                    el.href = `tel:${contact.main_phone.replace(/\D/g, '')}`;
                }
            });
        });

        // Update address
        if (contact.address1 && contact.address2) {
            const addressElements = document.querySelectorAll('.location p');
            if (addressElements.length > 0) {
                // Find address paragraph (usually contains "Street" or "FL")
                addressElements.forEach(el => {
                    if (el.textContent.includes('Street') || el.textContent.includes('FL')) {
                        el.innerHTML = `${contact.address1},<br>${contact.address2}`;
                    }
                });
            }
        }

        // Update business hours
        if (contact.hours) {
            const hoursElements = document.querySelectorAll('.hours p');
            if (hoursElements.length > 0) {
                hoursElements[0].textContent = contact.hours;
            }
            if (hoursElements.length > 1 && contact.emergency_hours) {
                hoursElements[1].textContent = contact.emergency_hours;
            }
        }
    }

    updateImages(images) {
        // Main logo
        if (images.main_logo) {
            const mainLogos = document.querySelectorAll('.logo img, .header img[alt*="American Gulf Plumbing"]');
            mainLogos.forEach(img => {
                img.src = images.main_logo;
            });
        }

        // Footer logo
        if (images.footer_logo) {
            const footerLogos = document.querySelectorAll('.footer-logo img');
            footerLogos.forEach(img => {
                img.src = images.footer_logo;
            });
        }

        // Service map
        if (images.service_map) {
            const mapImages = document.querySelectorAll('.service-map img, img[alt*="Service Areas"]');
            mapImages.forEach(img => {
                img.src = images.service_map;
            });
        }

        // Hero van image
        if (images.hero_van) {
            const heroImages = document.querySelectorAll('.hero-image img, img[alt*="AGP Plumbing Team"]');
            heroImages.forEach(img => {
                img.src = images.hero_van;
            });
        }
    }

    updateSocialLinks(social) {
        const socialMap = {
            'facebook': social.facebook,
            'instagram': social.instagram, 
            'linkedin': social.linkedin
        };

        Object.entries(socialMap).forEach(([platform, url]) => {
            if (url) {
                const socialLinks = document.querySelectorAll(`a[href*="${platform}"]`);
                socialLinks.forEach(link => {
                    link.href = url;
                });
            }
        });
    }

    applyHomepageContent() {
        if (!this.contentCache.homepage) return;

        const content = this.contentCache.homepage;

        // Hero section
        if (content.hero) {
            this.updateElement('.hero-label', content.hero.label);
            this.updateElement('h1', content.hero.title);
            this.updateElement('.hero-description', content.hero.description);
            
            // Update stats
            if (content.hero.years) {
                this.updateElement('.stat-number', content.hero.years.toString());
            }

            // Update hero image
            if (content.hero.image) {
                this.updateElement('.hero-image img', null, 'src', content.hero.image);
            }
        }

        // Service areas section
        if (content.service_areas) {
            this.updateElement('.service-label', content.service_areas.label);
            this.updateElement('.service-areas h2', content.service_areas.title);
            this.updateElement('.service-areas p', content.service_areas.description);
            
            if (content.service_areas.image) {
                this.updateElement('.service-map img', null, 'src', content.service_areas.image);
            }
        }

        // Services section
        if (content.services) {
            this.updateElement('.section-label', content.services.label);
            this.updateElement('.section-heading', content.services.title);
            this.updateElement('.section-content p', content.services.description);
        }
    }

    applyAboutContent() {
        if (!this.contentCache.about) return;

        const content = this.contentCache.about;

        // Hero section
        if (content.hero) {
            this.updateElement('.about-label', content.hero.label);
            this.updateElement('.about-hero h1', content.hero.title);
            
            if (content.hero.image) {
                // Update background image
                const aboutHero = document.querySelector('.about-hero');
                if (aboutHero) {
                    aboutHero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${content.hero.image}')`;
                }
            }
        }

        // About content
        if (content.content) {
            this.updateElement('.about-content h2', content.content.title);
            
            const paragraphs = document.querySelectorAll('.about-content p');
            if (content.content.paragraph1 && paragraphs[0]) {
                paragraphs[0].innerHTML = content.content.paragraph1;
            }
            if (content.content.paragraph2 && paragraphs[1]) {
                paragraphs[1].innerHTML = content.content.paragraph2;
            }
            if (content.content.paragraph3 && paragraphs[2]) {
                paragraphs[2].innerHTML = content.content.paragraph3;
            }
        }
    }

    applyContactContent() {
        // Contact page specific content would go here
        // Most contact info is handled in global content
    }

    applyServiceContent(serviceType) {
        if (!this.contentCache.services || !this.contentCache.services[serviceType]) return;

        const content = this.contentCache.services[serviceType];

        // Update hero title
        const heroTitles = document.querySelectorAll('h1');
        if (heroTitles.length > 0 && content.hero_title) {
            heroTitles[0].textContent = content.hero_title;
        }

        // Update main content title
        const mainTitles = document.querySelectorAll('h2');
        if (mainTitles.length > 0 && content.main_title) {
            // Find the main content title (usually the second h2)
            if (mainTitles.length > 1) {
                mainTitles[1].textContent = content.main_title;
            }
        }

        // Update description
        if (content.description) {
            const descriptions = document.querySelectorAll('p');
            // Find a good paragraph to update with the main description
            descriptions.forEach(p => {
                if (p.textContent.length > 100) { // Find substantial paragraphs
                    p.textContent = content.description;
                    return; // Update only the first substantial paragraph
                }
            });
        }
    }

    updateElement(selector, content, attribute = 'textContent', value = null) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            if (attribute === 'textContent' && content) {
                el.textContent = content;
            } else if (attribute && value) {
                el.setAttribute(attribute, value);
            }
        });
    }
}

// Initialize content loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new CMSContentLoader();
});

// Also make it available globally for manual refresh
window.CMSContentLoader = CMSContentLoader;