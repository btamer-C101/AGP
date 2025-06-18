// CMS Content Loader for American Gulf Plumbing Website
// This script loads content from JSON files created by Decap CMS

class CMSContentLoader {
    constructor() {
        this.contentCache = {};
        this.basePath = this.getBasePath();
        this.init();
    }

    // Determine the correct base path for loading content
    getBasePath() {
        const path = window.location.pathname;
        // If we're in a subdirectory (like /assets/html/), adjust the path
        if (path.includes('/assets/html/')) {
            return '../../content/'; // Go up two levels
        }
        return 'content/'; // We're in the root
    }

    async init() {
        try {
            await this.loadAllContent();
            this.applyContentToPage();
            console.log('CMS content loaded successfully');
        } catch (error) {
            console.log('Using default content - CMS files not found');
        }
    }

    async loadAllContent() {
        // Load all content files
        const contentFiles = [
            'homepage.json',
            'about.json', 
            'contact.json',
            'plumbing.json',
            'images.json',
            'social.json'
        ];

        for (const file of contentFiles) {
            try {
                const response = await fetch(this.basePath + file);
                if (response.ok) {
                    const data = await response.json();
                    const fileName = file.replace('.json', '');
                    this.contentCache[fileName] = data;
                    console.log(`Loaded ${fileName}:`, data);
                } else {
                    console.log(`Could not load ${file} - using defaults`);
                }
            } catch (error) {
                console.log(`Could not load ${file} - using defaults`);
            }
        }
    }

    applyContentToPage() {
        const currentPage = this.getCurrentPage();
        console.log('Current page detected:', currentPage);
        
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
                this.applyPlumbingContent();
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
        // Update contact information from contact.json
        if (this.contentCache.contact) {
            this.updateContactInfo(this.contentCache.contact);
        }

        // Update images from images.json
        if (this.contentCache.images) {
            this.updateImages(this.contentCache.images);
        }

        // Update social media links from social.json
        if (this.contentCache.social) {
            this.updateSocialLinks(this.contentCache.social);
        }
    }

    updateContactInfo(contact) {
        console.log('Updating contact info:', contact);
        
        // Update phone numbers
        if (contact.emergency_phone) {
            this.updateElement('.phone-number', contact.emergency_phone);
            this.updateElement('a[href*="866"]', contact.emergency_phone, 'both');
        }
        
        if (contact.main_phone) {
            this.updateElement('.footer-phone', contact.main_phone);
            this.updateElement('a[href*="813"]', contact.main_phone, 'both');
        }

        // Update address
        if (contact.address1 && contact.address2) {
            const addressElements = document.querySelectorAll('.location p');
            addressElements.forEach(el => {
                if (el.textContent.includes('Street') || el.textContent.includes('FL')) {
                    el.innerHTML = `${contact.address1},<br>${contact.address2}`;
                }
            });
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
        console.log('Updating images:', images);
        
        if (images.main_logo) {
            this.updateElement('.logo img', images.main_logo, 'src');
        }

        if (images.footer_logo) {
            this.updateElement('.footer-logo img', images.footer_logo, 'src');
        }

        if (images.service_map) {
            this.updateElement('.service-map img', images.service_map, 'src');
        }

        if (images.hero_van) {
            this.updateElement('.hero-image img', images.hero_van, 'src');
        }
    }

    updateSocialLinks(social) {
        console.log('Updating social links:', social);
        
        if (social.facebook) {
            this.updateElement('a[href*="facebook"]', social.facebook, 'href');
        }
        
        if (social.instagram) {
            this.updateElement('a[href*="instagram"]', social.instagram, 'href');
        }
        
        if (social.linkedin) {
            this.updateElement('a[href*="linkedin"]', social.linkedin, 'href');
        }
    }

    applyHomepageContent() {
        if (!this.contentCache.homepage) return;
        console.log('Applying homepage content:', this.contentCache.homepage);

        const content = this.contentCache.homepage;

        // Hero section
        if (content.hero) {
            this.updateElement('.hero-label', content.hero.hero_label);
            this.updateElement('.hero-section h1', content.hero.hero_title);
            this.updateElement('.hero-description', content.hero.hero_description);
            
            if (content.hero.years_stat) {
                this.updateElement('.stat-number', content.hero.years_stat.toString());
            }

            if (content.hero.hero_image) {
                this.updateElement('.hero-image img', content.hero.hero_image, 'src');
            }
        }

        // Service areas section
        if (content.service_areas) {
            this.updateElement('.service-label', content.service_areas.section_label);
            this.updateElement('.service-areas h2', content.service_areas.section_title);
            this.updateElement('.service-areas p', content.service_areas.section_description);
            
            if (content.service_areas.map_image) {
                this.updateElement('.service-map img', content.service_areas.map_image, 'src');
            }
        }

        // Services section
        if (content.services) {
            this.updateElement('.section-label', content.services.section_label);
            this.updateElement('.section-heading', content.services.section_title);
            this.updateElement('.section-content p', content.services.section_description);
        }
    }

    applyAboutContent() {
        if (!this.contentCache.about) return;
        console.log('Applying about content:', this.contentCache.about);

        const content = this.contentCache.about;

        // Hero section
        if (content.hero) {
            this.updateElement('.about-label', content.hero.hero_label);
            this.updateElement('.about-hero h1', content.hero.hero_title);
            
            if (content.hero.background_image) {
                const aboutHero = document.querySelector('.about-hero');
                if (aboutHero) {
                    aboutHero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${content.hero.background_image}')`;
                }
            }
        }

        // About content
        if (content.content) {
            this.updateElement('.about-content h2', content.content.main_title);
            
            const paragraphs = document.querySelectorAll('.about-content p');
            if (content.content.paragraph_1 && paragraphs[0]) {
                paragraphs[0].innerHTML = content.content.paragraph_1;
            }
            if (content.content.paragraph_2 && paragraphs[1]) {
                paragraphs[1].innerHTML = content.content.paragraph_2;
            }
            if (content.content.paragraph_3 && paragraphs[2]) {
                paragraphs[2].innerHTML = content.content.paragraph_3;
            }
        }
    }

    applyContactContent() {
        if (!this.contentCache.contact) return;
        console.log('Applying contact content:', this.contentCache.contact);

        // Contact page specific content handled in global content
    }

    applyPlumbingContent() {
        if (!this.contentCache.plumbing) return;
        console.log('Applying plumbing content:', this.contentCache.plumbing);

        const content = this.contentCache.plumbing;

        // Hero section
        if (content.hero) {
            this.updateElement('.plumbing-label', content.hero.hero_label);
            this.updateElement('.plumbing-hero h1', content.hero.hero_title);
            
            if (content.hero.background_image) {
                const plumbingHero = document.querySelector('.plumbing-hero');
                if (plumbingHero) {
                    plumbingHero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${content.hero.background_image}')`;
                }
            }
        }

        // Services overview
        if (content.services_overview) {
            this.updateElement('.services-label', content.services_overview.section_label);
            this.updateElement('.plumbing-services h2', content.services_overview.section_title);
            this.updateElement('.services-text p', content.services_overview.section_description);
            
            if (content.services_overview.services_image) {
                this.updateElement('.services-image img', content.services_overview.services_image, 'src');
            }
        }

        // Main content
        if (content.main_content) {
            this.updateElement('.plumbing-content h2', content.main_content.content_title);
            
            const paragraphs = document.querySelectorAll('.plumbing-content p');
            if (content.main_content.paragraph_1 && paragraphs[0]) {
                paragraphs[0].innerHTML = content.main_content.paragraph_1;
            }
            if (content.main_content.paragraph_2 && paragraphs[1]) {
                paragraphs[1].innerHTML = content.main_content.paragraph_2;
            }
            if (content.main_content.paragraph_3 && paragraphs[2]) {
                paragraphs[2].innerHTML = content.main_content.paragraph_3;
            }
        }
    }

    updateElement(selector, content, type = 'text') {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            if (type === 'src') {
                el.src = content;
            } else if (type === 'href') {
                el.href = content;
            } else if (type === 'both') {
                // Update both text and href for phone numbers
                el.textContent = content;
                el.href = `tel:${content.replace(/\D/g, '')}`;
            } else {
                el.textContent = content;
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