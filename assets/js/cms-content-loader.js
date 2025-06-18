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
            'sewer-services.json',
            'drain-services.json',
            'sewer-drain.json',
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
            case 'sewer-services':
                this.applySewerServicesContent();
                break;
            case 'drain-services':
                this.applyDrainServicesContent();
                break;
            case 'sewer-drain':
                this.applySewerDrainContent();
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
        } else if (path.includes('sewer-drain')) {
            return 'sewer-drain';
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
        
        if (social.linkedin && social.linkedin !== "") {
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

        const content = this.contentCache.contact;

        // Hero section
        if (content.hero) {
            this.updateElement('.contact-label', content.hero.hero_label);
            this.updateElement('.contact-hero h1', content.hero.hero_title);
            
            if (content.hero.background_image) {
                const contactHero = document.querySelector('.contact-hero');
                if (contactHero) {
                    contactHero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${content.hero.background_image}')`;
                }
            }
        }

        // Contact info
        if (content.contact_info) {
            this.updateElement('.contact-info h2', content.contact_info.main_title);
            
            const paragraphs = document.querySelectorAll('.contact-info p');
            if (content.contact_info.description && paragraphs[0]) {
                paragraphs[0].textContent = content.contact_info.description;
            }
            if (content.contact_info.service_areas && paragraphs[1]) {
                paragraphs[1].innerHTML = content.contact_info.service_areas;
            }
        }
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

    applySewerServicesContent() {
        if (!this.contentCache['sewer-services']) return;
        console.log('Applying sewer services content:', this.contentCache['sewer-services']);

        const content = this.contentCache['sewer-services'];

        // Hero section
        if (content.hero) {
            this.updateElement('.sewer-services-label', content.hero.hero_label);
            this.updateElement('.sewer-services-hero h1', content.hero.hero_title);
            
            if (content.hero.background_image) {
                const sewerHero = document.querySelector('.sewer-services-hero');
                if (sewerHero) {
                    sewerHero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${content.hero.background_image}')`;
                }
            }
        }

        // Services overview
        if (content.services_overview) {
            this.updateElement('.overview-label', content.services_overview.section_label);
            this.updateElement('.services-overview h2', content.services_overview.section_title);
            this.updateElement('.overview-text p', content.services_overview.section_description);
            
            if (content.services_overview.overview_image) {
                this.updateElement('.overview-image img', content.services_overview.overview_image, 'src');
            }
        }

        // Main content
        if (content.main_content) {
            this.updateElement('.sewer-content h2', content.main_content.content_title);
            
            const paragraphs = document.querySelectorAll('.sewer-content p');
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

    applyDrainServicesContent() {
        if (!this.contentCache['drain-services']) return;
        console.log('Applying drain services content:', this.contentCache['drain-services']);

        const content = this.contentCache['drain-services'];

        // Hero section
        if (content.hero) {
            this.updateElement('.drain-services-label', content.hero.hero_label);
            this.updateElement('.drain-services-hero h1', content.hero.hero_title);
            
            if (content.hero.background_image) {
                const drainHero = document.querySelector('.drain-services-hero');
                if (drainHero) {
                    drainHero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${content.hero.background_image}')`;
                }
            }
        }

        // Services overview
        if (content.services_overview) {
            this.updateElement('.overview-label', content.services_overview.section_label);
            this.updateElement('.services-overview h2', content.services_overview.section_title);
            this.updateElement('.overview-text p', content.services_overview.section_description);
            
            if (content.services_overview.overview_image) {
                this.updateElement('.overview-image img', content.services_overview.overview_image, 'src');
            }
        }

        // Main content
        if (content.main_content) {
            this.updateElement('.drain-content h2', content.main_content.content_title);
            
            const paragraphs = document.querySelectorAll('.drain-content p');
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

    applySewerDrainContent() {
        if (!this.contentCache['sewer-drain']) return;
        console.log('Applying sewer drain content:', this.contentCache['sewer-drain']);

        const content = this.contentCache['sewer-drain'];

        // Hero section
        if (content.hero) {
            this.updateElement('.sewer-drain-label', content.hero.hero_label);
            this.updateElement('.sewer-drain-hero h1', content.hero.hero_title);
            
            if (content.hero.background_image) {
                const sewerDrainHero = document.querySelector('.sewer-drain-hero');
                if (sewerDrainHero) {
                    sewerDrainHero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${content.hero.background_image}')`;
                }
            }
        }

        // Services overview
        if (content.services_overview) {
            this.updateElement('.overview-label', content.services_overview.section_label);
            this.updateElement('.services-overview h2', content.services_overview.section_title);
            this.updateElement('.overview-text p', content.services_overview.section_description);
            
            if (content.services_overview.overview_image) {
                this.updateElement('.overview-image img', content.services_overview.overview_image, 'src');
            }
        }

        // Main content
        if (content.main_content) {
            this.updateElement('.sewer-drain-content h2', content.main_content.content_title);
            
            const paragraphs = document.querySelectorAll('.sewer-drain-content p');
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
window.CMSContentLoader = CMSContentLoader;// Enhanced CMS Content Loader for American Gulf Plumbing Website
// This script loads content from JSON files created by Decap CMS with better error handling and cache busting

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
            // Clear cache to ensure fresh content
            this.contentCache = {};
            await this.loadAllContent();
            this.applyContentToPage();
            console.log('CMS content loaded successfully');
            
            // Add refresh button for development
            this.addRefreshButton();
        } catch (error) {
            console.error('Error loading CMS content:', error);
            console.log('Using default content - CMS files not found');
        }
    }

    // Add cache busting to ensure fresh content
    getCacheBustedUrl(url) {
        const timestamp = new Date().getTime();
        return `${url}?t=${timestamp}`;
    }

    async loadAllContent() {
        // Load all content files with proper naming
        const contentFiles = [
            { file: 'homepage.json', key: 'homepage' },
            { file: 'about.json', key: 'about' },
            { file: 'contact-content.json', key: 'contact-content' }, // Contact page content
            { file: 'contact.json', key: 'contact' }, // Contact settings
            { file: 'plumbing.json', key: 'plumbing' },
            { file: 'sewer-services.json', key: 'sewer-services' },
            { file: 'drain-services.json', key: 'drain-services' },
            { file: 'sewer-drain.json', key: 'sewer-drain' },
            { file: 'images.json', key: 'images' },
            { file: 'social.json', key: 'social' }
        ];

        for (const { file, key } of contentFiles) {
            try {
                const url = this.getCacheBustedUrl(this.basePath + file);
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    this.contentCache[key] = data;
                    console.log(`✓ Loaded ${key}:`, data);
                } else {
                    console.log(`✗ Could not load ${file} (${response.status}) - using defaults`);
                    // Try to create the file if it doesn't exist
                    if (response.status === 404) {
                        console.log(`  Tip: Create ${file} in the /content/ directory`);
                    }
                }
            } catch (error) {
                console.error(`✗ Error loading ${file}:`, error.message);
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
                this.applyContactPageContent(); // Use separate method for contact page
                break;
            case 'plumbing':
                this.applyPlumbingContent();
                break;
            case 'sewer-services':
                this.applySewerServicesContent();
                break;
            case 'drain-services':
                this.applyDrainServicesContent();
                break;
            case 'sewer-drain':
                this.applySewerDrainContent();
                break;
        }
    }

    getCurrentPage() {
        const path = window.location.pathname.toLowerCase();
        const filename = path.split('/').pop();
        
        if (path === '/' || filename === 'index.html' || filename === '') {
            return 'homepage';
        } else if (filename.includes('about-us')) {
            return 'about';
        } else if (filename.includes('contact')) {
            return 'contact';
        } else if (filename.includes('plumbing')) {
            return 'plumbing';
        } else if (filename.includes('sewer-services')) {
            return 'sewer-services';
        } else if (filename.includes('drain-services')) {
            return 'drain-services';
        } else if (filename.includes('sewer-drain')) {
            return 'sewer-drain';
        }
        return 'unknown';
    }

    applyGlobalContent() {
        // Update contact information from contact.json (settings)
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
        
        // Update all phone number instances
        if (contact.emergency_phone) {
            const emergencyPhoneElements = document.querySelectorAll('.phone-number, a[href*="866-374-0402"], a[href*="8663740402"]');
            emergencyPhoneElements.forEach(el => {
                if (el.tagName === 'A') {
                    el.textContent = contact.emergency_phone;
                    el.href = `tel:${contact.emergency_phone.replace(/\D/g, '')}`;
                } else {
                    el.textContent = contact.emergency_phone;
                }
            });
        }
        
        if (contact.main_phone) {
            const mainPhoneElements = document.querySelectorAll('.footer-phone, a[href*="813-378-3882"], a[href*="8133783882"]');
            mainPhoneElements.forEach(el => {
                if (el.tagName === 'A') {
                    el.textContent = contact.main_phone;
                    el.href = `tel:${contact.main_phone.replace(/\D/g, '')}`;
                } else {
                    el.textContent = contact.main_phone;
                }
            });
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

        // Update email if present
        if (contact.email) {
            const emailElements = document.querySelectorAll('a[href*="mailto:"]');
            emailElements.forEach(el => {
                el.href = `mailto:${contact.email}`;
                el.textContent = contact.email;
            });
        }
    }

    updateImages(images) {
        console.log('Updating images:', images);
        
        if (images.main_logo) {
            this.updateElement('.logo img', images.main_logo, 'src');
            this.updateElement('.header img[alt*="American Gulf Plumbing"]', images.main_logo, 'src');
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
            const linkedinLinks = document.querySelectorAll('a[href*="linkedin"]');
            linkedinLinks.forEach(link => {
                if (social.linkedin && social.linkedin !== "") {
                    link.href = social.linkedin;
                    link.style.display = 'inline-block';
                } else {
                    link.style.display = 'none';
                }
            });
        }
    }

    applyHomepageContent() {
        if (!this.contentCache.homepage) {
            console.log('No homepage content found');
            return;
        }
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
        if (!this.contentCache.about) {
            console.log('No about content found');
            return;
        }
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

    applyContactPageContent() {
        // Try to load from contact-content.json first, fallback to contact.json
        const content = this.contentCache['contact-content'] || this.contentCache.contact;
        
        if (!content || !content.hero) {
            console.log('No contact page content found');
            return;
        }
        
        console.log('Applying contact page content:', content);

        // Hero section
        if (content.hero) {
            this.updateElement('.contact-label', content.hero.hero_label);
            this.updateElement('.contact-hero h1', content.hero.hero_title);
            
            if (content.hero.background_image) {
                const contactHero = document.querySelector('.contact-hero');
                if (contactHero) {
                    contactHero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${content.hero.background_image}')`;
                }
            }
        }

        // Contact info
        if (content.contact_info) {
            this.updateElement('.contact-info h2', content.contact_info.main_title);
            
            const paragraphs = document.querySelectorAll('.contact-info p');
            if (content.contact_info.description && paragraphs[0]) {
                paragraphs[0].textContent = content.contact_info.description;
            }
            if (content.contact_info.service_areas && paragraphs[1]) {
                paragraphs[1].innerHTML = content.contact_info.service_areas;
            }
        }
    }

    applyPlumbingContent() {
        if (!this.contentCache.plumbing) {
            console.log('No plumbing content found');
            return;
        }
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

    applySewerServicesContent() {
        if (!this.contentCache['sewer-services']) {
            console.log('No sewer services content found');
            return;
        }
        console.log('Applying sewer services content:', this.contentCache['sewer-services']);

        const content = this.contentCache['sewer-services'];

        // Hero section
        if (content.hero) {
            this.updateElement('.sewer-services-label', content.hero.hero_label);
            this.updateElement('.sewer-services-hero h1', content.hero.hero_title);
            
            if (content.hero.background_image) {
                const sewerHero = document.querySelector('.sewer-services-hero');
                if (sewerHero) {
                    sewerHero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${content.hero.background_image}')`;
                }
            }
        }

        // Services overview
        if (content.services_overview) {
            this.updateElement('.overview-label', content.services_overview.section_label);
            this.updateElement('.services-overview h2', content.services_overview.section_title);
            this.updateElement('.overview-text p', content.services_overview.section_description);
            
            if (content.services_overview.overview_image) {
                this.updateElement('.overview-image img', content.services_overview.overview_image, 'src');
            }
        }

        // Main content
        if (content.main_content) {
            this.updateElement('.sewer-content h2', content.main_content.content_title);
            
            const paragraphs = document.querySelectorAll('.sewer-content p');
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

    applyDrainServicesContent() {
        if (!this.contentCache['drain-services']) {
            console.log('No drain services content found');
            return;
        }
        console.log('Applying drain services content:', this.contentCache['drain-services']);

        const content = this.contentCache['drain-services'];

        // Hero section
        if (content.hero) {
            this.updateElement('.drain-services-label', content.hero.hero_label);
            this.updateElement('.drain-services-hero h1', content.hero.hero_title);
            
            if (content.hero.background_image) {
                const drainHero = document.querySelector('.drain-services-hero');
                if (drainHero) {
                    drainHero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${content.hero.background_image}')`;
                }
            }
        }

        // Services overview
        if (content.services_overview) {
            this.updateElement('.overview-label', content.services_overview.section_label);
            this.updateElement('.services-overview h2', content.services_overview.section_title);
            this.updateElement('.overview-text p', content.services_overview.section_description);
            
            if (content.services_overview.overview_image) {
                this.updateElement('.overview-image img', content.services_overview.overview_image, 'src');
            }
        }

        // Main content
        if (content.main_content) {
            this.updateElement('.drain-content h2', content.main_content.content_title);
            
            const paragraphs = document.querySelectorAll('.drain-content p');
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

    applySewerDrainContent() {
        if (!this.contentCache['sewer-drain']) {
            console.log('No sewer drain content found');
            return;
        }
        console.log('Applying sewer drain content:', this.contentCache['sewer-drain']);

        const content = this.contentCache['sewer-drain'];

        // Hero section
        if (content.hero) {
            this.updateElement('.sewer-drain-label', content.hero.hero_label);
            this.updateElement('.sewer-drain-hero h1', content.hero.hero_title);
            
            if (content.hero.background_image) {
                const sewerDrainHero = document.querySelector('.sewer-drain-hero');
                if (sewerDrainHero) {
                    sewerDrainHero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${content.hero.background_image}')`;
                }
            }
        }

        // Services overview
        if (content.services_overview) {
            this.updateElement('.overview-label', content.services_overview.section_label);
            this.updateElement('.services-overview h2', content.services_overview.section_title);
            this.updateElement('.overview-text p', content.services_overview.section_description);
            
            if (content.services_overview.overview_image) {
                this.updateElement('.overview-image img', content.services_overview.overview_image, 'src');
            }
        }

        // Main content
        if (content.main_content) {
            this.updateElement('.sewer-drain-content h2', content.main_content.content_title);
            
            const paragraphs = document.querySelectorAll('.sewer-drain-content p');
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
        if (!content) return;
        
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
            console.log(`No elements found for selector: ${selector}`);
            return;
        }
        
        elements.forEach(el => {
            if (type === 'src') {
                el.src = content;
            } else if (type === 'href') {
                el.href = content;
            } else if (type === 'both') {
                // Update both text and href for phone numbers
                el.textContent = content;
                el.href = `tel:${content.replace(/\D/g, '')}`;
            } else if (type === 'html') {
                el.innerHTML = content;
            } else {
                el.textContent = content;
            }
        });
    }

    // Add a refresh button for development
    addRefreshButton() {
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            const refreshBtn = document.createElement('button');
            refreshBtn.textContent = '🔄 Refresh CMS Content';
            refreshBtn.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 9999;
                padding: 10px 20px;
                background: #007bff;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 14px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            `;
            refreshBtn.addEventListener('click', () => {
                console.log('Refreshing CMS content...');
                this.init();
            });
            document.body.appendChild(refreshBtn);
        }
    }
}

// Initialize content loader when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.cmsLoader = new CMSContentLoader();
    });
} else {
    window.cmsLoader = new CMSContentLoader();
}

// Also make it available globally for manual refresh
window.CMSContentLoader = CMSContentLoader;