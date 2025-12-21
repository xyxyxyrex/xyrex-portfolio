import { useEffect, useRef } from "react";

export default function Skills() {
  const topRowRef = useRef(null);
  const bottomRowRef = useRef(null);

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

  // Duplicate images for seamless loop
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
    <div className="w-full h-full flex flex-col items-center justify-between overflow-hidden">
      {/* Top Row - Scrolling Left with bottom fade */}
      <div className="w-full flex-1 relative overflow-hidden">
        <div
          ref={topRowRef}
          className="flex gap-6 absolute left-0 top-0 h-full items-center py-4"
        >
          {duplicatedTop.map((img, index) => (
            <div
              key={index}
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
            </div>
          ))}
        </div>
        {/* Bottom fade overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgb(243 244 246) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Middle Row - Heading and Subheading */}
      <div className="text-center py-4 md:py-6 z-10 flex-shrink-0 relative w-full">
        {/* Geometric Elements - Left */}
        <div className="hidden md:flex absolute left-12 top-1/2 -translate-y-1/2 items-center gap-4 pointer-events-none">
          <div className="flex flex-col gap-2">
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-black"></div>
              <div className="w-3 h-3 border border-black"></div>
            </div>
            <div className="w-12 h-px bg-black"></div>
            <span className="text-xs text-gray-400 tracking-widest">004</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-1 h-8 bg-black"></div>
            <div className="w-1 h-5 bg-gray-400"></div>
            <div className="w-1 h-10 bg-black"></div>
          </div>
        </div>

        {/* Geometric Elements - Right */}
        <div className="hidden md:flex absolute right-12 top-1/2 -translate-y-1/2 items-center gap-4 pointer-events-none">
          <div className="flex flex-col gap-1">
            <div className="w-1 h-6 bg-gray-400"></div>
            <div className="w-1 h-10 bg-black"></div>
            <div className="w-1 h-4 bg-gray-300"></div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="w-5 h-5 border-2 border-black rotate-45"></div>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-black"></div>
              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
              <div className="w-2 h-2 rounded-full border border-black"></div>
            </div>
            <span className="text-xs text-gray-400 tracking-widest">MEDIA</span>
          </div>
        </div>

        <h1 className="text-3xl md:text-6xl font-bold mb-2 md:mb-4">
          Design Projects
        </h1>
        <h2 className="text-sm md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
          A showcase of my creative work in graphic design, UI/UX, and
          multimedia arts
        </h2>
      </div>

      {/* Bottom Row - Scrolling Right with top fade */}
      <div className="w-full flex-1 relative overflow-hidden">
        {/* Top fade overlay */}
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
            <div
              key={index}
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
