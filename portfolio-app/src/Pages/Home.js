import SplineModel from "../Spline/Spline";
import { motion } from "framer-motion";
import { FadeUp, Float, ScaleIn } from "../Components/PageTransition";

export default function Home() {
  return (
    <div className="relative min-h-[100dvh] md:min-h-screen w-full h-full">
      <SplineModel />

      {/* Decorative elements with float animation */}
      <Float
        delay={0}
        className="hidden md:flex absolute bottom-8 right-8 flex-col items-end gap-2 z-20 pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 1, rotate: 45 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-8 h-8 border-2 border-black"
        />
        <div className="flex gap-1 mt-2">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="w-1 h-6 bg-black origin-bottom"
          />
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="w-1 h-4 bg-gray-400 origin-bottom"
          />
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            className="w-1 h-8 bg-black origin-bottom"
          />
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-xs text-gray-400 tracking-widest"
        >
          2024
        </motion.span>
      </Float>

      <div className="absolute bottom-5 right-4 w-60 h-20 bg-white text-white">
        AAAAAAAAA
      </div>

      <Float
        delay={0.3}
        className="hidden md:flex absolute top-32 left-8 flex-col gap-2 z-20 pointer-events-none"
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-12 h-px bg-black origin-left"
        />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-8 h-px bg-gray-400 origin-left"
        />
        <div className="flex gap-1 mt-1">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5, type: "spring" }}
            className="w-2 h-2 rounded-full bg-black"
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.6, type: "spring" }}
            className="w-2 h-2 rounded-full border border-black"
          />
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-xs text-gray-400 tracking-widest"
        >
          001
        </motion.span>
      </Float>

      <motion.header
        initial={{ y: -100, opacity: 0, filter: "blur(10px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute top-0 left-0 right-0 z-10"
      >
        <div className="flex flex-col md:flex-row w-full border-b border-dashed border-black py-3 md:py-6 px-4 md:px-8">
          <div className="flex-1 border-b md:border-b-0 md:border-r border-dashed border-black pb-2 md:pb-0 md:pr-8 mb-2 md:mb-0 flex items-center justify-between">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-3xl md:text-6xl text-black font-bold"
            >
              XY
            </motion.span>
            <motion.a
              href="/assets/files/resume.pdf"
              download
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="md:hidden flex items-center gap-2 text-sm text-black"
            >
              <i className="fa-solid fa-download"></i>
              <span>Resume</span>
            </motion.a>
          </div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hidden md:block flex-1 border-r border-dashed border-black px-8"
          >
            <span className="text-lg text-black font-semibold block">Role</span>
            <span className="text-base text-black block">
              Web/Mobile Developer, Multimedia Artist
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="hidden md:block flex-1 pl-8 text-right"
          >
            <span className="text-lg text-black font-semibold block">
              Based in Bacolod, PH
            </span>
            <motion.a
              href="/assets/files/resume.pdf"
              download
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-end gap-1.5 text-base text-black w-full"
            >
              <i className="fa-solid fa-download text-sm"></i>
              <span>Download Resume</span>
            </motion.a>
          </motion.div>
        </div>
      </motion.header>

      <div className="relative p-4 md:p-8 text-white text-center flex flex-col items-center justify-center h-full pt-32 md:pt-0">
        <ScaleIn delay={0.2}>
          <motion.div
            className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 md:p-12 shadow-2xl mx-4"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
            transition={{ duration: 0.3 }}
          >
            <FadeUp delay={0.4}>
              <h1 className="drop-shadow-xs text-3xl md:text-6xl font-bold text-slate-900">
                Hi! I'm Xyrex Kyle Salazar
              </h1>
            </FadeUp>
            <FadeUp delay={0.6}>
              <p className="drop-shadow-lg text-slate-900 mt-2 md:mt-4 text-base md:text-xl">
                I like to create and design things.
              </p>
            </FadeUp>
          </motion.div>
        </ScaleIn>
      </div>
    </div>
  );
}
