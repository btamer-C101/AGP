# 📝 Decap CMS Usage Guide for American Gulf Plumbing Website

## 🎯 Quick Access
- **Admin Panel**: `https://yoursite.netlify.app/admin`
- **Live Website**: `https://yoursite.netlify.app`

## 🔐 How to Login
1. Go to `yoursite.netlify.app/admin`
2. Click "Login with Netlify Identity"
3. Use your email/password (set up during initial configuration)

## 📚 Content Management Overview

### 🏠 Homepage Content
**Location**: Homepage → Homepage Content

**Editable Sections**:
- **Hero Section**: Main banner with title, description, stats, and image
- **Service Areas**: Information about service coverage
- **Services Section**: Overview of what you do
- **Contact Information**: Phone numbers and address

### 👥 About Us Page
**Location**: About Us Page → About Us Content

**Editable Sections**:
- **Hero Section**: Page banner with title and background image
- **About Content**: Main story with title and multiple paragraphs

### 📞 Contact Page
**Location**: Contact Page → Contact Content

**Editable Sections**:
- **Hero Section**: Page banner with title and background image
- **Contact Information**: Main description and service areas list

### 🔧 Service Pages
**Locations**: 
- Plumbing Services → Plumbing Content
- Sewer Services → Sewer Services Content
- Drain Services → Drain Services Content
- Sewer & Drain Page → Sewer & Drain Content

**Each Service Page Includes**:
- **Hero Section**: Page banner with title and background image
- **Services Overview**: Section about what you do with description and image
- **Main Content**: Detailed content with title and multiple paragraphs

### ⚙️ Global Settings
**Location**: Global Settings → Site Settings

**Editable Elements**:
- **Site Information**: Title, description, tagline
- **Contact Information**: All phone numbers, email, address, hours
- **Social Media**: Facebook, Instagram, LinkedIn URLs
- **Logo & Branding**: Main logo and footer logo

## 🖼️ Managing Images

### Uploading New Images
1. Click on any image field
2. Click "Choose an image"
3. Either upload a new file or select from existing media
4. Images are automatically optimized and stored in `/assets/imgs/`

### Image Guidelines
- **Hero Images**: Recommended size 1200x600px
- **Service Images**: Recommended size 800x500px
- **Logos**: PNG format with transparent background
- **File Size**: Keep under 2MB for faster loading

## ✏️ Editing Text Content

### Short Text Fields
- **Hero Labels**: Short tags like "ABOUT US" or "SERVICES"
- **Titles**: Main headings for sections
- **Button Text**: Text that appears on buttons

### Long Text Fields
- **Descriptions**: Longer paragraphs describing services
- **Content Paragraphs**: Main body content for pages

### Rich Text Guidelines
- Keep paragraphs concise and scannable
- Use clear, benefit-focused language
- Maintain professional tone consistent with brand

## 🔗 Managing Links and Buttons

### Phone Numbers
- Format: `(813) 378-3882`
- Always include area code
- Use consistent formatting across site

### URLs
- Always include `https://` for external links
- For internal links, use relative paths like `/about-us.html`

## 💾 Publishing Changes

### Save Process
1. Make your changes in any section
2. Click "Save" (changes are saved as draft)
3. Click "Publish" to make changes live
4. Website automatically rebuilds (takes 2-3 minutes)

### Review Before Publishing
- Always preview changes in the CMS interface
- Check for typos and formatting
- Ensure images display properly
- Test any new phone numbers or links

## 🚨 Emergency Updates

### Quick Phone Number Changes
1. Go to Global Settings → Site Settings
2. Update Contact Information → Emergency Phone or Main Phone
3. Save and Publish immediately
4. Changes appear site-wide in 2-3 minutes

### Quick Text Updates
1. Navigate to the specific page
2. Find the section you need to update
3. Make changes and publish
4. Refresh your live site to confirm changes

## 🔧 Common Tasks

### Updating Hero Section Text
1. Go to Homepage → Homepage Content
2. Find Hero Section
3. Update Hero Title or Hero Description
4. Save and Publish

### Changing Service Descriptions
1. Navigate to the specific service page
2. Go to Services Overview or Main Content
3. Update the relevant description
4. Save and Publish

### Adding New Images
1. Click on any image field
2. Upload new image (JPG or PNG)
3. Image automatically appears in media library
4. Save and Publish

### Updating Contact Information
1. Go to Global Settings → Site Settings
2. Find Contact Information section
3. Update phone, email, address, or hours
4. Save and Publish (updates across entire site)

## ⚠️ Important Notes

### What NOT to Change
- File names or paths in the CMS
- Technical settings in config.yml
- Widget types or field names

### Backup Best Practices
- Your content is automatically backed up in GitHub
- Always test changes on a staging environment if possible
- Keep a record of major content updates

### Getting Help
- If images don't appear: Check file size (must be under 2MB)
- If changes don't publish: Wait 5 minutes, then check again
- If CMS won't load: Clear browser cache and try again

## 📱 Mobile Considerations
- All text changes automatically work on mobile
- Images are automatically responsive
- Test important changes on mobile devices
- Keep button text short for mobile display

## 🎨 Style Guidelines
- Use consistent capitalization for hero labels (ALL CAPS)
- Keep titles under 10 words when possible
- Maintain professional, trustworthy tone
- Use active voice ("We provide" not "Services are provided")

---

**Need Technical Support?** Contact your web developer for:
- Adding new pages to the CMS
- Changing CMS configuration
- Troubleshooting login issues
- Advanced customizations