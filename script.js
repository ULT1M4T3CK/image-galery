// Slideshow functionality
let currentSlide = 0;
let autoplayInterval;
let isAutoplayActive = false;
let slides = document.querySelectorAll('.slide');
let thumbnails = document.querySelectorAll('.thumbnail');
let totalSlides = slides.length;

// Initialize the slideshow
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing slideshow');
    updateSlideCounter();
    setupKeyboardNavigation();
    setupTouchNavigation();
    preloadImages();
    
    // Setup all event listeners
    reattachEventListeners();
});

// Function to change slide
function changeSlide(direction) {
    console.log('changeSlide called with direction:', direction);
    const currentTotalSlides = galleryImages.length;
    console.log('Current slide:', currentSlide, 'Total slides:', currentTotalSlides);
    const newSlide = (currentSlide + direction + currentTotalSlides) % currentTotalSlides;
    console.log('Going to slide:', newSlide);
    goToSlide(newSlide);
}

// Function to go to specific slide
function goToSlide(slideIndex) {
    console.log('goToSlide called with index:', slideIndex);
    
    // Get current slides and thumbnails (they might have been updated)
    const currentSlides = document.querySelectorAll('.slide');
    const currentThumbnails = document.querySelectorAll('.thumbnail');
    
    console.log('Found', currentSlides.length, 'slides and', currentThumbnails.length, 'thumbnails');
    
    // Remove active class from current slide and thumbnail
    if (currentSlides[currentSlide]) {
        currentSlides[currentSlide].classList.remove('active');
        console.log('Removed active from slide', currentSlide);
    }
    if (currentThumbnails[currentSlide]) {
        currentThumbnails[currentSlide].classList.remove('active');
        console.log('Removed active from thumbnail', currentSlide);
    }
    
    // Update current slide
    currentSlide = slideIndex;
    console.log('Current slide updated to:', currentSlide);
    
    // Add active class to new slide and thumbnail
    if (currentSlides[currentSlide]) {
        currentSlides[currentSlide].classList.add('active');
        console.log('Added active to slide', currentSlide);
    }
    if (currentThumbnails[currentSlide]) {
        currentThumbnails[currentSlide].classList.add('active');
        console.log('Added active to thumbnail', currentSlide);
    }
    
    // Update slide counter
    updateSlideCounter();
    
    // Scroll thumbnail into view if needed
    scrollThumbnailIntoView();
}

// Update slide counter display
function updateSlideCounter() {
    const currentTotalSlides = galleryImages.length;
    document.getElementById('current-slide').textContent = currentSlide + 1;
    document.getElementById('total-slides').textContent = currentTotalSlides;
}

// Toggle autoplay functionality
function toggleAutoplay() {
    console.log('Toggle autoplay called, current state:', isAutoplayActive);
    
    const autoplayIcon = document.getElementById('autoplay-icon');
    const autoplayText = document.getElementById('autoplay-text');
    
    if (isAutoplayActive) {
        stopAutoplay();
        autoplayIcon.className = 'fas fa-play';
        autoplayText.textContent = 'Autoplay';
    } else {
        startAutoplay();
        autoplayIcon.className = 'fas fa-pause';
        autoplayText.textContent = 'Pause';
    }
}

// Start autoplay
function startAutoplay() {
    console.log('Starting autoplay');
    isAutoplayActive = true;
    autoplayInterval = setInterval(() => {
        console.log('Autoplay: changing slide');
        changeSlide(1);
    }, 4000); // Change slide every 4 seconds
}

// Stop autoplay
function stopAutoplay() {
    console.log('Stopping autoplay');
    isAutoplayActive = false;
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
    }
}

// Setup keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(event) {
        switch(event.key) {
            case 'ArrowLeft':
                event.preventDefault();
                changeSlide(-1);
                break;
            case 'ArrowRight':
                event.preventDefault();
                changeSlide(1);
                break;
            case ' ':
                event.preventDefault();
                toggleAutoplay();
                break;
            case 'Escape':
                stopAutoplay();
                break;
        }
    });
}

// Setup touch navigation for mobile devices
function setupTouchNavigation() {
    const slideshowContainer = document.querySelector('.slideshow-container');
    let startX = 0;
    let endX = 0;
    
    slideshowContainer.addEventListener('touchstart', function(event) {
        startX = event.touches[0].clientX;
    });
    
    slideshowContainer.addEventListener('touchend', function(event) {
        endX = event.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                changeSlide(1);
            } else {
                // Swipe right - previous slide
                changeSlide(-1);
            }
        }
    }
}

// Scroll thumbnail into view
function scrollThumbnailIntoView() {
    const activeThumbnail = thumbnails[currentSlide];
    const thumbnailContainer = document.querySelector('.thumbnail-container');
    
    if (activeThumbnail) {
        const containerRect = thumbnailContainer.getBoundingClientRect();
        const thumbnailRect = activeThumbnail.getBoundingClientRect();
        
        if (thumbnailRect.left < containerRect.left || thumbnailRect.right > containerRect.right) {
            activeThumbnail.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }
}

// Preload images for smooth transitions
function preloadImages() {
    const imageUrls = [
        'images/IMG-20230805-WA0004.jpg',
        'images/IMG-20230805-WA0006.jpg',
        'images/IMG-20230805-WA0008.jpg',
        'images/IMG-20230805-WA0011.jpg',
        'images/IMG-20230805-WA0012.jpg',
        'images/IMG-20230805-WA0018.jpg',
        'images/IMG-20230805-WA0019.jpg',
        'images/IMG-20230805-WA0020.jpg',
        'images/IMG-20230805-WA0021.jpg',
        'images/IMG-20230805-WA0022.jpg',
        'images/IMG-20230805-WA0023.jpg',
        'images/IMG-20231130-WA0006.jpg',
        'images/IMG-20231130-WA0007.jpg',
        'images/IMG-20231130-WA0014.jpg',
        'images/IMG-20231130-WA0017.jpg',
        'images/IMG-20231130-WA0018.jpg',
        'images/IMG-20231130-WA0020.jpg',
        'images/IMG-20231130-WA0022.jpg',
        'images/IMG-20231130-WA0024.jpg',
        'images/IMG-20231130-WA0025.jpg',
        'images/IMG-20231130-WA0026.jpg',
        'images/IMG20240730162629.jpg'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Add smooth hover effects for thumbnails
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('mouseenter', function() {
        if (index !== currentSlide) {
            this.style.transform = 'scale(1.1)';
        }
    });
    
    thumbnail.addEventListener('mouseleave', function() {
        if (index !== currentSlide) {
            this.style.transform = 'scale(1)';
        }
    });
});

// Add click outside to pause autoplay
document.addEventListener('click', function(event) {
    const slideshowContainer = document.querySelector('.slideshow-container');
    const controls = document.querySelector('.controls');
    
    if (!slideshowContainer.contains(event.target) && !controls.contains(event.target)) {
        if (isAutoplayActive) {
            stopAutoplay();
            const autoplayIcon = document.getElementById('autoplay-icon');
            const autoplayText = document.getElementById('autoplay-text');
            autoplayIcon.className = 'fas fa-play';
            autoplayText.textContent = 'Autoplay';
        }
    }
});

// Add loading animation for images
function addLoadingAnimation() {
    const slideshowContainer = document.querySelector('.slideshow-container');
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading';
    loadingDiv.style.position = 'absolute';
    loadingDiv.style.top = '50%';
    loadingDiv.style.left = '50%';
    loadingDiv.style.transform = 'translate(-50%, -50%)';
    loadingDiv.style.zIndex = '1000';
    
    slideshowContainer.appendChild(loadingDiv);
    
    setTimeout(() => {
        if (loadingDiv.parentNode) {
            loadingDiv.parentNode.removeChild(loadingDiv);
        }
    }, 2000);
}

// Handle image loading errors
function handleImageError(img) {
    img.style.display = 'none';
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #666;
        font-size: 1.2rem;
        text-align: center;
    `;
    errorDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i><br>Image not available';
    img.parentNode.appendChild(errorDiv);
}

// Add error handling for all images
document.querySelectorAll('.slide img').forEach(img => {
    img.addEventListener('error', function() {
        handleImageError(this);
    });
});

// Add smooth transitions for slide info
function animateSlideInfo() {
    const slideInfo = document.querySelector('.slide.active .slide-info');
    if (slideInfo) {
        slideInfo.style.animation = 'none';
        slideInfo.offsetHeight; // Trigger reflow
        slideInfo.style.animation = 'fadeIn 0.8s ease-out';
    }
}

// Enhanced slide change with animation
function enhancedGoToSlide(slideIndex) {
    // Remove active class from current slide and thumbnail
    slides[currentSlide].classList.remove('active');
    thumbnails[currentSlide].classList.remove('active');
    
    // Update current slide
    currentSlide = slideIndex;
    
    // Add active class to new slide and thumbnail
    slides[currentSlide].classList.add('active');
    thumbnails[currentSlide].classList.add('active');
    
    // Update slide counter
    updateSlideCounter();
    
    // Scroll thumbnail into view if needed
    scrollThumbnailIntoView();
    
    // Animate slide info
    setTimeout(animateSlideInfo, 100);
}

// Replace the original goToSlide function
goToSlide = enhancedGoToSlide;

// Gallery Management System
let galleryImages = [];
let uploadedFiles = [];
let draggedElement = null;

// Password Protection System
const ADMIN_PASSWORD = 'portugal2024'; // You can change this password
let isAuthenticated = false;

// Initialize gallery data
function initializeGalleryData() {
    // Try to load saved gallery data from localStorage
    const savedGallery = localStorage.getItem('galleryImages');
    
    if (savedGallery) {
        try {
            galleryImages = JSON.parse(savedGallery);
            console.log('Loaded saved gallery data:', galleryImages);
        } catch (error) {
            console.error('Error loading saved gallery data:', error);
            loadDefaultGalleryData();
        }
    } else {
        loadDefaultGalleryData();
    }
}

function loadDefaultGalleryData() {
    galleryImages = [
        { src: 'images/IMG-20230805-WA0004.jpg', title: 'Portugal Adventure', date: 'August 5, 2023', index: 0 },
        { src: 'images/IMG-20230805-WA0006.jpg', title: 'Coastal Views', date: 'August 5, 2023', index: 1 },
        { src: 'images/IMG-20230805-WA0008.jpg', title: 'Historic Streets', date: 'August 5, 2023', index: 2 },
        { src: 'images/IMG-20230805-WA0011.jpg', title: 'Local Charm', date: 'August 5, 2023', index: 3 },
        { src: 'images/IMG-20230805-WA0012.jpg', title: 'Architecture', date: 'August 5, 2023', index: 4 },
        { src: 'images/IMG-20230805-WA0018.jpg', title: 'Scenic Beauty', date: 'August 5, 2023', index: 5 },
        { src: 'images/IMG-20230805-WA0019.jpg', title: 'Cultural Heritage', date: 'August 5, 2023', index: 6 },
        { src: 'images/IMG-20230805-WA0020.jpg', title: 'Urban Exploration', date: 'August 5, 2023', index: 7 },
        { src: 'images/IMG-20230805-WA0021.jpg', title: 'Hidden Gems', date: 'August 5, 2023', index: 8 },
        { src: 'images/IMG-20230805-WA0022.jpg', title: 'Street Life', date: 'August 5, 2023', index: 9 },
        { src: 'images/IMG-20230805-WA0023.jpg', title: 'Artistic Moments', date: 'August 5, 2023', index: 10 },
        { src: 'images/IMG-20231130-WA0006.jpg', title: 'Autumn Colors', date: 'November 30, 2023', index: 11 },
        { src: 'images/IMG-20231130-WA0007.jpg', title: 'Seasonal Beauty', date: 'November 30, 2023', index: 12 },
        { src: 'images/IMG-20231130-WA0014.jpg', title: 'Natural Landscapes', date: 'November 30, 2023', index: 13 },
        { src: 'images/IMG-20231130-WA0017.jpg', title: 'Peaceful Moments', date: 'November 30, 2023', index: 14 },
        { src: 'images/IMG-20231130-WA0018.jpg', title: 'Serene Views', date: 'November 30, 2023', index: 15 },
        { src: 'images/IMG-20231130-WA0020.jpg', title: 'Golden Hour', date: 'November 30, 2023', index: 16 },
        { src: 'images/IMG-20231130-WA0022.jpg', title: 'Architectural Details', date: 'November 30, 2023', index: 17 },
        { src: 'images/IMG-20231130-WA0024.jpg', title: 'Cultural Richness', date: 'November 30, 2023', index: 18 },
        { src: 'images/IMG-20231130-WA0025.jpg', title: 'Memorable Experiences', date: 'November 30, 2023', index: 19 },
        { src: 'images/IMG-20231130-WA0026.jpg', title: 'Final Impressions', date: 'November 30, 2023', index: 20 },
        { src: 'images/IMG20240730162629.jpg', title: 'Summer Memories', date: 'July 30, 2024', index: 21 }
    ];
}

// Password Protection Functions
function showPasswordModal() {
    console.log('showPasswordModal called');
    const passwordModal = document.getElementById('passwordModal');
    const passwordInput = document.getElementById('passwordInput');
    const passwordError = document.getElementById('passwordError');
    
    if (!passwordModal) {
        console.error('Password modal not found!');
        return;
    }
    
    if (!passwordInput) {
        console.error('Password input not found!');
        return;
    }
    
    if (!passwordError) {
        console.error('Password error element not found!');
        return;
    }
    
    console.log('Showing password modal');
    passwordModal.style.display = 'block';
    passwordInput.focus();
    passwordError.style.display = 'none';
}

function closePasswordModal() {
    console.log('closePasswordModal called');
    const passwordModal = document.getElementById('passwordModal');
    const passwordInput = document.getElementById('passwordInput');
    const passwordError = document.getElementById('passwordError');
    
    if (passwordModal) {
        passwordModal.style.display = 'none';
    }
    
    if (passwordInput) {
        passwordInput.value = '';
    }
    
    if (passwordError) {
        passwordError.style.display = 'none';
    }
}

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('passwordInput');
    const toggleIcon = document.getElementById('passwordToggleIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        toggleIcon.className = 'fas fa-eye';
    }
}

function verifyPassword() {
    const passwordInput = document.getElementById('passwordInput');
    const passwordError = document.getElementById('passwordError');
    
    if (passwordInput.value === ADMIN_PASSWORD) {
        isAuthenticated = true;
        closePasswordModal();
        openManagementModal();
        showNotification('Access granted! Welcome to gallery management.', 'success');
    } else {
        passwordError.style.display = 'flex';
        passwordInput.value = '';
        passwordInput.focus();
        passwordInput.style.borderColor = '#e74c3c';
        
        // Reset border color after animation
        setTimeout(() => {
            passwordInput.style.borderColor = '#e9ecef';
        }, 1000);
    }
}

// Handle Enter key in password input
function handlePasswordKeyPress(event) {
    if (event.key === 'Enter') {
        verifyPassword();
    }
}

// Modal Management Functions
function openManagementModal() {
    if (!isAuthenticated) {
        showPasswordModal();
        return;
    }
    
    document.getElementById('managementModal').style.display = 'block';
    initializeGalleryData();
    populateImageList();
    setupFileUpload();
    setupDragAndDrop();
}

function closeManagementModal() {
    document.getElementById('managementModal').style.display = 'none';
    uploadedFiles = [];
    clearUploadPreview();
}

// File Upload Functions
function setupFileUpload() {
    const fileInput = document.getElementById('fileInput');
    const uploadArea = document.getElementById('fileUploadArea');
    
    uploadArea.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', handleFileSelect);
}

function handleFileSelect(event) {
    const files = Array.from(event.target.files);
    files.forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                uploadedFiles.push({
                    file: file,
                    src: e.target.result,
                    title: file.name.replace(/\.[^/.]+$/, ""),
                    date: new Date().toLocaleDateString()
                });
                updateUploadPreview();
            };
            reader.readAsDataURL(file);
        }
    });
}

function updateUploadPreview() {
    const preview = document.getElementById('uploadPreview');
    preview.innerHTML = '';
    
    uploadedFiles.forEach((file, index) => {
        const previewItem = document.createElement('div');
        previewItem.className = 'preview-item';
        previewItem.innerHTML = `
            <img src="${file.src}" alt="${file.title}">
            <button class="remove-btn" onclick="removeUploadedFile(${index})">
                <i class="fas fa-times"></i>
            </button>
        `;
        preview.appendChild(previewItem);
    });
}

function removeUploadedFile(index) {
    uploadedFiles.splice(index, 1);
    updateUploadPreview();
}

function clearUploadPreview() {
    document.getElementById('uploadPreview').innerHTML = '';
}

// Drag and Drop Setup
function setupDragAndDrop() {
    const uploadArea = document.getElementById('fileUploadArea');
    const imageList = document.getElementById('imageList');
    
    // File upload drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = Array.from(e.dataTransfer.files);
        files.forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    uploadedFiles.push({
                        file: file,
                        src: e.target.result,
                        title: file.name.replace(/\.[^/.]+$/, ""),
                        date: new Date().toLocaleDateString()
                    });
                    updateUploadPreview();
                };
                reader.readAsDataURL(file);
            }
        });
    });
    
    // Image reordering drag and drop
    imageList.addEventListener('dragstart', handleDragStart);
    imageList.addEventListener('dragover', handleDragOver);
    imageList.addEventListener('drop', handleDrop);
    imageList.addEventListener('dragend', handleDragEnd);
}

function handleDragStart(e) {
    if (e.target.closest('.image-item')) {
        draggedElement = e.target.closest('.image-item');
        draggedElement.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', draggedElement.outerHTML);
    }
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleDrop(e) {
    e.preventDefault();
    const target = e.target.closest('.image-item');
    
    if (draggedElement && target && draggedElement !== target) {
        const allItems = [...document.querySelectorAll('.image-item')];
        const draggedIndex = allItems.indexOf(draggedElement);
        const targetIndex = allItems.indexOf(target);
        
        // Reorder the galleryImages array
        const [draggedImage] = galleryImages.splice(draggedIndex, 1);
        galleryImages.splice(targetIndex, 0, draggedImage);
        
        // Update the display
        populateImageList();
    }
}

function handleDragEnd(e) {
    if (draggedElement) {
        draggedElement.classList.remove('dragging');
        draggedElement = null;
    }
}

// Image List Management
function populateImageList() {
    const imageList = document.getElementById('imageList');
    imageList.innerHTML = '';
    
    galleryImages.forEach((image, index) => {
        const imageItem = document.createElement('div');
        imageItem.className = 'image-item';
        imageItem.draggable = true;
        imageItem.dataset.index = index;
        
        imageItem.innerHTML = `
            <img src="${image.src}" alt="${image.title}">
            <div class="image-item-info">
                <h4>${image.title}</h4>
                <p>${image.date}</p>
            </div>
            <div class="image-item-actions">
                <button class="edit-btn" onclick="editImage(${index})" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn" onclick="deleteImage(${index})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        imageList.appendChild(imageItem);
    });
}

function editImage(index) {
    const image = galleryImages[index];
    const newTitle = prompt('Enter new title:', image.title);
    const newDate = prompt('Enter new date:', image.date);
    
    if (newTitle !== null && newDate !== null) {
        image.title = newTitle;
        image.date = newDate;
        populateImageList();
    }
}

function deleteImage(index) {
    if (confirm('Are you sure you want to delete this image?')) {
        galleryImages.splice(index, 1);
        populateImageList();
    }
}

// Save Changes
function saveChanges() {
    // Add uploaded files to gallery
    uploadedFiles.forEach(file => {
        galleryImages.push({
            src: file.src,
            title: file.title,
            date: file.date,
            index: galleryImages.length
        });
    });
    
    // Update the actual gallery
    updateGallery();
    
    // Close modal
    closeManagementModal();
    
    // Show success message
    showNotification('Gallery updated successfully!', 'success');
}

function updateGallery() {
    // Update the slideshow with new gallery data
    updateSlideshow();
    
    // Update thumbnails
    updateThumbnails();
    
    // Update slide counter
    updateSlideCounter();
    
    // Reset current slide if it's out of bounds
    if (currentSlide >= galleryImages.length) {
        currentSlide = 0;
    }
    
    // Update the slides and thumbnails to reflect current slide
    updateSlideDisplay();
    
    // Reattach all event listeners
    reattachEventListeners();
    
    // Save to localStorage for persistence
    localStorage.setItem('galleryImages', JSON.stringify(galleryImages));
    
    console.log('Gallery updated:', galleryImages);
}

function reattachEventListeners() {
    console.log('Reattaching event listeners...');
    
    // Reattach autoplay button
    const autoplayBtn = document.querySelector('.control-btn');
    if (autoplayBtn) {
        console.log('Found autoplay button, attaching listener');
        autoplayBtn.onclick = function(e) {
            console.log('Autoplay button clicked');
            toggleAutoplay();
        };
    } else {
        console.log('Autoplay button not found');
    }
    
    // Reattach navigation buttons
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (prevBtn) {
        console.log('Found prev button, attaching listener');
        prevBtn.onclick = () => {
            console.log('Prev button clicked');
            changeSlide(-1);
        };
    } else {
        console.log('Prev button not found');
    }
    
    if (nextBtn) {
        console.log('Found next button, attaching listener');
        nextBtn.onclick = () => {
            console.log('Next button clicked');
            changeSlide(1);
        };
    } else {
        console.log('Next button not found');
    }
    
    // Reattach thumbnail click events
    const thumbnails = document.querySelectorAll('.thumbnail');
    console.log('Found', thumbnails.length, 'thumbnails');
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.onclick = () => {
            console.log('Thumbnail clicked:', index);
            goToSlide(index);
        };
    });
}

function updateSlideshow() {
    const slideshowContainer = document.querySelector('.slideshow-container');
    const existingSlides = slideshowContainer.querySelectorAll('.slide');
    
    // Remove existing slides (except navigation buttons)
    existingSlides.forEach(slide => slide.remove());
    
    // Add new slides
    galleryImages.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = `slide ${index === 0 ? 'active' : ''}`;
        slide.innerHTML = `
            <img src="${image.src}" alt="${image.title}">
            <div class="slide-info">
                <h3>${image.title}</h3>
                <p>${image.date}</p>
            </div>
        `;
        
        // Insert before navigation buttons
        const navButtons = slideshowContainer.querySelectorAll('.nav-btn');
        if (navButtons.length > 0) {
            slideshowContainer.insertBefore(slide, navButtons[0]);
        } else {
            slideshowContainer.appendChild(slide);
        }
    });
    
    // Reattach navigation button event listeners
    const prevBtn = slideshowContainer.querySelector('.prev-btn');
    const nextBtn = slideshowContainer.querySelector('.next-btn');
    
    if (prevBtn) {
        prevBtn.onclick = () => changeSlide(-1);
    }
    
    if (nextBtn) {
        nextBtn.onclick = () => changeSlide(1);
    }
    
    // Update global slides reference
    window.slides = document.querySelectorAll('.slide');
    window.totalSlides = galleryImages.length;
}

function updateThumbnails() {
    const thumbnailContainer = document.querySelector('.thumbnail-container');
    thumbnailContainer.innerHTML = '';
    
    galleryImages.forEach((image, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
        thumbnail.innerHTML = `<img src="${image.src}" alt="Thumbnail ${index + 1}">`;
        
        // Add click event listener
        thumbnail.addEventListener('click', () => {
            console.log('Thumbnail clicked:', index);
            goToSlide(index);
        });
        
        thumbnailContainer.appendChild(thumbnail);
    });
    
    // Update global thumbnails reference
    window.thumbnails = document.querySelectorAll('.thumbnail');
}

function updateSlideDisplay() {
    // Remove active class from all slides and thumbnails
    const allSlides = document.querySelectorAll('.slide');
    const allThumbnails = document.querySelectorAll('.thumbnail');
    
    allSlides.forEach(slide => slide.classList.remove('active'));
    allThumbnails.forEach(thumb => thumb.classList.remove('active'));
    
    // Add active class to current slide and thumbnail
    if (allSlides[currentSlide]) {
        allSlides[currentSlide].classList.add('active');
    }
    if (allThumbnails[currentSlide]) {
        allThumbnails[currentSlide].classList.add('active');
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4a7c59' : '#e74c3c'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 1001;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize management system
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing slideshow');
    
    // Initialize gallery data first
    initializeGalleryData();
    
    // Update the gallery display with loaded data
    updateSlideshow();
    updateThumbnails();
    updateSlideCounter();
    
    // Setup other functionality
    setupKeyboardNavigation();
    setupTouchNavigation();
    preloadImages();
    
    // Setup password input event listeners
    const passwordInput = document.getElementById('passwordInput');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', handlePasswordKeyPress);
    }
    
    // Setup all event listeners
    reattachEventListeners();
}); 