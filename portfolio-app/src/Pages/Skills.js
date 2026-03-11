import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FadeUp, Float } from "../Components/PageTransition";

export default function Skills() {
  const topRowRef = useRef(null);
  const bottomRowRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  // Modal state
  const [selectedImage, setSelectedImage] = useState(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  // Drag state for scrolling
  const [isDraggingTop, setIsDraggingTop] = useState(false);
  const [isDraggingBottom, setIsDraggingBottom] = useState(false);
  const dragStartX = useRef(0);
  const scrollStartPos = useRef(0);
  const topPositionRef = useRef(0);
  const bottomPositionRef = useRef(0);
  const topScrollWidthRef = useRef(0);
  const bottomScrollWidthRef = useRef(0);
  const animationPausedTop = useRef(false);
  const animationPausedBottom = useRef(false);

  // Handle parallax effect in modal
  const handleMouseMove = useCallback(
    (e) => {
      if (!selectedImage) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX - innerWidth / 2) / 20;
      const y = (clientY - innerHeight / 2) / 20;
      setParallax({ x, y });
    },
    [selectedImage],
  );

  // Track if it was a drag or a click
  const hasDragged = useRef(false);

  // Drag handlers for top row
  const handleTopMouseDown = (e) => {
    setIsDraggingTop(true);
    hasDragged.current = false;
    animationPausedTop.current = true;
    dragStartX.current = e.clientX;
    scrollStartPos.current = topPositionRef.current;
    e.preventDefault();
  };

  const handleTopMouseMove = (e) => {
    if (!isDraggingTop) return;
    const diff = e.clientX - dragStartX.current;
    if (Math.abs(diff) > 5) hasDragged.current = true;
    topPositionRef.current = scrollStartPos.current + diff;

    // Wrap around for infinite scroll
    const scrollWidth = topScrollWidthRef.current;
    if (scrollWidth > 0) {
      if (topPositionRef.current > 0) {
        topPositionRef.current =
          -scrollWidth + (topPositionRef.current % scrollWidth);
        scrollStartPos.current = topPositionRef.current - diff;
      } else if (Math.abs(topPositionRef.current) >= scrollWidth) {
        topPositionRef.current = topPositionRef.current % scrollWidth;
        scrollStartPos.current = topPositionRef.current - diff;
      }
    }

    if (topRowRef.current) {
      topRowRef.current.style.transform = `translateX(${topPositionRef.current}px)`;
    }
  };

  const handleTopMouseUp = () => {
    if (isDraggingTop) {
      setIsDraggingTop(false);
      setTimeout(() => {
        animationPausedTop.current = false;
      }, 1000);
    }
  };

  // Drag handlers for bottom row
  const handleBottomMouseDown = (e) => {
    setIsDraggingBottom(true);
    hasDragged.current = false;
    animationPausedBottom.current = true;
    dragStartX.current = e.clientX;
    scrollStartPos.current = bottomPositionRef.current;
    e.preventDefault();
  };

  const handleBottomMouseMove = (e) => {
    if (!isDraggingBottom) return;
    const diff = e.clientX - dragStartX.current;
    if (Math.abs(diff) > 5) hasDragged.current = true;
    bottomPositionRef.current = scrollStartPos.current + diff;

    // Wrap around for infinite scroll
    const scrollWidth = bottomScrollWidthRef.current;
    if (scrollWidth > 0) {
      if (bottomPositionRef.current > 0) {
        bottomPositionRef.current =
          -scrollWidth + (bottomPositionRef.current % scrollWidth);
        scrollStartPos.current = bottomPositionRef.current - diff;
      } else if (Math.abs(bottomPositionRef.current) >= scrollWidth) {
        bottomPositionRef.current = -(
          Math.abs(bottomPositionRef.current) % scrollWidth
        );
        scrollStartPos.current = bottomPositionRef.current - diff;
      }
    }

    if (bottomRowRef.current) {
      bottomRowRef.current.style.transform = `translateX(${bottomPositionRef.current}px)`;
    }
  };

  const handleBottomMouseUp = () => {
    if (isDraggingBottom) {
      setIsDraggingBottom(false);
      setTimeout(() => {
        animationPausedBottom.current = false;
      }, 1000);
    }
  };

  // Global mouse up handler
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      handleTopMouseUp();
      handleBottomMouseUp();
    };
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDraggingTop, isDraggingBottom]);

  const verticalImages = [
    "/assets/skills/Bauhaus.png",
    "/assets/skills/Poster1.png",
    "/assets/skills/Poster4.png",
    "/assets/skills/Poster5.png",
    "/assets/skills/Poster2.png",
    "/assets/skills/Poster3.png",
    "/assets/skills/Cybercore.png",
    "/assets/skills/Porter.png",
  ];

  const isVertical = (img) => verticalImages.includes(img);

  const topImages = [
    "/assets/skills/Bauhaus.png",
    "/assets/skills/Poster1.png",
    "/assets/skills/Poster4.png",
    "/assets/skills/Poster5.png",
    "/assets/skills/Poster2.png",
    "/assets/skills/Poster3.png",
    "/assets/skills/Cybercore.png",
    "/assets/skills/Porter.png",
    "/assets/skills/compositing-1.png",
    "/assets/skills/compositing-2.png",
    "/assets/skills/compositing-3.png",
    "/assets/skills/compositing-4.png",
  ];
  const bottomImages = [
    "/assets/skills/figma-1.png",
    "/assets/skills/figma-2.png",
    "/assets/skills/figma-3.png",
    "/assets/skills/figma-4.png",
  ];

  const duplicatedTop = [
    ...topImages,
    ...topImages,
    ...topImages,
    ...topImages,
  ];
  const duplicatedBottom = [
    ...bottomImages,
    ...bottomImages,
    ...bottomImages,
    ...bottomImages,
  ];

  useEffect(() => {
    const topRow = topRowRef.current;
    const bottomRow = bottomRowRef.current;

    if (topRow) {
      const scrollWidth = topRow.scrollWidth / 4;
      topScrollWidthRef.current = scrollWidth;

      const animateTop = () => {
        if (!animationPausedTop.current) {
          topPositionRef.current -= 0.2;
          if (Math.abs(topPositionRef.current) >= scrollWidth) {
            topPositionRef.current = 0;
          }
          topRow.style.transform = `translateX(${topPositionRef.current}px)`;
        }
        requestAnimationFrame(animateTop);
      };
      requestAnimationFrame(animateTop);
    }

    if (bottomRow) {
      const scrollWidth = bottomRow.scrollWidth / 4;
      bottomScrollWidthRef.current = scrollWidth;
      bottomPositionRef.current = -scrollWidth;

      const animateBottom = () => {
        if (!animationPausedBottom.current) {
          bottomPositionRef.current += 0.2;
          if (bottomPositionRef.current >= 0) {
            bottomPositionRef.current = -scrollWidth;
          }
          bottomRow.style.transform = `translateX(${bottomPositionRef.current}px)`;
        }
        requestAnimationFrame(animateBottom);
      };
      requestAnimationFrame(animateBottom);
    }
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full min-h-[100dvh] md:h-full flex flex-col items-center justify-between overflow-hidden py-8 md:py-0"
    >
      <motion.div
        initial={{ opacity: 0, y: -50, filter: "blur(10px)" }}
        animate={
          isInView
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: -50, filter: "blur(10px)" }
        }
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full flex-1 relative overflow-hidden"
      >
        <div
          ref={topRowRef}
          className={`flex gap-6 absolute left-0 top-0 h-full items-center py-4 ${
            isDraggingTop ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={handleTopMouseDown}
          onMouseMove={handleTopMouseMove}
          onMouseLeave={handleTopMouseUp}
        >
          {duplicatedTop.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 1.5, filter: "blur(12px)" }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                  : { opacity: 0, scale: 1.5, filter: "blur(12px)" }
              }
              transition={{
                delay: isInView ? index * 0.02 : 0,
                duration: 0.6,
                type: "spring",
                stiffness: 150,
                damping: 15,
              }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              onClick={() => !hasDragged.current && setSelectedImage(img)}
              className={`relative flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-xl cursor-pointer ${
                isVertical(img)
                  ? "w-[140px] md:w-[280px] h-[90%]"
                  : "w-[200px] md:w-[420px] h-[90%]"
              }`}
            >
              <img
                src={img}
                alt={`Skill ${index + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.classList.add(
                    "bg-gradient-to-br",
                    "from-blue-400",
                    "to-purple-500",
                  );
                }}
              />
            </motion.div>
          ))}
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgb(243 244 246) 0%, transparent 100%)",
          }}
        />
      </motion.div>

      <div className="text-center py-4 md:py-6 z-10 flex-shrink-0 relative w-full">
        <Float
          delay={0}
          className="hidden md:flex absolute left-12 top-1/2 -translate-y-1/2 items-center gap-4 pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col gap-2"
          >
            <div className="flex gap-1">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="w-3 h-3 bg-black"
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="w-3 h-3 border border-black"
              />
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="w-12 h-px bg-black origin-left"
            />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-xs text-gray-400 tracking-widest"
            >
              004
            </motion.span>
          </motion.div>
          <div className="flex flex-col gap-1">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="w-1 h-8 bg-black origin-bottom"
            />
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.3, delay: 0.55 }}
              className="w-1 h-5 bg-gray-400 origin-bottom"
            />
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="w-1 h-10 bg-black origin-bottom"
            />
          </div>
        </Float>

        <Float
          delay={0.3}
          className="hidden md:flex absolute right-12 top-1/2 -translate-y-1/2 items-center gap-4 pointer-events-none"
        >
          <div className="flex flex-col gap-1">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="w-1 h-6 bg-gray-400 origin-bottom"
            />
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.3, delay: 0.55 }}
              className="w-1 h-10 bg-black origin-bottom"
            />
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="w-1 h-4 bg-gray-300 origin-bottom"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-end gap-2"
          >
            <motion.div
              initial={{ rotate: 0, opacity: 0 }}
              animate={{ rotate: 45, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-5 h-5 border-2 border-black"
            />
            <div className="flex gap-1">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="w-2 h-2 rounded-full bg-black"
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.55, type: "spring" }}
                className="w-2 h-2 rounded-full bg-gray-400"
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="w-2 h-2 rounded-full border border-black"
              />
            </div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-xs text-gray-400 tracking-widest"
            >
              MEDIA
            </motion.span>
          </motion.div>
        </Float>

        <FadeUp delay={0.2}>
          <h1 className="text-3xl md:text-6xl font-bold mb-2 md:mb-4">
            Design Projects
          </h1>
        </FadeUp>
        <FadeUp delay={0.3}>
          <h2 className="text-sm md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            A showcase of my creative work in graphic design, UI/UX, and
            multimedia arts
          </h2>
        </FadeUp>
        <FadeUp delay={0.4}>
          <a
            href="https://drive.google.com/drive/folders/1mg1usUSq29rV00za4jLQhAkAqXmmBWvR?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 md:mt-5 px-5 py-2.5 bg-black text-white text-sm md:text-base font-medium rounded-full hover:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
          >
            <span>View Full Portfolio</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </FadeUp>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
        animate={
          isInView
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 50, filter: "blur(10px)" }
        }
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="w-full flex-1 relative overflow-hidden"
      >
        <div
          className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgb(243 244 246) 0%, transparent 100%)",
          }}
        />
        <div
          ref={bottomRowRef}
          className={`flex gap-6 absolute left-0 top-0 h-full items-center py-4 ${
            isDraggingBottom ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={handleBottomMouseDown}
          onMouseMove={handleBottomMouseMove}
          onMouseLeave={handleBottomMouseUp}
        >
          {duplicatedBottom.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 1.5, filter: "blur(12px)" }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                  : { opacity: 0, scale: 1.5, filter: "blur(12px)" }
              }
              transition={{
                delay: isInView ? 0.1 + index * 0.02 : 0,
                duration: 0.6,
                type: "spring",
                stiffness: 150,
                damping: 15,
              }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              onClick={() => !hasDragged.current && setSelectedImage(img)}
              className={`relative flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-xl cursor-pointer ${
                isVertical(img)
                  ? "w-[140px] md:w-[280px] h-[90%]"
                  : "w-[200px] md:w-[420px] h-[90%]"
              }`}
            >
              <img
                src={img}
                alt={`Skill ${index + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.classList.add(
                    "bg-gradient-to-br",
                    "from-green-400",
                    "to-cyan-500",
                  );
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Image Modal with Parallax Effect */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            onMouseMove={handleMouseMove}
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ delay: 0.1 }}
              onClick={() => setSelectedImage(null)}
              className="absolute top-8 right-8 z-50 w-12 h-12 flex items-center justify-center text-white bg-black/50 rounded-full hover:bg-black/70 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>

            {/* Image with Parallax Effect */}
            <motion.img
              src={selectedImage}
              alt="Selected skill"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: parallax.x,
                y: parallax.y,
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
                x: { type: "spring", stiffness: 100, damping: 20 },
                y: { type: "spring", stiffness: 100, damping: 20 },
              }}
              onClick={(e) => e.stopPropagation()}
              className={`max-w-[90vw] max-h-[90vh] rounded-2xl shadow-2xl ${
                isVertical(selectedImage) ? "object-contain" : "object-cover"
              }`}
              style={{
                filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
