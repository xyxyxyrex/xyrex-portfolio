import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FadeUp, Float } from "../Components/PageTransition";

export default function Skills() {
  const topRowRef = useRef(null);
  const bottomRowRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const topImages = [
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
      let topPosition = 0;

      const animateTop = () => {
        topPosition -= 0.5;
        if (Math.abs(topPosition) >= scrollWidth) {
          topPosition = 0;
        }
        topRow.style.transform = `translateX(${topPosition}px)`;
        requestAnimationFrame(animateTop);
      };
      requestAnimationFrame(animateTop);
    }

    if (bottomRow) {
      const scrollWidth = bottomRow.scrollWidth / 4;
      let bottomPosition = -scrollWidth;

      const animateBottom = () => {
        bottomPosition += 0.5;
        if (bottomPosition >= 0) {
          bottomPosition = -scrollWidth;
        }
        bottomRow.style.transform = `translateX(${bottomPosition}px)`;
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
          className="flex gap-6 absolute left-0 top-0 h-full items-center py-4"
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
              className="relative flex-shrink-0 w-[200px] md:w-[420px] h-[90%] rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-xl"
            >
              <img
                src={img}
                alt={`Skill ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.classList.add(
                    "bg-gradient-to-br",
                    "from-blue-400",
                    "to-purple-500"
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
          className="flex gap-6 absolute left-0 top-0 h-full items-center py-4"
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
              className="relative flex-shrink-0 w-[200px] md:w-[420px] h-[90%] rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-xl"
            >
              <img
                src={img}
                alt={`Skill ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.classList.add(
                    "bg-gradient-to-br",
                    "from-green-400",
                    "to-cyan-500"
                  );
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
