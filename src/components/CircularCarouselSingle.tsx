import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CarouselCard {
  id: number;
  image: string;
}

const overlayData: CarouselCard[] = [
  { id: 1, image: "" },
  { id: 2, image: "n1.png" },
  { id: 3, image: "n2.png" },
  { id: 4, image: "n3.png" },
  { id: 5, image: "n4.png" },
];

const cardData: CarouselCard[] = [
  { id: 1, image: "p1.png" },
  { id: 2, image: "p2.png" },
  { id: 3, image: "p3.png" },
  { id: 4, image: "p4.png" },
  { id: 5, image: "p5.png" },
];

export default function CircularCarousel(): React.ReactElement {

  const containerRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const overlayRefs = useRef<Array<HTMLDivElement | null>>([]);
  const midImageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const pivotY = "1700px"; 
    const totalCards = cardData.length;
    const angleStep = 360 / totalCards;

 
    cardRefs.current.forEach((cardEl, index) => {
      if (cardEl) {
        const angle = index * angleStep;
        gsap.set(cardEl, {
          rotation: angle,
          transformOrigin: `50% ${pivotY}`,
        });
      }
    });

    
    overlayRefs.current.forEach((overlayEl, index) => {
      if (overlayEl) {
        const angle = index * angleStep;
        gsap.set(overlayEl, {
          rotation: angle,
          transformOrigin: `50% ${pivotY}`,
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
      overlayRefs.current,
      {
        rotation: "-=300",
        transformOrigin: `50% ${pivotY}`,
        ease: "power2",
        duration: 1,
      },
      "<"
    );

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
        {/* Background */}
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
        {/* Overlay Carousel  */}
        {overlayData.map((card, i) => (
          <div
            key={card.id}
            ref={(el) => {
              overlayRefs.current[i] = el;
            }}
            style={{
              width: "300px",
              height: "450px",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              opacity: 1,
              zIndex: 5,
            }}
          >
            {card.id !== 1 && card.image ? (
              <img
                src={card.image}
                alt={`Overlay ${card.id}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            ) : null}
          </div>
        ))}
        {/* Main Carousel */}
        {cardData.map((card, i) => (
          <div
            key={card.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            style={{
              width: "100vw",
              height: "100%",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 2,
            }}
          >
            <img
              src={card.image}
              alt={`Main ${card.id}`}
              style={{
                width: "100vw",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        ))}
        {/* Mid Image */}
        <div
          ref={midImageRef}
          style={{
            position: "absolute",
            bottom: "0",
            left: "50%",
            transform: "translateX(-50%)",
            width: "300px",
            height: "50vh",
            zIndex: 4,
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
      </div>
    </div>
  );
}
