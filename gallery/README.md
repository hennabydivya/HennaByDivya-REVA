# Gallery Folder Structure

This folder contains all images used across the website. Simply drop your photos into the appropriate folders and they will automatically appear on the site.

## 📁 Folder Structure

```
gallery/
├── mosaic/          # Images for the home page mosaic gallery
├── portfolio/       # Images for the Work page gallery
├── products/        # Product images for the Shop page
└── about/           # Images for the About page
```

## 🎨 How to Add Your Images

### 1. Mosaic Gallery (Home Page)

Drop images in `gallery/mosaic/` with these naming conventions:

- `mosaic-1.jpg` through `mosaic-24.jpg` (or more)
- Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`

**Recommended sizes:**
- Large tiles: 800×800px
- Medium tiles: 800×400px  
- Small tiles: 400×400px

### 2. Portfolio Gallery (Work Page)

Drop images in `gallery/portfolio/` and optionally organize by category:

**Option A: Simple naming**
- `portfolio-1.jpg`, `portfolio-2.jpg`, etc.

**Option B: Category folders**
- `gallery/portfolio/bridal/`
- `gallery/portfolio/traditional/`
- `gallery/portfolio/contemporary/`
- `gallery/portfolio/special/`

**Recommended size:** 600×600px minimum

### 3. Product Images (Shop Page)

Drop images in `gallery/products/`:

- `product-1.jpg` through `product-8.jpg` (matches current products)
- **Recommended size:** 600×600px

### 4. About Page Images

Drop images in `gallery/about/`:

- `portrait.jpg` - Your artist photo
- `about-1.jpg`, `about-2.jpg` - Additional images if needed

**Recommended size:** 800×800px or larger

## 💡 Tips for Best Results

### Image Optimization
1. **Resize images** before uploading (max 1920px width)
2. **Compress images** using tools like:
   - TinyPNG (https://tinypng.com)
   - Squoosh (https://squoosh.app)
   - ImageOptim (Mac)
3. **Target file size:** Under 500KB per image

### Image Quality
- Use **JPG** for photos (smaller file size)
- Use **PNG** for images with transparency
- Use **WebP** for best compression (modern browsers)

### Naming Conventions
- Use lowercase letters
- Use hyphens instead of spaces: `bridal-design-1.jpg`
- Be consistent with numbering: `01, 02, 03` or `1, 2, 3`

## 🔄 How It Works

The website automatically looks for images in these folders:

1. **Mosaic Gallery**: Looks for `mosaic-1.jpg` through `mosaic-24.jpg`
2. **Portfolio**: Looks for `portfolio-*.jpg` files
3. **Products**: Looks for `product-1.jpg` through `product-8.jpg`
4. **About**: Looks for `portrait.jpg`

If an image is missing, a placeholder will show instead.

## 📝 Quick Start Checklist

- [ ] Add at least 12-24 images to `gallery/mosaic/`
- [ ] Add portfolio images to `gallery/portfolio/`
- [ ] Add your portrait to `gallery/about/portrait.jpg`
- [ ] (Optional) Add product photos to `gallery/products/`
- [ ] Refresh your website to see the changes!

## 🎯 Example File Structure

```
gallery/
├── mosaic/
│   ├── mosaic-1.jpg
│   ├── mosaic-2.jpg
│   ├── mosaic-3.jpg
│   └── ... (up to 24 or more)
├── portfolio/
│   ├── bridal/
│   │   ├── bridal-1.jpg
│   │   └── bridal-2.jpg
│   ├── traditional/
│   │   └── traditional-1.jpg
│   └── contemporary/
│       └── contemporary-1.jpg
├── products/
│   ├── product-1.jpg
│   └── product-2.jpg
└── about/
    └── portrait.jpg
```

---

**Need Help?** Check the main README.md in the root folder for more details!

