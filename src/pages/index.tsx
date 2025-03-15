import { useEffect, useRef, Suspense } from "react";
import Head from "next/head";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import "../styles/Home.module.css";
import CircularCarousel from "../components/CircularCarouselSingle";

gsap.registerPlugin(ScrollTrigger);

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
  initialRotation = [0, Math.PI / 6, 0],
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
      y: "+=6.28319", 
      duration: 20,    
      ease: "linear",
      repeat: -1,     
    });
  }, []);

  return <primitive ref={modelRef} object={scene} />;
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
   
      gsap.to(imageRef.current, {
        y: () => normalRef.current!.getBoundingClientRect().top + 10,
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

      const carTimeline = gsap.timeline({ repeat: -1 });
      carTimeline.set(newImageRef.current, {
        x: -newImageRef.current.offsetWidth,
      });
      carTimeline.to(newImageRef.current, {
        x: window.innerWidth,
        duration: 10,
        ease: "linear",
      });

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
                top: "2%",
                width: "328px",
                height: "590px",
                borderRadius: 0,
                zIndex: 2, 
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
                top: "66%",
                width: "100px",
                height: "60px",
                borderRadius: 0,
                zIndex: 1, 
              }}
            />
          </div>
        </section>

     
        <section
          ref={normalRef}
          className="normal-section"
          style={{ height: "350vh", position: "relative", backgroundColor: "#fff" }}
        >
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
                url="/new.glb"
                scale={3}
         
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
