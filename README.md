# Dhruv Sharma — Portfolio Website 🚀

A modern, interactive personal portfolio website showcasing my skills, experience, and projects as a Full Stack Developer. Built with a cutting-edge tech stack featuring immersive 3D elements, smooth animations, and a premium dark-themed UI.

---

## ✨ Features

- **Interactive 3D Character Model** — A WebGL-powered 3D character rendered with Three.js and React Three Fiber, creating an immersive landing experience.
- **Interactive 3D Physics Marquee** — An interactive 3D physics-based marquee for the tech stack built with React Three Rapier and React Three Postprocessing (N8AO).
- **Smooth Scroll Animations** — Buttery smooth scrolling powered by Lenis with scroll-triggered animations via GSAP ScrollTrigger.
- **Dynamic Text Reveals** — Custom split-text animation system for cinematic text reveal effects.
- **Responsive Design** — Fully responsive layout that adapts seamlessly from mobile to ultrawide displays.
- **Dark Premium Theme** — Carefully crafted dark UI with gradient accents and glassmorphism effects.
- **Interactive Hover Effects** — Engaging hover animations on cards, links, and interactive elements.
- **Custom Cursor** — A custom animated cursor that enhances the browsing experience.

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend Framework** | React 18 |
| **3D Graphics & Physics** | Three.js, React Three Fiber, React Three Drei, React Three Rapier (Physics) |
| **3D Postprocessing** | React Three Postprocessing (N8AO Shader) |
| **Animations & Scrolling** | GSAP (GreenSock), ScrollTrigger, Lenis (Smooth Scroll), React Fast Marquee |
| **Icons** | React Icons |
| **Build Tool** | Vite 5 |
| **Languages** | TypeScript, JavaScript |
| **Styling** | Vanilla CSS with CSS Variables |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher)

### Installation

```bash
# Clone the repository
git clone https://github.com/dhruv22133/Portfolio-Website.git

# Navigate to the project directory
cd Portfolio-Website

# Install dependencies
npm install

# Start the development server
npm run dev
```

The site will be available at `http://localhost:5173` (or the next available port).

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
Portfolio-Website/
├── public/
│   ├── draco/           # Draco compression decoder files
│   ├── images/          # Images/icons used in 3D marquee & components
│   └── models/          # 3D model assets & env maps (.enc, .hdr, .glb)
├── src/
│   ├── assets/          # Static SVG assets
│   ├── components/
│   │   ├── Character/   # 3D Character component, rendering scene & lighting utils
│   │   ├── styles/      # Component-specific CSS files
│   │   ├── utils/       # Scroll & text splitting animation utilities
│   │   ├── About.tsx     # About Me section
│   │   ├── Career.tsx    # Work experience timeline
│   │   ├── Contact.tsx   # Contact section
│   │   ├── Cursor.tsx    # Custom cursor component
│   │   ├── HoverLinks.tsx # Custom magnetic/interactive link component
│   │   ├── Landing.tsx   # Hero landing page
│   │   ├── Loading.tsx   # Intro loading animation screen
│   │   ├── MainContainer.tsx # Layout container wrapping content
│   │   ├── Navbar.tsx    # Responsive navigation bar
│   │   ├── SocialIcons.tsx # Floating social media links
│   │   ├── TechStack.tsx # Interactive 3D physics tech stack marquee
│   │   ├── Work.tsx      # Portfolio projects section
│   │   └── WorkImage.tsx # Image hover reveal effect component
│   ├── context/
│   │   └── LoadingProvider.tsx # Global loading state context provider
│   ├── data/
│   │   └── boneData.ts  # Rigging bone name array for the 3D model
│   ├── App.css
│   ├── App.tsx          # Main entry component
│   ├── index.css        # Main stylesheet & custom css variables
│   ├── main.tsx         # React app DOM mounting script
│   └── vite-env.d.ts
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 🧩 Challenges & Solutions

### 1. GSAP Premium Plugins (Licensing)
**Problem:** The original project relied on GSAP trial plugins (`ScrollSmoother` and `SplitText`) which are restricted to specific domains and cannot be used in production freely.

**Solution:** Replaced with open-source alternatives:
- **Lenis** — A high-performance smooth scrolling library (MIT License) for premium momentum scrolling
- **Custom SplitText** — A lightweight custom JavaScript text splitter for clean text reveal animations

### 2. 3D Model Loading & Performance
**Problem:** Loading a full 3D character model on page load caused significant performance bottlenecks, especially on mobile devices.

**Solution:** Implemented lazy loading with React Suspense, optimized the model with encrypted `.enc` format that is decrypted on-the-fly in the browser, and conditionally rendered heavy components based on viewport width.

### 3. Responsive 3D Canvas
**Problem:** The Three.js canvas didn't scale properly across different screen sizes, causing layout shifts and overlapping content.

**Solution:** Used dynamic viewport-based sizing with CSS and JavaScript resize handlers to adapt the 3D canvas and surrounding layout at multiple breakpoints (500px, 768px, 1025px, 1200px, 1600px).

### 4. Scroll-triggered Animations with Fixed 3D Model
**Problem:** Keeping the 3D character model fixed while scrolling content behind and in front of it created complex z-index layering issues.

**Solution:** Careful z-index management across components, using CSS `position: fixed` for the model on desktop views, and gradient overlays to create smooth transitions between sections.

---

## 📬 Contact

- **Email:** dhruv22133@gmail.com
- **GitHub:** [github.com/dhruv22133](https://github.com/dhruv22133)
- **LinkedIn:** [linkedin.com/in/dhruv-sharma](https://www.linkedin.com/in/dhruv-sharma)

---

## 📄 License

This project is open source and available for learning and reference purposes.

If you use parts of this code, please provide proper credit.

— Dhruv Sharma
