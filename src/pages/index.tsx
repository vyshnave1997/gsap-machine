import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]// pages/index.tsx
  import { useEffect, useRef, Suspense } from "react";
  import Head from "next/head";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { Canvas } from "@react-three/fiber";
  import { useGLTF } from "@react-three/drei";
  import * as THREE from "three";
  import "../styles.css";
  
  gsap.registerPlugin(ScrollTrigger);
  
  // Define types for the data
  interface CardData {
    id: number;
    image: string;
  }
  
  const cardData: CardData[] = [
    { id: 1, image: "p1.png" },
    { id: 2, image: "p2.png" },
    { id: 3, image: "p3.png" },
    { id: 4, image: "p4.png" },
    { id: 5, image: "p5.png" },
  ];
  
  const overlayData: CardData[] = [
    { id: 1, image: "" },
    { id: 2, image: "n1.png" },
    { id: 3, image: "n2.png" },
    { id: 4, image: "n3.png" },
    { id: 5, image: "n4.png" },
  ];
  
  // RotatingModel component props type
  interface RotatingModelProps {
    url: string;
    scale?: number;
    initialRotation?: [number, number, number];
    x?: number;
    y?: number;
    z?: number;
  }
  
  function RotatingModel({
    url,
    scale = 2,
    initialRotation = [0, Math.PI / 4, 0],
    x = 0,
    y = 0,
    z = 0,
  }: RotatingModelProps) {
    const { scene } = useGLTF(url);
    const modelRef = useRef<THREE.Object3D | null>(null);
  
    useEffect(() => {
      if (modelRef.current) {
        modelRef.current.scale.set(scale, scale, scale);
        modelRef.current.rotation.set(...initialRotation);
        modelRef.current.position.set(x, y, z);
      }
    }, [scale, initialRotation, x, y, z]);
  
    useEffect(() => {
      if (!modelRef.current) return;
      gsap.to(modelRef.current.rotation, {
        y: "+=6.28319", // Rotate 360° (2π radians)
        ease: "none",
        scrollTrigger: {
          trigger: ".orange-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
  
      gsap.to(modelRef.current.position, {
        x: x,
        y: y,
        ease: "none",
        scrollTrigger: {
          trigger: ".orange-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, [x, y]);
  
    return <primitive ref={modelRef} object={scene} />;
  }
  
  function CircularCarousel() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const bgRef = useRef<HTMLDivElement | null>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const overlayCardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const midImageRef = useRef<HTMLDivElement | null>(null);
  
    useEffect(() => {
      const totalCards = cardData.length;
      const angleStep = 360 / totalCards;
      const pivotY = "1700px"; // Main carousel pivot
  
      cardRefs.current.forEach((cardEl, index) => {
        if (cardEl) {
          const angle = index * angleStep;
          gsap.set(cardEl, {
            rotation: angle,
            transformOrigin: `50% ${pivotY}`,
          });
        }
      });
  
      const overlayTotalCards = overlayData.length;
      const overlayAngleStep = 360 / overlayTotalCards;
      const overlayPivot = "calc(80% + 250px)";
      overlayCardRefs.current.forEach((cardEl, index) => {
        if (cardEl) {
          const angle = index * overlayAngleStep;
          gsap.set(cardEl, {
            rotation: angle,
            transformOrigin: `50% ${overlayPivot}`,
          });
        }
      });
  
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current as Element,
          start: "top top",
          end: "+=2000",
          pin: true,
          scrub: true,
        },
      });
  
      if (bgRef.current && containerRef.current && midImageRef.current) {
        tl.to(bgRef.current, { opacity: 0, duration: 0.5, ease: "power1.inOut" });
        tl.to(
          containerRef.current,
          { backgroundColor: "#FBDE5E", duration: 0.5, ease: "power1.inOut" },
          "<"
        );
  
        tl.fromTo(
          midImageRef.current,
          { scale: 0, y: 80, transformOrigin: "bottom center" },
          { scale: 1.5, y: 0, ease: "power2", duration: 1 },
          "<"
        );
  
        tl.to(cardRefs.current, {
          rotation: "-=300",
          transformOrigin: `50% ${pivotY}`,
          ease: "power2",
          duration: 1,
        });
  
        tl.to(
          overlayCardRefs.current,
          {
            rotation: "-=300",
            transformOrigin: `50% ${overlayPivot}`,
            ease: "power2",
            duration: 1,
          },
          "<"
        );
      }
  
      return () => {
        tl.kill();
      };
    }, []);
  
    return (
      <div style={{ height: "200vh" }}>
        <div
          ref={containerRef}
          style={{
            width: "100%",
            height: "100vh",
            margin: "0 auto",
            position: "relative",
            top: "50vh",
            overflow: "hidden",
            backgroundColor: "transparent",
          }}
        >
          <div
            ref={bgRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: "url('bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: 1,
            }}
          />
          {cardData.map((card, i) => (
            <div
              key={card.id}
              ref={(el) => (cardRefs.current[i] = el)}
              style={{
                width: "100vw",
                height: "100%",
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                borderRadius: "8px",
                overflow: "hidden",
                zIndex: 2,
              }}
            >
              <img
                src={card.image}
                alt={`Image ${card.id}`}
                style={{
                  width: "100vw",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          ))}
          <div
            ref={midImageRef}
            style={{
              position: "absolute",
              bottom: "0",
              left: "50%",
              transform: "translateX(-50%)",
              width: "300px",
              height: "50vh",
              zIndex: 3,
            }}
          >
            <img
              src="bag.png"
              alt="Mid Image"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>
          <div
            ref={overlayRef}
            style={{
              position: "absolute",
              width: "140vw",
              height: "140vh",
              left: "-20vw",
              top: "40vh",
              overflow: "hidden",
              pointerEvents: "none",
              zIndex: 4,
            }}
          >
            {overlayData.map((card, i) => (
              <div
                key={`overlay-${card.id}`}
                ref={(el) => (overlayCardRefs.current[i] = el)}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  top: 0,
                  left: 0,
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                {card.image && (
                  <img
                    src={card.image}
                    alt={`Overlay Image ${card.id}`}
                    style={{
                      width: "300px",
                      height: "400px",
                      objectFit: "contain",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  interface GSAPCardProps {
    image: string;
  }
  
  function GSAPCard({ image }: GSAPCardProps) {
    const cardRef = useRef<HTMLDivElement | null>(null);
  
    useEffect(() => {
      const el = cardRef.current;
      if (!el) return;
  
      const onEnter = () => {
        gsap.to(el, { scale: 1.1, duration: 0.3 });
        gsap.to(el, {
          x: 10,
          duration: 0.1,
          yoyo: true,
          repeat: 3,
          ease: "power1.inOut",
        });
      };
      const onLeave = () => gsap.to(el, { scale: 1, x: 0, duration: 0.3 });
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      };
    }, []);
  
    return (
      <div
        ref={cardRef}
        className="gsap-card"
        style={{
          margin: "10px",
          background: "#fff",
          padding: "0px",
          borderRadius: "24px",
          cursor: "pointer",
          width: "412px",
          height: "511px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <img
          src={image}
          alt="Card visual"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "16px",
            objectFit: "cover",
          }}
        />
      </div>
    );
  }
  
  const Home = () => {
    const imageRef = useRef<HTMLImageElement | null>(null);
    const newImageRef = useRef<HTMLImageElement | null>(null);
    const normalRef = useRef<HTMLDivElement | null>(null);
    const secondImageRef = useRef<HTMLImageElement | null>(null);
    const thirdImageRef = useRef<HTMLImageElement | null>(null);
  
    // References for the labels below the second and third images
    const secondImageLabelRef = useRef<HTMLDivElement | null>(null);
    const thirdImageLabelRef = useRef<HTMLDivElement | null>(null);
  
    const newSectionRef = useRef<HTMLDivElement | null>(null);
  
    useEffect(() => {
      if (
        imageRef.current &&
        newImageRef.current &&
        normalRef.current &&
        newSectionRef.current &&
        secondImageRef.current &&
        thirdImageRef.current &&
        secondImageLabelRef.current &&
        thirdImageLabelRef.current
      ) {
        // Animate the first image using normalRef as trigger
        gsap.to(imageRef.current, {
          y: () => normalRef.current!.getBoundingClientRect().top + -10,
          x: "-15%",
          scale: 0.3,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: normalRef.current,
            start: "top center",
            end: "top 0px",
            scrub: true,
          },
        });
  
        // Animate the new image
        const newImageRect = newImageRef.current.getBoundingClientRect();
        const moveDistance =
          window.innerWidth - newImageRect.left - newImageRef.current.offsetWidth;
        gsap.to(newImageRef.current, {
          duration: 100,
          x: moveDistance,
          ease: "power2.out",
        });
  
        // Animate second and third images horizontally from left to right
        const tlImages = gsap.timeline({
          scrollTrigger: {
            trigger: normalRef.current,
            start: "top center",
            end: "top -50px",
            scrub: true,
          },
        });
  
        tlImages.fromTo(
          secondImageRef.current,
          { x: "-50vw", y: "-100", scale: "0.35", opacity: 0 },
          {
            x: "-70%",
            y: "-260",
            scale: "0.55",
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            // When the second image finishes animating, fade in its label
            onComplete: () => {
              gsap.to(secondImageLabelRef.current, {
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
              });
            },
          }
        );
  
        tlImages.fromTo(
          thirdImageRef.current,
          { x: "-30vw", y: "-55%", scale: "0.35", opacity: 0 },
          {
            x: "-70%",
            y: "-375",
            scale: "0.55",
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            // When the third image finishes animating, fade in its label
            onComplete: () => {
              gsap.to(thirdImageLabelRef.current, {
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
              });
            },
          },
          "+=0"
        );
  
        // New Section Animation
        gsap.fromTo(
          newSectionRef.current,
          { scaleY: 0, transformOrigin: "bottom" },
          {
            scaleY: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".normal-section",
              start: "bottom bottom",
              end: "+=100vh",
              scrub: true,
            },
          }
        );
      }
    }, []);
  
    return (
      <>
        <Head>
          <title>My Next.js TSX Carousel</title>
          <meta name="description" content="Converted Next.js TSX Carousel project" />
        </Head>
        <div className="app-container">
          {/* Hero Section */}
          <section
            className="hero-section"
            style={{
              height: "150vh",
              background: "url('hero-bg.png') center/cover no-repeat",
            }}
          >
            <div className="text-center">
              <img
                ref={imageRef}
                src="/bag.png"
                alt="Person Image"
                className="hero-image"
                style={{
                  position: "absolute",
                  left: "18%",
                  top: "0%",
                  width: "328px",
                  height: "590px",
                  borderRadius: 0,
                }}
              />
              <img
                ref={newImageRef}
                src="/car.png"
                alt="New Home Image"
                className="hero-image"
                style={{
                  position: "absolute",
                  left: "25%",
                  top: "64%",
                  width: "100px",
                  height: "60px",
                  borderRadius: 0,
                }}
              />
            </div>
          </section>
  
          {/* Normal Section with CircularCarousel and added images */}
          <section
            ref={normalRef}
            className="normal-section"
            style={{ height: "350vh", position: "relative" }}
          >
            {/* "OUR PRODUCTS" on the top-left */}
            <h2
              style={{
                position: "absolute",
                top: "40px",
                left: "30px",
                margin: 0,
                fontSize: "24px",
                fontWeight: "bold",
                color: "#000",
                zIndex: 99,
              }}
            >
              OUR PRODUCTS
            </h2>
            <h2
              style={{
                position: "absolute",
                top: "14.5%",
                left: "24%",
                margin: 0,
                fontSize: "30px",
                fontWeight: "bolder",
                color: "#000",
                zIndex: 99,
              }}
            >
              1 KG
            </h2>
  
            <div className="text-center" style={{ position: "relative" }}>
              <CircularCarousel />
              <img
                ref={secondImageRef}
                src="/bag.png"
                alt="Second Image"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "20%",
                  opacity: 0,
                  borderRadius: 0,
                  width: "248px",
                  height: "429px",
                }}
              />
              {/* Label for the second image (hidden by default) */}
              <div
                ref={secondImageLabelRef}
                style={{
                  position: "absolute",
                  left: "46%",
                  top: "-2%",
                  transform: "translate(-50%, 450px)",
                  fontSize: "2rem",
                  color: "#000",
                  fontWeight: "bold",
                  opacity: 0,
                }}
              >
                2KG
              </div>
  
              <img
                ref={thirdImageRef}
                src="/bag.png"
                alt="Third Image"
                style={{
                  position: "absolute",
                  left: "75%",
                  top: "20%",
                  opacity: 0,
                  borderRadius: 0,
                  width: "334px",
                  height: "583px",
                }}
              />
              {/* Label for the third image (hidden by default) */}
              <div
                ref={thirdImageLabelRef}
                style={{
                  position: "absolute",
                  left: "71%",
                  top: "-12%",
                  transform: "translate(-50%, 620px)",
                  fontSize: "2rem",
                  color: "#000",
                  fontWeight: "bold",
                  opacity: 0,
                }}
              >
                5KG
              </div>
            </div>
          </section>
  
          {/* GSAP Cards Section */}
          <section
            ref={newSectionRef}
            className="new-section"
            style={{
              width: "100vw",
              minHeight: "100vh",
              transform: "scaleY(0)",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
              textAlign: "center",
              overflow: "hidden",
            }}
          >
            <img
              src="back3.png"
              alt="Background"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                maxWidth: "100%",
                height: "100%",
                width: "100%",
                zIndex: -1,
              }}
            />
            <h2 className="new-section-heading">How to Cook</h2>
            <div
              className="cards-container"
              style={{ display: "flex", width: "100%", justifyContent: "center" }}
            >
              <GSAPCard image="bg1.png" />
              <GSAPCard image="bg2.png" />
              <GSAPCard image="bg3.png" />
            </div>
          </section>
  
          {/* Orange Section with GLB Model */}
          <section
            className="orange-section"
            style={{
              backgroundColor: "orange",
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
              textAlign: "center",
              padding: "20px",
            }}
          >
            <h2
              style={{
                fontSize: "155px",
                fontWeight: "500",
                lineHeight: "100px",
                marginBottom: "20px",
              }}
            >
              unlock human potential
            </h2>
            <Canvas style={{ width: "100%", height: "700px" }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <Suspense fallback={null}>
                <RotatingModel
                  url="new.glb"
                  scale={3}
                  initialRotation={[0, Math.PI / 4, 0]}
                  x={0}
                  y={-3}
                />
              </Suspense>
            </Canvas>
          </section>
        </div>
      </>
    );
  };
  
  export default Home;
  ,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
        <main className={styles.main}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <ol>
            <li>
              Get started by editing <code>src/pages/index.tsx</code>.
            </li>
            <li>Save and see your changes instantly.</li>
          </ol>

          <div className={styles.ctas}>
            <a
              className={styles.primary}
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className={styles.logo}
                src="/vercel.svg"
                alt="Vercel logomark"
                width={20}
                height={20}
              />
              Deploy now
            </a>
            <a
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondary}
            >
              Read our docs
            </a>
          </div>
        </main>
        <footer className={styles.footer}>
          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
          <a
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to nextjs.org →
          </a>
        </footer>
      </div>
    </>
  );
}
