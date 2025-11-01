# Hack2TechSustain 2.0 - React Version

A modern React implementation of the Hack2TechSustain 2.0 hackathon website, built with Vite for optimal performance.

## 🚀 Features

- **Responsive Design**: Fully responsive across all devices
- **Interactive Components**: 
  - Real-time countdown timer
  - Animated problem statement cards
  - Image carousel gallery
  - Smooth scrolling navigation
  - Loading screen with animations
- **Performance Optimized**:
  - Lazy loading images
  - Deferred external resources
  - Optimized font loading
  - Compressed assets

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Vanilla CSS** - Custom CSS with advanced animations
- **React Router** - For navigation (if needed for future expansion)
- **Framer Motion** - For advanced animations (ready to use)

## 📦 Project Structure

```
src/
├── components/
│   ├── LoadingScreen.jsx    # Animated loading screen
│   ├── Navbar.jsx          # Navigation with mobile menu
│   ├── Hero.jsx            # Hero section with countdown
│   ├── Problems.jsx        # Problem statements cards
│   ├── Timeline.jsx        # Event timeline
│   ├── Prizes.jsx          # Prize pool with animations
│   ├── Gallery.jsx         # Image carousel
│   ├── Organizers.jsx      # Team profiles
│   ├── Contact.jsx         # Contact information
│   └── Footer.jsx          # Footer with back-to-top
├── App.jsx                 # Main app component
├── main.jsx               # Entry point
└── style.css              # Global styles (from original)

public/
└── images/                # All hackathon images
```

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation & Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🎨 Key Components

### Hero Section
- Real-time countdown to October 31, 2025
- Animated background effects
- Call-to-action button

### Problem Statements
- Interactive cards with hover effects
- 5 different problem categories
- Smooth animations

### Timeline
- Horizontal timeline layout
- Three key phases with icons
- Responsive design

### Gallery
- Bootstrap carousel integration
- Auto-play with manual controls
- Lazy-loaded images

### Organizers
- Multiple sections (Convenor, Faculty, Event Coordinators, Web Team)
- Contact information with links
- Professional layout

## 🚀 Performance Features

- **Lazy Loading**: All images load only when needed
- **Font Optimization**: Fonts load asynchronously
- **CSS Optimization**: Deferred non-critical CSS
- **Preconnect Hints**: Faster external resource loading
- **Compression**: Gzip/Brotli compression ready

## 📱 Mobile Responsiveness

- Mobile-first design approach
- Touch-friendly navigation
- Optimized image sizes
- Readable typography on all screens

## 🔧 Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is part of the Hack2TechSustain 2.0 hackathon organized by MIT Campus, Anna University.

## 👥 Credits

**Web Development Team:**
- Karthik raja A
- Jaya Suriya S

**Original Design:** Based on the original HTML/CSS/JS website, converted to modern React architecture.

---

**MIT Campus, Anna University**  
Computer Technology Department  
© 2025 Hack2TechSustain 2.0+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
