// Contact page specific JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // Contact form validation and submission
    function initContactForm() {
        const form = document.querySelector('.contact-form');
        const inputs = form.querySelectorAll('input, textarea');
        const submitBtn = form.querySelector('.submit-btn');
        
        if (!form) return;
        
        // Real-time validation
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
        
        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Validate all required fields
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            // Check checkbox agreement
            const checkbox = form.querySelector('#agree');
            if (!checkbox.checked) {
                showFieldError(checkbox, 'You must agree to the privacy policy');
                isValid = false;
            }
            
            if (isValid) {
                submitForm(form);
            } else {
                // Scroll to first error
                const firstError = form.querySelector('.field-error');
                if (firstError) {
                    firstError.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }
            }
        });
    }
    
    // Field validation
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        const isRequired = field.hasAttribute('required');
        
        clearFieldError(field);
        
        if (isRequired && !value) {
            showFieldError(field, `${getFieldLabel(field)} is required`);
            return false;
        }
        
        // Specific validation rules
        switch (fieldName) {
            case 'firstName':
            case 'lastName':
                if (value && value.length < 2) {
                    showFieldError(field, 'Name must be at least 2 characters');
                    return false;
                }
                break;
                
            case 'email':
                if (value && !window.validateEmail(value)) {
                    showFieldError(field, 'Please enter a valid email address');
                    return false;
                }
                break;
                
            case 'phone':
                if (value && !window.validatePhone(value)) {
                    showFieldError(field, 'Please enter a valid phone number');
                    return false;
                }
                break;
        }
        
        return true;
    }
    
    // Show field error
    function showFieldError(field, message) {
        clearFieldError(field);
        
        field.style.borderColor = '#e74c3c';
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.cssText = `
            color: #e74c3c;
            font-size: 14px;
            margin-top: 5px;
        `;
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    }
    
    // Clear field error
    function clearFieldError(field) {
        field.style.borderColor = '#ddd';
        
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }
    
    // Get field label text
    function getFieldLabel(field) {
        const label = field.parentNode.querySelector('label');
        return label ? label.textContent.replace('*', '').trim() : field.name;
    }
    
    // Form submission
    function submitForm(form) {
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Collect form data
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        // Simulate API call
        setTimeout(() => {
            // Simulate successful submission
            showSuccessMessage();
            form.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
    
    // Show success message
    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 20px;
            border-radius: 5px;
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;
        successDiv.innerHTML = `
            <strong>Message Sent!</strong><br>
            Thank you for contacting us. We'll be in touch soon.
        `;
        
        document.body.appendChild(successDiv);
        
        // Remove after 5 seconds
        setTimeout(() => {
            successDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(successDiv);
            }, 300);
        }, 5000);
    }
    
    // Contact hero animation
    function initContactHeroAnimation() {
        const heroContent = document.querySelector('.contact-hero-content');
        
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                heroContent.style.transition = 'all 0.8s ease';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 300);
        }
    }
    
    // Contact info animations
    function initContactInfoAnimation() {
        const contactInfo = document.querySelector('.contact-info');
        const formContainer = document.querySelector('.contact-form-container');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });
        
        if (contactInfo) {
            contactInfo.style.opacity = '0';
            contactInfo.style.transform = 'translateY(30px)';
            contactInfo.style.transition = 'all 0.6s ease';
            observer.observe(contactInfo);
        }
        
        if (formContainer) {
            formContainer.style.opacity = '0';
            formContainer.style.transform = 'translateY(30px)';
            formContainer.style.transition = 'all 0.6s ease 0.2s';
            observer.observe(formContainer);
        }
    }
    
    // Phone number formatting
    function initPhoneFormatting() {
        const phoneInput = document.querySelector('#phone');
        
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value.length >= 6) {
                    value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
                } else if (value.length >= 3) {
                    value = value.replace(/(\d{3})(\d{3})/, '($1) $2');
                }
                
                e.target.value = value;
            });
        }
    }
    
    // Character counter for message field
    function initMessageCounter() {
        const messageField = document.querySelector('#message');
        
        if (messageField) {
            const counter = document.createElement('div');
            counter.style.cssText = `
                text-align: right;
                font-size: 12px;
                color: #666;
                margin-top: 5px;
            `;
            
            messageField.parentNode.appendChild(counter);
            
            messageField.addEventListener('input', function() {
                const length = this.value.length;
                counter.textContent = `${length}/500 characters`;
                
                if (length > 500) {
                    counter.style.color = '#e74c3c';
                    this.style.borderColor = '#e74c3c';
                } else {
                    counter.style.color = '#666';
                    this.style.borderColor = '#ddd';
                }
            });
            
            // Initialize counter
            messageField.dispatchEvent(new Event('input'));
        }
    }
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize all contact page functionality
    initContactForm();
    initContactHeroAnimation();
    initContactInfoAnimation();
    initPhoneFormatting();
    initMessageCounter();
    
    console.log('Contact page JavaScript initialized');
});