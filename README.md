# Portugal Memories - Image Gallery

A beautiful, modern image gallery showcasing memories from Portugal with a stunning green color scheme and smooth slideshow functionality.

## Features

- **Modern Design**: Clean, responsive design with a beautiful green color scheme
- **Slideshow**: Automatic slideshow with smooth transitions
- **Navigation**: Arrow buttons, thumbnail navigation, and keyboard controls
- **Touch Support**: Swipe gestures for mobile devices
- **Autoplay**: Toggle automatic slideshow with customizable timing
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Accessibility**: Keyboard navigation and screen reader friendly
- **Password Protection**: Secure admin access to gallery management features

## How to Use

### Basic Navigation
- **Arrow Buttons**: Click the left/right arrows to navigate between images
- **Thumbnails**: Click any thumbnail to jump directly to that image
- **Keyboard**: Use arrow keys (←/→) to navigate, spacebar to toggle autoplay, ESC to stop autoplay

### Mobile Controls
- **Swipe**: Swipe left/right on the main image to navigate
- **Touch**: Tap thumbnails to jump to specific images

### Autoplay
- Click the "Autoplay" button to start automatic slideshow
- Click "Pause" to stop the slideshow
- The slideshow changes images every 4 seconds

### Admin Access
- Click "Manage Gallery" to access admin features
- Enter the admin password: `portugal2024`
- Use the eye icon to toggle password visibility
- Press Enter or click "Access Gallery" to proceed

## File Structure

```
image-galery/
├── index.html          # Main HTML file
├── styles.css          # CSS styles with green color scheme
├── script.js           # JavaScript functionality
├── README.md           # This file
└── images/             # Your Portugal photos
    ├── IMG-20230805-WA0004.jpg
    ├── IMG-20230805-WA0006.jpg
    └── ... (22 images total)
```

## Color Scheme

The gallery uses a beautiful green color palette inspired by Portugal's natural landscapes:
- **Primary Green**: #4a7c59 (Olive green)
- **Dark Green**: #2d5a27 (Forest green)
- **Light Green**: #6b8e23 (Sage green)
- **Accent Green**: #90ee90 (Light green for highlights)

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Changing Colors
Edit the CSS variables in `styles.css` to customize the color scheme:

```css
/* Main background gradient */
background: linear-gradient(135deg, #2d5a27 0%, #4a7c59 50%, #6b8e23 100%);

/* Button colors */
background: linear-gradient(135deg, #4a7c59, #6b8e23);
```

### Adding More Images
1. Add your images to the `images/` folder
2. Update the HTML slides in `index.html`
3. Add corresponding thumbnails
4. Update the JavaScript image preloading array in `script.js`

### Changing Slideshow Speed
Modify the autoplay interval in `script.js`:

```javascript
autoplayInterval = setInterval(() => {
    changeSlide(1);
}, 4000); // Change this value (in milliseconds)
```

### Changing Admin Password
Modify the admin password in `script.js`:

```javascript
const ADMIN_PASSWORD = 'portugal2024'; // Change this to your desired password
```

## Getting Started

1. Open `index.html` in your web browser
2. The gallery will load with your Portugal photos
3. Use the navigation controls to browse through your memories
4. Enjoy the beautiful slideshow experience!

## Credits

- **Font**: Inter (Google Fonts)
- **Icons**: Font Awesome 6.0
- **Design**: Modern, responsive gallery with green color scheme
- **Photos**: Your personal Portugal memories

---

*Created with ❤️ for showcasing beautiful memories from Portugal* 