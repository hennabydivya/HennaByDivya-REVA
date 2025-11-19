// Shop Page Scroll-Based Scale Animation
// Sections scale from 20% height at top/bottom to 100% at center
// Creates a "one section in focus at a time" effect

document.addEventListener('DOMContentLoaded', function() {
    const scrollSections = document.querySelectorAll('[data-scroll-section]');
    
    if (scrollSections.length === 0) return;
    
    function updateSectionScales() {
        const windowHeight = window.innerHeight;
        const centerY = windowHeight / 2;
        
        scrollSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionCenterY = rect.top + (rect.height / 2);
            
            // Calculate distance from viewport center
            const distanceFromCenter = Math.abs(centerY - sectionCenterY);
            
            // Calculate scale based on position
            // When at center: scale = 1 (100%)
            // When at edges: scale = 0.2 (20%)
            
            // Use windowHeight as the range for maximum distance
            const maxDistance = windowHeight * 0.8;
            const progress = Math.min(distanceFromCenter / maxDistance, 1);
            
            // Scale from 1.0 (center) to 0.2 (edges)
            const minScale = 0.2;
            const maxScale = 1.0;
            const scale = maxScale - (progress * (maxScale - minScale));
            
            // Keep opacity at 1.0 always - no fade effect
            const opacity = 1.0;
            
            // Apply transforms - use translate3d to force GPU acceleration and prevent blur
            // Round scale to 2 decimal places to avoid sub-pixel rendering
            const roundedScale = Math.round(scale * 100) / 100;
            section.style.transform = `scale(${roundedScale}) translateZ(0)`;
            section.style.opacity = opacity;
        });
    }
    
    // Update on scroll with requestAnimationFrame for smooth performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateSectionScales();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial update
    updateSectionScales();
    
    // Update on resize
    window.addEventListener('resize', updateSectionScales);
});
