// cms-integration.js - Add this to your common.js or create a separate file

// Function to load and apply CMS content
async function loadCMSContent() {
    try {
        // Load settings from CMS
        const settings = await loadYAMLFile('_data/settings.yml');
        
        // Apply global settings
        if (settings) {
            applyGlobalSettings(settings);
        }

        // Load page-specific content based on current page
        const currentPage = getCurrentPage();
        await loadPageContent(currentPage);

    } catch (error) {
        console.log('CMS content not available, using default content');
    }
}

// Determine current page
function getCurrentPage() {
    const path = window.location.pathname;
    
    if (path === '/' || path.includes('index.html')) {
        return 'homepage';
    } else if (path.includes('about-us.html')) {
        return 'about';
    } else if (path.includes('contact.html')) {
        return 'contact';
    } else if (path.includes('plumbing.html')) {
        return 'plumbing';
    } else if (path.includes('sewer-services.html')) {
        return 'sewer_services';
    } else if (path.includes('drain-services.html')) {
        return 'drain_services';
    } else if (path.includes('sewer-drain')) {
        return 'sewer_drain';
    }
    return null;
}

// Apply global settings to all pages
function applyGlobalSettings(settings) {
    // Update site title
    if (settings.site_title) {
        document.title = settings.site_title;
    }

    // Update contact information across the site
    if (settings.contact) {
        // Update phone numbers
        const phoneElements = document.querySelectorAll('.phone-number, .footer-phone');
        phoneElements.forEach(el => {
            if (settings.contact.main_phone) {
                el.textContent = settings.contact.main_phone;
                el.href = `tel:${settings.contact.main_phone.replace(/\D/g, '')}`;
            }
        });

        // Update emergency phone
        const emergencyElements = document.querySelectorAll('a[href*="866-374-0402"], a[href*="8663740402"]');
        emergencyElements.forEach(el => {
            if (settings.contact.emergency_phone) {
                el.textContent = settings.contact.emergency_phone;
                el.href = `tel:${settings.contact.emergency_phone.replace(/\D/g, '')}`;
            }
        });

        // Update address
        const addressElements = document.querySelectorAll('.location p');
        if (settings.contact.address && addressElements.length > 0) {
            addressElements[0].innerHTML = settings.contact.address.replace(/\n/g, '<br>');
        }

        // Update business hours
        const hoursElements = document.querySelectorAll('.hours p');
        if (settings.contact.hours && hoursElements.length > 1) {
            hoursElements[0].textContent = settings.contact.hours;
        }
    }

    // Update social media links
    if (settings.social) {
        const socialLinks = {
            'facebook': settings.social.facebook,
            'instagram': settings.social.instagram,
            'linkedin': settings.social.linkedin
        };

        Object.entries(socialLinks).forEach(([platform, url]) => {
            if (url) {
                const socialElement = document.querySelector(`a[href*="${platform}"]`);
                if (socialElement) {
                    socialElement.href = url;
                }
            }
        });
    }

    // Update logos
    if (settings.branding) {
        // Main logo
        if (settings.branding.main_logo) {
            const mainLogos = document.querySelectorAll('.logo img, .header img[alt*="logo" i]');
            mainLogos.forEach(img => {
                img.src = settings.branding.main_logo;
            });
        }

        // Footer logo
        if (settings.branding.footer_logo) {
            const footerLogos = document.querySelectorAll('.footer-logo img');
            footerLogos.forEach(img => {
                img.src = settings.branding.footer_logo;
            });
        }
    }

    // Update tagline
    if (settings.tagline) {
        const taglineElements = document.querySelectorAll('.footer-tagline');
        taglineElements.forEach(el => {
            el.textContent = settings.tagline;
        });
    }
}

// Load page-specific content
async function loadPageContent(pageName) {
    if (!pageName) return;

    // This is a simplified approach - in production, you'd want to use a static site generator
    // For now, we'll update key elements that are commonly changed

    switch (pageName) {
        case 'homepage':
            await loadHomepageContent();
            break;
        case 'about':
            await loadAboutContent();
            break;
        case 'contact':
            await loadContactContent();
            break;
        case 'plumbing':
        case 'sewer_services':
        case 'drain_services':
        case 'sewer_drain':
            await loadServicePageContent(pageName);
            break;
    }
}

// Homepage content loader
async function loadHomepageContent() {
    // This would need to be implemented with your specific approach
    // Options: 1) Use a static site generator, 2) Store content in JSON, 3) Use JavaScript templating
    console.log('Loading homepage content from CMS...');
}

// About page content loader
async function loadAboutContent() {
    console.log('Loading about page content from CMS...');
}

// Contact page content loader
async function loadContactContent() {
    console.log('Loading contact page content from CMS...');
}

// Service pages content loader
async function loadServicePageContent(servicePage) {
    console.log(`Loading ${servicePage} content from CMS...`);
}

// Utility function to load YAML files (requires js-yaml library)
async function loadYAMLFile(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const yamlText = await response.text();
        
        // You'll need to include js-yaml library for this to work
        // Add this to your HTML: <script src="https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/dist/js-yaml.min.js"></script>
        if (typeof jsyaml !== 'undefined') {
            return jsyaml.load(yamlText);
        }
        
        return null;
    } catch (error) {
        console.error('Error loading YAML file:', error);
        return null;
    }
}

// Initialize CMS content loading when page loads
document.addEventListener('DOMContentLoaded', loadCMSContent);