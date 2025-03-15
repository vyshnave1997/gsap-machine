

# Next.js GSAP & Three.js Project

A modern, interactive web project built with Next.js, TypeScript, and React that features smooth scroll animations with GSAP, a circular carousel, and a 3D rotating model rendered using react-three-fiber and drei. The project demonstrates creative use of animations, scroll triggers, and 3D model integration to create a dynamic user experience.


[![Watch the video](https://drive.google.com/thumbnail?id=1AgIwmkCO-WwceP9_EgI1wxoYIKH--0W-)](https://drive.google.com/file/d/1AgIwmkCO-WwceP9_EgI1wxoYIKH--0W-/view?usp=drive_link)

<video width="640" height="360" controls>
  <source src="https://drive.google.com/uc?export=download&id=1AgIwmkCO-WwceP9_EgI1wxoYIKH--0W-" type="video/mp4">
  Your browser does not support the video tag.
</video>


## Features

- **Hero Section:**  
  - Animated bag and car images with GSAP.
  - The car image continuously loops across the screen, resetting from the left when it reaches the right edge.
  
- **Product Showcase Section:**  
  - Displays a circular carousel with GSAP animations.
  - Smooth scrolling triggers animations for product images and labels.
  
- **GSAP Cards Section:**  
  - Interactive cards that scale and move on mouse hover.
  
- **3D Model Section:**  
  - Integration of a GLB model with automatic rotation using react-three-fiber and drei.
  - Animated lighting and ambient effects for an enhanced visual experience.

## Technologies Used

- **Next.js:** Framework for server-rendered React applications.
- **React & TypeScript:** Building blocks for the user interface.
- **GSAP (GreenSock Animation Platform):** For robust animations and scroll-triggered effects.
- **Three.js & react-three-fiber:** For rendering 3D models.
- **drei:** Helper library for common tasks in react-three-fiber.
- **CSS Modules:** Styling the components.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or above recommended)
- npm or yarn package manager

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install Dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

### Running the Project

Start the development server:

```bash
npm run dev
```

Or with yarn:

```bash
yarn dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the project.

## Project Structure

```plaintext
your-repo-name/
├── components/
│   └── CircularCarouselSingle.tsx      # Carousel component with GSAP animations
├── pages/
│   └── index.tsx                       # Main page containing hero, product, card, and 3D model sections
├── public/
│   ├── bg.png                          # Background image for the carousel
│   ├── bag.png                         # Image used in the hero and product sections
│   ├── car.png                         # Animated car image
│   └── new.glb                         # 3D model file
├── styles/
│   └── Home.module.css                 # CSS module file for styling
├── package.json
└── README.md
```

## Customization

- **Animations:**  
  Modify GSAP settings (duration, easing, repeat, etc.) in the code files to adjust the animation behavior.
  
- **3D Model:**  
  Replace `/new.glb` with your own GLB model to personalize the 3D experience.

- **Carousel Images:**  
  Update image sources in the carousel components (both overlay and main cards) to suit your content.

## Credits

- **[GSAP](https://greensock.com/gsap/):** Powerful animation platform.
- **[Next.js](https://nextjs.org/):** The React framework for production.
- **[react-three-fiber](https://github.com/pmndrs/react-three-fiber):** React renderer for Three.js.
- **[drei](https://github.com/pmndrs/drei):** A helper library for react-three-fiber.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to contribute by opening issues or submitting pull requests.
```

This README provides an overview, setup instructions, and an outline of the project structure to help collaborators quickly understand and work with your code. You can modify the content to better suit your project details and personal preferences.
