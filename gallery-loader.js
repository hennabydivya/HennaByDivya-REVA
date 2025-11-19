// ===== Gallery Image Loader =====
// This script automatically loads images from the gallery folders

// Configuration
const GALLERY_CONFIG = {
    mosaic: {
        folder: 'gallery/mosaic/',
        prefix: 'mosaic-',
        count: 24,
        extensions: ['jpg', 'jpeg', 'png', 'webp']
    },
    portfolio: {
        folder: 'gallery/portfolio/',
        prefix: 'portfolio-',
        count: 15,
        extensions: ['jpg', 'jpeg', 'png', 'webp'],
        categories: {
            bridal: 'gallery/portfolio/bridal/',
            traditional: 'gallery/portfolio/traditional/',
            contemporary: 'gallery/portfolio/contemporary/',
            special: 'gallery/portfolio/special/'
        }
    },
    products: {
        folder: 'gallery/products/',
        prefix: 'product-',
        count: 8,
        extensions: ['jpg', 'jpeg', 'png', 'webp']
    },
    about: {
        folder: 'gallery/about/',
        files: ['portrait.jpg', 'portrait.jpeg', 'portrait.png', 'portrait.webp']
    }
};

// Function to try loading an image
function tryLoadImage(paths, callback) {
    if (paths.length === 0) {
        callback(null);
        return;
    }

    const img = new Image();
    const currentPath = paths[0];
    
    // Add cache-busting parameter to force fresh load
    const cacheBuster = '?v=' + new Date().getTime();
    
    img.onload = function() {
        callback(currentPath);
    };
    
    img.onerror = function() {
        tryLoadImage(paths.slice(1), callback);
    };
    
    img.src = currentPath + cacheBuster;
}

// Function to get possible image paths
function getImagePaths(config, index) {
    const paths = [];
    const filename = config.prefix + (index + 1);
    
    config.extensions.forEach(ext => {
        paths.push(config.folder + filename + '.' + ext);
    });
    
    return paths;
}

// Load Mosaic Gallery Images
function loadMosaicGallery() {
    const mosaicItems = document.querySelectorAll('.mosaic-item');
    
    mosaicItems.forEach((item, index) => {
        if (index >= GALLERY_CONFIG.mosaic.count) return;
        
        const placeholder = item.querySelector('.mosaic-placeholder');
        if (!placeholder) return;
        
        const paths = getImagePaths(GALLERY_CONFIG.mosaic, index);
        
        tryLoadImage(paths, function(imagePath) {
            if (imagePath) {
                const img = document.createElement('img');
                img.src = imagePath;
                img.alt = `Gallery Image ${index + 1}`;
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                img.style.display = 'block';
                img.style.opacity = '1';
                
                placeholder.innerHTML = '';
                placeholder.appendChild(img);
            }
        });
    });
}

// Load Portfolio Gallery Images
function loadPortfolioGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        const placeholder = item.querySelector('.gallery-image-placeholder');
        if (!placeholder) return;
        
        // Get category from data attribute
        const category = item.getAttribute('data-category');
        let paths = [];
        
        // Try category-specific folder first
        if (category && GALLERY_CONFIG.portfolio.categories[category]) {
            const categoryFolder = GALLERY_CONFIG.portfolio.categories[category];
            const categoryPrefix = category + '-';
            
            // Look for category-specific images (e.g., bridal-1.jpg, bridal-2.jpg)
            GALLERY_CONFIG.portfolio.extensions.forEach(ext => {
                for (let i = 1; i <= 10; i++) {
                    paths.push(categoryFolder + categoryPrefix + i + '.' + ext);
                }
            });
        }
        
        // Also try main portfolio folder
        const mainPaths = getImagePaths(GALLERY_CONFIG.portfolio, index);
        paths = paths.concat(mainPaths);
        
        tryLoadImage(paths, function(imagePath) {
            if (imagePath) {
                const img = document.createElement('img');
                img.src = imagePath;
                img.alt = `Portfolio Image ${index + 1}`;
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                img.style.display = 'block';
                img.style.opacity = '1';
                
                placeholder.innerHTML = '';
                placeholder.appendChild(img);
            }
        });
    });
}

// Load Product Images
function loadProductImages() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach((card, index) => {
        if (index >= GALLERY_CONFIG.products.count) return;
        
        const placeholder = card.querySelector('.product-placeholder');
        if (!placeholder) return;
        
        const paths = getImagePaths(GALLERY_CONFIG.products, index);
        
        tryLoadImage(paths, function(imagePath) {
            if (imagePath) {
                const img = document.createElement('img');
                img.src = imagePath;
                img.alt = `Product ${index + 1}`;
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                img.style.display = 'block';
                img.style.opacity = '1';
                
                placeholder.innerHTML = '';
                placeholder.appendChild(img);
            }
        });
    });
}

// Load About Page Portrait
function loadAboutPortrait() {
    const imagePlaceholder = document.querySelector('.about-image-section .image-placeholder');
    if (!imagePlaceholder) return;
    
    const paths = GALLERY_CONFIG.about.files.map(file => 
        GALLERY_CONFIG.about.folder + file
    );
    
    tryLoadImage(paths, function(imagePath) {
        if (imagePath) {
            const img = document.createElement('img');
            img.src = imagePath;
            img.alt = 'Artist Portrait';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.display = 'block';
            img.style.opacity = '1';
            
            imagePlaceholder.innerHTML = '';
            imagePlaceholder.appendChild(img);
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Detect which page we're on and load appropriate images
    if (document.querySelector('.mosaic-container')) {
        loadMosaicGallery();
    }
    
    if (document.querySelector('.gallery-grid')) {
        loadPortfolioGallery();
    }
    
    if (document.querySelector('.products-grid')) {
        loadProductImages();
    }
    
    if (document.querySelector('.about-image-section')) {
        loadAboutPortrait();
    }
});

// Export for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadMosaicGallery,
        loadPortfolioGallery,
        loadProductImages,
        loadAboutPortrait
    };
}

