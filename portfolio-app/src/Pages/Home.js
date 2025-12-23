import SplineModel from "../Spline/Spline";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full h-full">
      <SplineModel />
      <div className="hidden md:flex absolute bottom-8 right-8 flex-col items-end gap-2 z-20 pointer-events-none">
        <div className="w-8 h-8 border-2 border-black rotate-45"></div>
        <div className="flex gap-1 mt-2">
          <div className="w-1 h-6 bg-black"></div>
          <div className="w-1 h-4 bg-gray-400"></div>
          <div className="w-1 h-8 bg-black"></div>
        </div>
        <span className="text-xs text-gray-400 tracking-widest">2024</span>
      </div>
      <div className="absolute bottom-5 right-4 w-60 h-20 bg-white text-white">
        AAAAAAAAA
      </div>

      <div className="hidden md:flex absolute top-32 left-8 flex-col gap-2 z-20 pointer-events-none">
        <div className="w-12 h-px bg-black"></div>
        <div className="w-8 h-px bg-gray-400"></div>
        <div className="flex gap-1 mt-1">
          <div className="w-2 h-2 rounded-full bg-black"></div>
          <div className="w-2 h-2 rounded-full border border-black"></div>
        </div>
        <span className="text-xs text-gray-400 tracking-widest">001</span>
      </div>

      <header className="absolute top-0 left-0 right-0 z-10">
        <div className="flex flex-col md:flex-row w-full border-b border-dashed border-black py-3 md:py-6 px-4 md:px-8">
          <div className="flex-1 border-b md:border-b-0 md:border-r border-dashed border-black pb-2 md:pb-0 md:pr-8 mb-2 md:mb-0 flex items-center justify-between">
            <span className="text-3xl md:text-6xl text-black font-bold">
              XY
            </span>
            <a
              href="/assets/files/resume.pdf"
              download
              className="md:hidden flex items-center gap-2 text-sm text-black hover:scale-105 transition-transform"
            >
              <i className="fa-solid fa-download"></i>
              <span>Resume</span>
            </a>
          </div>
          <div className="hidden md:block flex-1 border-r border-dashed border-black px-8">
            <span className="text-lg text-black font-semibold block">Role</span>
            <span className="text-base text-black block">
              Web/Mobile Developer, Multimedia Artist
            </span>
          </div>
          <div className="hidden md:block flex-1 pl-8 text-right">
            <span className="text-lg text-black font-semibold block">
              Based in Bacolod, PH
            </span>
            <a
              href="/assets/files/resume.pdf"
              download
              className="inline-flex items-center justify-end gap-1.5 text-base text-black hover:scale-105 transition-transform w-full"
            >
              <i className="fa-solid fa-download text-sm"></i>
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      </header>
      <div className="relative p-4 md:p-8 text-white text-center flex flex-col items-center justify-center h-full">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 md:p-12 shadow-2xl mx-4">
          <h1 className="drop-shadow-xs text-3xl md:text-6xl font-bold text-slate-900">
            Hi! I'm Xyrex Kyle Salazar
          </h1>
          <p className="drop-shadow-lg text-slate-900 mt-2 md:mt-4 text-base md:text-xl">
            I like to create and design things.
          </p>
        </div>
      </div>
    </div>
  );
}
