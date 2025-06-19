// Enhanced CMS Content Loader for American Gulf Plumbing
// Addresses common static site + CMS integration issues

class EnhancedCMSContentLoader {
    constructor() {
        this.contentCache = {};
        this.basePath = this.getBasePath();
        this.debug = this.isLocalhost();
        this.retryAttempts = 3;
        this.retryDelay = 1000; // 1 second

        if (this.debug) {
            console.log('🔧 CMS Loader Debug Mode Active');
            console.log('📁 Base Path:', this.basePath);
        }
    }

    // Improved base path detection with multiple fallback strategies
    getBasePath() {
        const path = window.location.pathname.toLowerCase();
        const hostname = window.location.hostname;

        // For Netlify and most hosting providers, use absolute path
        if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
            return '/content/';
        }

        // Local development path detection
        if (path.includes('/assets/html/')) {
            return '../../content/';
        }

        return 'content/';
    }

    isLocalhost() {
        const hostname = window.location.hostname;
        return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '';
    }

    // Enhanced cache-busted URL generation
    getCacheBustedUrl(url) {
        // Use deployment ID or timestamp for cache busting
        const cacheBuster = window.NETLIFY_DEPLOY_ID || Date.now();
        const separator = url.includes('?') ? '&' : '?';
        return `${url}${separator}v=${cacheBuster}&t=${Date.now()}`;
    }

    // Robust fetch with retry logic
    async fetchWithRetry(url, options = {}, attempt = 1) {
        try {
            const response = await fetch(url, {
                cache: 'no-store',
                ...options
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return response;
        } catch (error) {
            if (attempt < this.retryAttempts) {
                if (this.debug) {
                    console.warn(`⚠️ Fetch attempt ${attempt} failed, retrying...`, error.message);
                }
                await this.delay(this.retryDelay * attempt);
                return this.fetchWithRetry(url, options, attempt + 1);
            }
            throw error;
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async init() {
        try {
            // Clear any existing cache
            this.contentCache = {};

            if (this.debug) {
                console.log('🚀 Starting CMS content loading...');
            }

            await this.loadAllContent();
            await this.applyContentToPage();

            if (this.debug) {
                console.log('✅ CMS content loaded successfully');
                console.log('📦 Loaded content:', Object.keys(this.contentCache));
            }

            this.addDevelopmentTools();
        } catch (error) {
            console.error('❌ CMS content loading failed:', error);
            if (this.debug) {
                console.log('🔄 Attempting fallback loading strategy...');
                await this.fallbackContentLoading();
            }
        }
    }

    async loadAllContent() {
        const contentFiles = [
            { file: 'homepage.json', key: 'homepage' },
            { file: 'about.json', key: 'about' },
            { file: 'contact-content.json', key: 'contact-content' },
            { file: 'contact.json', key: 'contact' },
            { file: 'plumbing.json', key: 'plumbing' },
            { file: 'sewer-services.json', key: 'sewer-services' },
            { file: 'drain-services.json', key: 'drain-services' },
            { file: 'sewer-drain.json', key: 'sewer-drain' },
            { file: 'images.json', key: 'images' },
            { file: 'social.json', key: 'social' }
        ];

        const loadPromises = contentFiles.map(async ({ file, key }) => {
            try {
                const url = this.getCacheBustedUrl(this.basePath + file);
                const response = await this.fetchWithRetry(url);
                const data = await response.json();

                this.contentCache[key] = data;

                if (this.debug) {
                    console.log(`✅ Loaded ${key}:`, data);
                }
            } catch (error) {
                if (this.debug) {
                    console.warn(`⚠️ Could not load ${file}:`, error.message);
                }
                // Don't throw - allow other files to load
            }
        });

        await Promise.allSettled(loadPromises);
    }

    async applyContentToPage() {
        const currentPage = this.getCurrentPage();

        if (this.debug) {
            console.log('📄 Applying content for page:', currentPage);
        }

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
                this.applyContactPageContent();
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
            default:
                if (this.debug) {
                    console.log('ℹ️ Unknown page type, applying global content only');
                }
        }
    }

    getCurrentPage() {
        const path = window.location.pathname.toLowerCase();
        const filename = path.split('/').pop() || 'index.html';

        // More robust page detection
        if (path === '/' || filename === 'index.html' || filename === '') {
            return 'homepage';
        } else if (filename.includes('about')) {
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

    // Enhanced element update with better error handling
    updateElement(selector, content, type = 'text') {
        if (!content && content !== 0) {
            if (this.debug) {
                console.warn(`⚠️ No content provided for selector: ${selector}`);
            }
            return false;
        }

        const elements = document.querySelectorAll(selector);

        if (elements.length === 0) {
            if (this.debug) {
                console.warn(`⚠️ No elements found for selector: ${selector}`);
            }
            return false;
        }

        let updateCount = 0;
        elements.forEach(el => {
            try {
                switch (type) {
                    case 'src':
                        if (el.tagName === 'IMG' || el.tagName === 'SCRIPT') {
                            el.src = content;
                            updateCount++;
                        }
                        break;
                    case 'href':
                        if (el.tagName === 'A' || el.tagName === 'LINK') {
                            el.href = content;
                            updateCount++;
                        }
                        break;
                    case 'both':
                        // For phone numbers - update both text and href
                        el.textContent = content;
                        if (el.tagName === 'A') {
                            el.href = `tel:${content.replace(/\D/g, '')}`;
                        }
                        updateCount++;
                        break;
                    case 'html':
                        el.innerHTML = content;
                        updateCount++;
                        break;
                    default:
                        el.textContent = content;
                        updateCount++;
                }
            } catch (error) {
                if (this.debug) {
                    console.error(`❌ Error updating element ${selector}:`, error);
                }
            }
        });

        if (this.debug && updateCount > 0) {
            console.log(`✅ Updated ${updateCount} element(s) with selector: ${selector}`);
        }

        return updateCount > 0;
    }

    // Apply global content (contact info, images, social links)
    applyGlobalContent() {
        // Contact information
        if (this.contentCache.contact) {
            const contact = this.contentCache.contact;

            if (contact.emergency_phone) {
                this.updateElement('.phone-number', contact.emergency_phone, 'both');
                this.updateElement('a[href*="866"]', contact.emergency_phone, 'both');
            }

            if (contact.main_phone) {
                this.updateElement('.footer-phone', contact.main_phone, 'both');
                this.updateElement('a[href*="813"]', contact.main_phone, 'both');
            }

            if (contact.email) {
                this.updateElement('a[href*="mailto"]', `mailto:${contact.email}`, 'href');
            }

            if (contact.address1 && contact.address2) {
                this.updateElement('.location p', `${contact.address1},<br>${contact.address2}`, 'html');
            }

            if (contact.hours) {
                this.updateElement('.hours p:first-child', contact.hours);
            }
        }

        // Images
        if (this.contentCache.images) {
            const images = this.contentCache.images;

            Object.entries(images).forEach(([key, src]) => {
                // Try multiple selectors for each image type
                const selectors = this.getImageSelectors(key);
                selectors.forEach(selector => {
                    this.updateElement(selector, src, 'src');
                });
            });
        }

        // Social media links
        if (this.contentCache.social) {
            const social = this.contentCache.social;

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
    }

    getImageSelectors(imageKey) {
        const selectorMap = {
            'main_logo': ['.logo img', '.header img[alt*="logo" i]'],
            'footer_logo': ['.footer-logo img'],
            'hero_van': ['.hero-image img'],
            'service_map': ['.service-map img'],
            // Add more mappings as needed
            // 'hero_image': ['.hero-image img', '.hero-background'],
            // 'about_image': ['.about-image img', '.about-background'],
            // 'contact_image': ['.contact-image img', '.contact-background'],
            'plumbing_image': ['.services-image img'],
            // 'plumbing_image': ['.services-image img', '.plumbing-background'],
            // 'sewer_services_image': ['.sewer-services-image img', '.sewer-services-background'],
            // 'drain_services_image': ['.drain-services-image img', '.drain-services-background'],
            // 'sewer_drain_image': ['.sewer-drain-image img', '.sewer-drain-background']
        };

        return selectorMap[imageKey] || [];
    }

    // Page-specific content application methods
    applyHomepageContent() {
        const content = this.contentCache.homepage;
        if (!content) return;

        if (content.hero) {
            this.updateElement('.hero-label', content.hero.hero_label);
            this.updateElement('.hero-section h1, .hero-title', content.hero.hero_title);
            this.updateElement('.hero-description', content.hero.hero_description);

            if (content.hero.years_stat) {
                this.updateElement('.stat-number', content.hero.years_stat.toString());
            }
        }

        if (content.service_areas) {
            // Update these selectors to be more specific
            this.updateElement('.service-areas .service-label', content.service_areas.section_label);
            this.updateElement('.service-areas .service-content h2', content.service_areas.section_title);
            this.updateElement('.service-areas .service-text > p:not(.service-label)', content.service_areas.section_description);
        }

        if (content.services) {
            this.updateElement('.section-label', content.services.section_label);
            this.updateElement('.section-heading', content.services.section_title);
            this.updateElement('.section-content p:not(.section-label)', content.services.section_description);
        }
    }

    applyAboutContent() {
        const content = this.contentCache.about;
        if (!content) return;

        if (content.hero) {
            this.updateElement('.about-label', content.hero.hero_label);
            this.updateElement('.about-hero h1', content.hero.hero_title);

            if (content.hero.background_image) {
                const heroElement = document.querySelector('.about-hero');
                if (heroElement) {
                    heroElement.style.backgroundImage =
                        `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${content.hero.background_image}')`;
                }
            }
        }

        if (content.content) {
            this.updateElement('.about-content h2', content.content.main_title);

            const paragraphs = document.querySelectorAll('.about-content p');
            [content.content.paragraph_1, content.content.paragraph_2, content.content.paragraph_3]
                .forEach((text, index) => {
                    if (text && paragraphs[index]) {
                        paragraphs[index].innerHTML = text;
                    }
                });
        }
    }

    applyContactPageContent() {
        const content = this.contentCache['contact-content'] || this.contentCache.contact;
        if (!content || !content.hero) return;

        if (content.hero) {
            this.updateElement('.contact-label', content.hero.hero_label);
            this.updateElement('.contact-hero h1', content.hero.hero_title);
        }

        if (content.contact_info) {
            this.updateElement('.contact-info h2', content.contact_info.main_title);
            this.updateElement('.contact-info p:first-of-type', content.contact_info.description);

            if (content.contact_info.areas_title) {
            this.updateElement('.service-areas-title', content.contact_info.areas_title);
        }
        if (content.contact_info.service_areas) {
            this.updateElement('.service-areas-list', content.contact_info.service_areas, 'html');
        }
        }
    }

    applyPlumbingContent() {
        const content = this.contentCache.plumbing;
        if (!content) return;

        if (content.hero) {
            this.updateElement('.plumbing-label', content.hero.hero_label);
            this.updateElement('.plumbing-hero h1', content.hero.hero_title);
        }

        if (content.services_overview) {
            this.updateElement('.services-label', content.services_overview.section_label);
            this.updateElement('.plumbing-services h2', content.services_overview.section_title);
            this.updateElement('.services-text > p:not(.services-label)', content.services_overview.section_description);
        }

        if (content.main_content) {
            this.updateElement('.plumbing-content h2', content.main_content.content_title);

            const paragraphs = document.querySelectorAll('.plumbing-content p');
            [content.main_content.paragraph_1, content.main_content.paragraph_2, content.main_content.paragraph_3]
                .forEach((text, index) => {
                    if (text && paragraphs[index]) {
                        paragraphs[index].innerHTML = text;
                    }
                });
        }
    }

    applySewerServicesContent() {
        const content = this.contentCache['sewer-services'];
        if (!content) return;

        if (content.hero) {
            this.updateElement('.sewer-services-label', content.hero.hero_label);
            this.updateElement('.sewer-services-hero h1', content.hero.hero_title);
        }

        if (content.services_overview) {
            this.updateElement('.overview-label', content.services_overview.section_label);
            this.updateElement('.services-overview h2', content.services_overview.section_title);
            this.updateElement('.overview-text > p:not(.overview-label)', content.services_overview.section_description);
        }
    }

    applyDrainServicesContent() {
        const content = this.contentCache['drain-services'];
        if (!content) return;

        if (content.hero) {
            this.updateElement('.drain-services-label', content.hero.hero_label);
            this.updateElement('.drain-services-hero h1', content.hero.hero_title);
        }

        if (content.services_overview) {
            this.updateElement('.overview-label', content.services_overview.section_label);
            this.updateElement('.services-overview h2', content.services_overview.section_title);
            this.updateElement('.overview-text > p:not(.overview-label)', content.services_overview.section_description);
        }
    }

    applySewerDrainContent() {
        const content = this.contentCache['sewer-drain'];
        if (!content) return;

        if (content.hero) {
            this.updateElement('.sewer-drain-label', content.hero.hero_label);
            this.updateElement('.sewer-drain-hero h1', content.hero.hero_title);
        }

        if (content.services_overview) {
            this.updateElement('.overview-label', content.services_overview.section_label);
            this.updateElement('.services-overview h2', content.services_overview.section_title);
            this.updateElement('.overview-text > p:not(.overview-label)', content.services_overview.section_description);
        }
    }

    // Fallback content loading strategy
    async fallbackContentLoading() {
        console.log('🔄 Attempting fallback loading...');

        // Try loading from different base paths
        const fallbackPaths = ['/content/', './content/', '../content/', '../../content/'];

        for (const path of fallbackPaths) {
            try {
                const response = await fetch(path + 'homepage.json?t=' + Date.now());
                if (response.ok) {
                    console.log(`✅ Fallback path working: ${path}`);
                    this.basePath = path;
                    await this.loadAllContent();
                    await this.applyContentToPage();
                    return;
                }
            } catch (error) {
                continue;
            }
        }

        console.error('❌ All fallback loading strategies failed');
    }

    // Development tools
    addDevelopmentTools() {
        if (!this.debug) return;

        // Add refresh button for development
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
            console.log('🔄 Manual CMS content refresh...');
            this.init();
        });

        document.body.appendChild(refreshBtn);

        // Add global reference for debugging
        window.cmsLoader = this;
        window.refreshCMS = () => this.init();
    }
}

// Initialize the enhanced CMS loader
function initializeCMSLoader() {
    const loader = new EnhancedCMSContentLoader();
    loader.init();
    return loader;
}

// Multiple initialization strategies to ensure loading
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCMSLoader);
} else {
    // DOM already loaded
    initializeCMSLoader();
}

// Backup initialization after window load
window.addEventListener('load', () => {
    if (!window.cmsLoader) {
        console.log('🔄 Backup CMS initialization...');
        initializeCMSLoader();
    }
});

// Export for manual usage
window.EnhancedCMSContentLoader = EnhancedCMSContentLoader;