// About Page Content Loader
// Automatically loads portrait image from about-content folder

document.addEventListener('DOMContentLoaded', function() {
    loadAboutPortrait();
});

function loadAboutPortrait() {
    const portraitPlaceholder = document.querySelector('.portrait-image');
    if (!portraitPlaceholder) return;
    
    const portraitPaths = [
        'about-content/portrait.jpg',
        'about-content/portrait.jpeg',
        'about-content/portrait.png',
        'about-content/portrait.webp'
    ];
    
    tryLoadPortrait(portraitPaths, function(imagePath) {
        if (imagePath) {
            const img = document.createElement('img');
            img.src = imagePath;
            img.alt = 'Henna Artist Portrait';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.display = 'block';
            img.style.opacity = '1';
            
            portraitPlaceholder.innerHTML = '';
            portraitPlaceholder.appendChild(img);
        }
    });
}

function tryLoadPortrait(paths, callback) {
    if (paths.length === 0) {
        callback(null);
        return;
    }

    const img = new Image();
    const currentPath = paths[0];
    
    img.onload = function() {
        callback(currentPath);
    };
    
    img.onerror = function() {
        tryLoadPortrait(paths.slice(1), callback);
    };
    
    img.src = currentPath;
}

