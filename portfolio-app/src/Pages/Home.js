import SplineModel from "../Spline/Spline";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full h-full">
      <SplineModel />
      {/* Geometric Elements */}
      {/* Top Right */}
      {/* Bottom Right */}
      <div className="absolute bottom-8 right-8 flex flex-col items-end gap-2 z-20 pointer-events-none">
        <div className="w-8 h-8 border-2 border-black rotate-45"></div>
        <div className="flex gap-1 mt-2">
          <div className="w-1 h-6 bg-black"></div>
          <div className="w-1 h-4 bg-gray-400"></div>
          <div className="w-1 h-8 bg-black"></div>
        </div>
        <span className="text-xs text-gray-400 tracking-widest">2024</span>
      </div>
      {/* Top Left Corner Accent */}
      <div className="absolute top-32 left-8 flex flex-col gap-2 z-20 pointer-events-none">
        <div className="w-12 h-px bg-black"></div>
        <div className="w-8 h-px bg-gray-400"></div>
        <div className="flex gap-1 mt-1">
          <div className="w-2 h-2 rounded-full bg-black"></div>
          <div className="w-2 h-2 rounded-full border border-black"></div>
        </div>
        <span className="text-xs text-gray-400 tracking-widest">001</span>
      </div>
      {/* Header with 3 sections */}
      <header className="absolute top-0 left-0 right-0 z-10">
        <div className="flex w-full border-b border-dashed border-black py-6 px-8">
          <div className="flex-1 border-r border-dashed border-black pr-8">
            <span className="text-6xl text-black font-bold">XY</span>
          </div>
          <div className="flex-1 border-r border-dashed border-black px-8">
            <span className="text-lg text-black font-semibold block">Role</span>
            <span className="text-base text-black block">
              Web/Mobile Developer, Multimedia Artist
            </span>
          </div>
          <div className="flex-1 pl-8 text-right">
            <span className="text-lg text-black font-semibold block">
              Based in Bacolod, PH
            </span>
            <span className="text-base text-black block">
              Web Developer + Multimedia Artist
            </span>
          </div>
        </div>
      </header>
      <div className="relative p-8 text-white text-center flex flex-col items-center justify-center h-full">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-12 shadow-2xl">
          <h1 className="drop-shadow-xs text-6xl font-bold text-slate-900">
            Hi! I'm Xyrex Kyle Salazar
          </h1>
          <p className="drop-shadow-lg text-slate-900 mt-4 text-xl">
            I like to create and design things.
          </p>
        </div>
      </div>
    </div>
  );
}
