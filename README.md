# Henna By Divya - Multi-Page Art Portfolio Website

A classy, elegant multi-page art portfolio website featuring a stunning mosaic gallery layout, designed to showcase henna artwork with modern aesthetics and smooth user experience.

## 🎨 Website Structure

The website consists of 5 main pages:

1. **Home (index.html)** - Mosaic gallery landing page with varied image sizes
2. **About (about.html)** - Artist biography, philosophy, and services
3. **Work (work.html)** - Full portfolio with filterable gallery
4. **Shop (shop.html)** - E-commerce page for products and prints
5. **Get in Touch (contact.html)** - Comprehensive contact form and information

## ✨ Features

### Design & Layout
- **Full-Width Mosaic Gallery**: Edge-to-edge dynamic grid with no visible background
- **Variable Tile Sizes**: Small, medium, and large tiles for visual interest
- **Configurable Gaps**: Control spacing between images via CSS variable
- **Transparent Navbar**: Adjustable opacity and blur for modern glass effect
- **Classy Aesthetics**: Sophisticated color palette with earth tones and gold accents
- **Responsive Design**: Fully responsive across all devices (desktop, tablet, mobile)
- **Smooth Animations**: Elegant scroll animations and hover effects

### Functionality
- **Gallery Filtering**: Filter artwork by category (Bridal, Traditional, Contemporary, Special Events)
- **Lightbox Viewer**: Click-to-enlarge functionality for images
- **Mobile Navigation**: Hamburger menu for seamless mobile experience
- **Contact Form**: Comprehensive inquiry form with service selection and date picker
- **Shop Features**: Product cards with add-to-cart functionality
- **Newsletter Signup**: Email subscription form

## 🚀 Getting Started

### Quick Start

1. Open `index.html` in your web browser
2. Navigate through pages using the top navigation menu
3. All pages are fully functional with placeholder content

### File Structure

```
Henna By Divya/
│
├── index.html          # Home page with mosaic gallery
├── about.html          # About page
├── work.html           # Portfolio/Work page
├── shop.html           # Shop page
├── contact.html        # Contact page
├── styles.css          # All styling and responsive design
├── script.js           # Interactive functionality
├── gallery-loader.js   # Automatic image loader
├── README.md           # This file
└── gallery/            # ← DROP YOUR IMAGES HERE
    ├── mosaic/         # Home page images
    ├── portfolio/      # Work page images
    ├── products/       # Shop page images
    └── about/          # Your portrait
```

## 📝 Customization Guide

### 1. Adding Your Images - SUPER EASY! 🎉

**No code editing needed!** Just drop your photos into the gallery folders:

```
gallery/
├── mosaic/          → Home page mosaic gallery (24 images)
├── portfolio/       → Work page gallery (15 images)
├── products/        → Shop page products (8 images)
└── about/           → Your portrait photo
```

#### Quick Start:

1. **Name your images** with this pattern:
   - Mosaic: `mosaic-1.jpg`, `mosaic-2.jpg`, ... `mosaic-24.jpg`
   - Portfolio: `portfolio-1.jpg`, `portfolio-2.jpg`, ... `portfolio-15.jpg`
   - Products: `product-1.jpg`, `product-2.jpg`, ... `product-8.jpg`
   - Portrait: `portrait.jpg` in the `about` folder

2. **Drop them** in the correct folder

3. **Refresh** your browser - Done! ✨

The website automatically finds and displays your images. If an image is missing, it shows a placeholder instead.

**Supported formats:** `.jpg`, `.jpeg`, `.png`, `.webp`

**Tip:** See `gallery/README.md` for detailed instructions and recommendations!

### 2. Update Personal Information

#### Contact Details (contact.html)

Lines to update:
- Email: `hello@hennabydivya.com`
- Phone: `+1 (555) 123-4567`
- Location: `Serving [Your Area]`
- Social media links

#### About Section (about.html)

Update the text content:
- Artist biography
- Journey and philosophy
- Services offered
- Add your portrait image

### 3. Customize Colors & Layout

Edit CSS variables in `styles.css` at the top of the file:

```css
:root {
    /* Colors */
    --primary-color: #2c2c2c;      /* Main dark color */
    --secondary-color: #8b7355;    /* Brown accent */
    --accent-color: #d4a574;       /* Gold accent */
    --light-bg: #faf9f7;           /* Background color */
    --white: #ffffff;
    --text-dark: #333333;          /* Main text color */
    --text-light: #666666;         /* Secondary text */
    
    /* Mosaic Gallery Controls */
    --mosaic-gap: 0px;             /* Gap between images (0px = no gaps, try 5px, 10px, 20px) */
    
    /* Navbar Transparency */
    --navbar-opacity: 0.95;        /* 0 = fully transparent, 1 = solid */
    --navbar-blur: 10px;           /* Blur effect (0px = no blur, 20px = heavy blur) */
}
```

**Examples:**
- **No gaps between images**: `--mosaic-gap: 0px;` ✅ (current - seamless)
- **Small gaps**: `--mosaic-gap: 5px;`
- **Medium gaps**: `--mosaic-gap: 15px;`
- **Large gaps**: `--mosaic-gap: 30px;`

- **Fully transparent navbar**: `--navbar-opacity: 0;` ✅ (current - text is white with shadow)
- **Semi-transparent**: `--navbar-opacity: 0.7;`
- **Solid navbar**: `--navbar-opacity: 1;`

**Note:** The navbar stays transparent with a gradient overlay from the top for better text visibility. The gradient can be customized in the `.navbar::before` CSS rule.

### 4. Modify Mosaic Layout

The mosaic uses three size classes:
- `.mosaic-item.small` - 1 column × 1 row
- `.mosaic-item.medium` - 2 columns × 1 row
- `.mosaic-item.large` - 2 columns × 2 rows

Change the size by modifying the class in `index.html`:

```html
<div class="mosaic-item large" data-category="bridal">
    <!-- Large tile -->
</div>

<div class="mosaic-item small" data-category="traditional">
    <!-- Small tile -->
</div>
```

### 5. Add/Remove Gallery Categories

Update filter buttons in `work.html`:

```html
<button class="filter-btn" data-filter="yourcategory">Your Category</button>
```

Update gallery items with matching category:

```html
<div class="gallery-item" data-category="yourcategory">
```

### 6. Shop Products

To add more products in `shop.html`, copy and paste a product card:

```html
<div class="product-card">
    <div class="product-image">
        <div class="product-placeholder">
            <span>Your Product</span>
        </div>
        <div class="product-badge">New</div> <!-- Optional -->
    </div>
    <div class="product-info">
        <h3>Product Name</h3>
        <p class="product-description">Product description here</p>
        <div class="product-footer">
            <span class="product-price">$XX.00</span>
            <button class="add-to-cart">Add to Cart</button>
        </div>
    </div>
</div>
```

## 🎨 Typography

The website uses two Google Fonts:
- **Cormorant Garamond** - For headings and elegant display text
- **Montserrat** - For body text and navigation

To change fonts:
1. Visit [Google Fonts](https://fonts.google.com)
2. Select your fonts
3. Replace the font links in all HTML files (in the `<head>` section)
4. Update font-family in `styles.css`

## 🌐 Deployment Options

### GitHub Pages (Free)

1. Create a GitHub repository
2. Push all files to the repository
3. Go to Settings > Pages
4. Select your branch and save
5. Your site will be live at `https://yourusername.github.io/repository-name`

### Netlify (Free)

1. Create a [Netlify](https://netlify.com) account
2. Drag and drop your folder to Netlify
3. Site is live instantly with custom domain options

### Vercel (Free)

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts

## 💡 Advanced Features to Implement

### Backend Integration

#### Contact Form
Currently shows an alert. To make it functional:
- Use [Formspree](https://formspree.io) for simple email forwarding
- Or integrate with your own backend (Node.js, PHP, etc.)
- Update form handling in `script.js` (contact form section)

#### Shop Functionality
To add real e-commerce:
- Integrate with Shopify, WooCommerce, or Stripe
- Add shopping cart state management
- Implement checkout process

#### Newsletter
Use services like:
- Mailchimp
- ConvertKit
- EmailOctopus

### SEO Optimization

Add to each HTML file's `<head>`:

```html
<meta name="description" content="Your description here">
<meta name="keywords" content="henna, art, bridal, mehndi">
<meta property="og:title" content="Henna By Divya">
<meta property="og:image" content="path-to-image.jpg">
```

### Analytics

Add Google Analytics or similar:

```html
<!-- Before closing </head> tag -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-ID"></script>
```

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Grid, Flexbox, custom properties
- **Vanilla JavaScript** - No frameworks, pure performance
- **Google Fonts** - Cormorant Garamond & Montserrat

## 📸 Image Optimization Tips

For best performance:
1. Optimize images before uploading (max 1920px width for large images)
2. Use WebP format for better compression
3. Compress JPG/PNG files using tools like TinyPNG
4. Consider lazy loading for better initial page load
5. Use appropriate image sizes:
   - Large mosaic tiles: 800×800px
   - Medium tiles: 800×400px
   - Small tiles: 400×400px
   - Product images: 600×600px

## 🎯 Performance Tips

- Keep image file sizes under 500KB each
- Minimize use of animations on mobile
- Consider using a CDN for hosting images
- Enable browser caching
- Minify CSS and JavaScript for production

## 📋 Checklist Before Launch

- [ ] Replace all placeholder images
- [ ] Update all contact information
- [ ] Customize About page content
- [ ] Add your actual products to Shop
- [ ] Test contact form
- [ ] Update social media links
- [ ] Test on mobile devices
- [ ] Optimize all images
- [ ] Add favicon
- [ ] Set up analytics
- [ ] Test all navigation links

## 🆘 Support & Questions

All code is well-commented and organized. If you need help:
- Review the inline comments in the code
- Check browser console for JavaScript errors
- Ensure all file paths are correct
- Verify images are in the correct directory

## 📄 License

This website template is free to use for your personal portfolio.

---

**Enjoy showcasing your beautiful art with style!** ✨

Created with care for artists who value elegance and functionality.
