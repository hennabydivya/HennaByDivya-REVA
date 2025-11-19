// ===== Mobile Navigation Toggle =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ===== Gallery Filtering (for Work page) =====
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                // Show all items if "all" is selected
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    // Check if item matches the filter
                    if (item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
}

// ===== Initialize gallery items with animation =====
if (galleryItems.length > 0) {
    galleryItems.forEach((item, index) => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    });
}

// ===== Mosaic Gallery Animation (for Home page) =====
const mosaicItems = document.querySelectorAll('.mosaic-item');

if (mosaicItems.length > 0) {
    mosaicItems.forEach((item, index) => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    });
}

// ===== Lightbox Functionality =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');

// Add click handlers for both gallery and mosaic items
const clickableItems = [...galleryItems, ...mosaicItems];

if (clickableItems.length > 0 && lightbox) {
    clickableItems.forEach(item => {
        item.addEventListener('click', () => {
            // Get the actual image from the item
            const img = item.querySelector('img');
            
            if (img && lightboxImg) {
                // Set the lightbox image to the clicked image
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
}

if (lightboxClose && lightbox) {
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (lightbox && e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ===== Navbar stays transparent (removed scroll behavior) =====
// Navbar now always stays transparent with gradient background

// ===== Contact Form Handling =====
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone')?.value || '',
            service: document.getElementById('service')?.value || '',
            date: document.getElementById('date')?.value || '',
            message: document.getElementById('message').value
        };

        // In a real implementation, you would send this data to a server
        console.log('Form submitted:', formData);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// ===== Newsletter Form Handling =====
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        console.log('Newsletter subscription:', email);
        alert('Thank you for subscribing! You will receive updates on new products and offers.');
        
        newsletterForm.reset();
    });
}

// ===== Add to Cart Functionality =====
const addToCartButtons = document.querySelectorAll('.add-to-cart');

if (addToCartButtons.length > 0) {
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            const productCard = button.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            
            // In a real implementation, you would add to cart and manage state
            console.log('Added to cart:', productName, productPrice);
            
            // Visual feedback
            button.textContent = 'Added!';
            button.style.background = '#4CAF50';
            
            setTimeout(() => {
                button.textContent = 'Add to Cart';
                button.style.background = '';
            }, 2000);
        });
    });
}

// ===== Scroll Reveal Animation for page sections =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for scroll animations
const animatedSections = document.querySelectorAll('.philosophy-section, .services-section, .shop-info, .newsletter-section, .contact-intro');

animatedSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s ease';
    observer.observe(section);
});

// ===== Smooth scrolling for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Active page indicator in navigation =====
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// ===== Preload Images (For when you add real images) =====
function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        const src = img.getAttribute('data-src');
        if (src) {
            const loadImage = new Image();
            loadImage.src = src;
            loadImage.onload = () => {
                img.src = src;
                img.removeAttribute('data-src');
                img.style.opacity = '1';
            };
        }
    });
}

// Call preload when DOM is ready
document.addEventListener('DOMContentLoaded', preloadImages);

// ===== Animation for philosophy and service items =====
const animateOnScroll = () => {
    const items = document.querySelectorAll('.philosophy-item, .service-item, .product-card');
    
    items.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight - 100) {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
};

// Initialize items
document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.philosophy-item, .service-item, .product-card');
    items.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease';
    });
    
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});
