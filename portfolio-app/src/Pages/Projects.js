import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FadeUp,
  Float,
  StaggerContainer,
  StaggerItem,
} from "../Components/PageTransition";

export default function Projects() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const projects = [
    {
      id: 1,
      title: "NMCG",
      description:
        "A web and mobile application for the Negros Mangrove Conservation Group to manage and monitor mangrove areas.",
      images: [
        "/assets/projects/nmcg.png",
        "/assets/projects/nmcg2.png",
        "/assets/projects/nmcg-3.png",
      ],
      github: "https://github.com/username/project1",
      stack: [
        { img: "/assets/icons/php.png", name: "PHP" },
        { img: "/assets/icons/android.png", name: "Android" },
      ],
    },
    {
      id: 2,
      title: "CET E-Bulletin Board",
      description:
        "A web-based bulletin board system for the College of Engineering and Technology to streamline announcements and event postings.",
      images: [
        "/assets/projects/cet.png",
        "/assets/projects/cet-2.png",
        "/assets/projects/cet-3.png",
      ],
      github: "https://github.com/username/project2",
      stack: [{ img: "/assets/icons/php.png", name: "PHP" }],
    },
    {
      id: 3,
      title: "DocSync",
      description:
        "A platform to connect Doctors with patients for seamless appointment scheduling and medical record sharing.",
      images: [
        "/assets/projects/docsync.png",
        "/assets/projects/docsync-1.png",
        "/assets/projects/docsync-2.png",
        "/assets/projects/docsync-3.png",
        "/assets/projects/docsync-4.png",
      ],
      github: "https://github.com/username/project3",
      stack: [
        { img: "/assets/icons/php.png", name: "PHP" },
        { img: "/assets/icons/flutter.webp", name: "Flutter" },
      ],
    },
    {
      id: 4,
      title: "CareFind",
      description:
        "A centralized platform to connect caregivers and families in need of care services, and a device for pill dispensing.",
      images: [
        "/assets/projects/carefind-1.jpg",
        "/assets/projects/carefind-2.jpg",
        "/assets/projects/carefind-3.jpg",
        "/assets/projects/carefind-4.jpg",
        "/assets/projects/carefind-5.jpg",
        "/assets/projects/carefind-6.jpg",
        "/assets/projects/carefind-7.png",
        "/assets/projects/carefind-8.png",
      ],
      github: "https://github.com/username/project4",
      stack: [
        { img: "/assets/icons/android.png", name: "Android" },
        { img: "/assets/icons/php.png", name: "PHP" },
        { img: "/assets/icons/arduino.png", name: "Arduino" },
      ],
    },
    {
      id: 5,
      title: "Email Phishing Detection System",
      description:
        "A streamlit application designed to detect and prevent email phishing attacks using machine learning and AI",
      images: [
        "/assets/projects/phishing-1.png",
        "/assets/projects/phishing-2.png",
        "/assets/projects/phishing-3.png",
        "/assets/projects/phishing-4.png",
      ],
      github: "https://github.com/username/project5",
      stack: [{ img: "/assets/icons/python.png", name: "Python" }],
    },
    {
      id: 6,
      title: "Thriftly",
      description:
        "A web and mobile application that connects buyers and sellers of second-hand items for sustainable shopping.",
      images: [
        "/assets/projects/thriftly-1.png",
        "/assets/projects/thriftly-2.png",
        "/assets/projects/thriftly-3.png",
        "/assets/projects/thriftly-4.png",
        "/assets/projects/thriftly-5.png",
        "/assets/projects/thriftly-6.png",
        "/assets/projects/thriftly-7.png",
        "/assets/projects/thriftly-8.png",
        "/assets/projects/thriftly-9.png",
      ],
      github: "https://github.com/username/project6",
      stack: [
        { img: "/assets/icons/android.png", name: "Android" },
        { img: "/assets/icons/php.png", name: "PHP" },
      ],
    },
  ];

  const openModal = (project) => {
    setActiveProject(project);
    setActiveImageIndex(0);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveProject(null);
    setActiveImageIndex(0);
  };

  const nextImage = () => {
    if (activeProject) {
      setActiveImageIndex((prev) =>
        prev === activeProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (activeProject) {
      setActiveImageIndex((prev) =>
        prev === 0 ? activeProject.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <>
      <div className="w-full min-h-[100dvh] md:h-full flex flex-col items-center justify-start md:justify-center px-4 md:px-12 py-8 md:py-6 relative">
        {/* Decorative elements with animations */}
        <Float
          delay={0}
          className="hidden md:flex absolute top-8 left-12 flex-col gap-2 z-20 pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex gap-2 items-center"
          >
            <div className="w-4 h-4 bg-black"></div>
            <div className="w-4 h-4 border-2 border-black"></div>
            <div className="w-4 h-4 bg-gray-300"></div>
          </motion.div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="w-16 h-px bg-black origin-left"
          />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="text-xs text-gray-400 tracking-widest"
          >
            003
          </motion.span>
        </Float>

        <Float
          delay={0.2}
          className="hidden md:flex absolute top-8 right-12 flex-col items-end gap-2 z-20 pointer-events-none"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex gap-1 origin-right"
          >
            <div className="w-8 h-1 bg-black"></div>
            <div className="w-4 h-1 bg-gray-400"></div>
          </motion.div>
          <motion.div
            initial={{ rotate: 0, opacity: 0 }}
            animate={{ rotate: 45, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="w-5 h-5 border-2 border-black"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="flex gap-1"
          >
            <div className="w-2 h-2 rounded-full bg-black"></div>
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          </motion.div>
        </Float>

        <Float
          delay={0.4}
          className="hidden md:flex absolute bottom-8 left-12 flex-col gap-2 z-20 pointer-events-none"
        >
          <div className="flex gap-1">
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
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.3, delay: 0.65 }}
              className="w-1 h-6 bg-gray-300 origin-bottom"
            />
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="text-xs text-gray-400 tracking-widest"
          >
            PROJECTS
          </motion.span>
        </Float>

        <Float
          delay={0.6}
          className="hidden md:flex absolute bottom-8 right-12 flex-col items-end gap-2 z-20 pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="grid grid-cols-4 gap-0.5"
          >
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 ${
                  i % 3 === 0 ? "bg-black" : "bg-gray-300"
                }`}
              ></div>
            ))}
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.7, type: "spring" }}
            className="w-6 h-6 rounded-full border border-black flex items-center justify-center"
          >
            <div className="w-2 h-2 bg-black rounded-full"></div>
          </motion.div>
        </Float>

        <FadeUp
          delay={0.1}
          className="w-full max-w-7xl mb-4 md:mb-6 mt-2 md:mt-0"
        >
          <h1 className="text-3xl md:text-6xl font-bold mb-1 mt-0 md:mb-2">
            Code Projects
          </h1>
          <h2 className="text-sm md:text-lg text-gray-600">
            This is a list of my work, both in Web and Mobile
          </h2>
        </FadeUp>

        <StaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-7xl pb-4 md:pb-0"
        >
          {/* card container */}
          {projects.map((project, index) => (
            <StaggerItem key={project.id}>
              <motion.div
                className="group relative bg-white rounded-xl overflow-hidden shadow-md flex flex-col"
                whileHover={{
                  y: -8,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative h-[180px] md:h-[160px] flex-shrink-0 overflow-hidden bg-gray-100">
                  <motion.img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.classList.add(
                        "bg-gradient-to-br",
                        "from-gray-200",
                        "to-gray-300"
                      );
                    }}
                  />

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <button
                    onClick={() => openModal(project)}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-sm text-black rounded-full opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 hover:bg-white hover:scale-105 active:scale-95 shadow-lg z-10"
                  >
                    <i className="fa-solid fa-images text-base"></i>
                    <span className="text-sm font-semibold">View Images</span>
                  </button>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-3 right-3 flex items-center gap-2 px-4 py-2 bg-black/80 backdrop-blur-sm text-white rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-black hover:scale-105 active:scale-95 z-10"
                  >
                    <i className="fa-brands fa-github text-base"></i>
                    <span className="text-sm font-medium">View in GitHub</span>
                  </a>

                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm text-white rounded-full text-xs">
                    <i className="fa-solid fa-image"></i>
                    <span>{project.images.length}</span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex gap-1.5 mb-2">
                    {project.stack?.map((tech, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 * index, type: "spring" }}
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-100 shadow-sm overflow-hidden"
                        title={tech.name}
                      >
                        <img
                          src={tech.img}
                          alt={tech.name}
                          className="w-4 h-4 object-contain"
                        />
                      </motion.div>
                    ))}
                  </div>
                  <h3 className="text-base font-bold mb-1">{project.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3 group-hover:line-clamp-none transition-all">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {createPortal(
        <AnimatePresence>
          {modalOpen && activeProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                exit={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[80vh] md:max-h-[90vh] flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="flex items-center justify-between p-4 border-b"
              >
                <div>
                  <h3 className="text-xl font-bold">{activeProject.title}</h3>
                  <p className="text-sm text-gray-500">
                    {activeImageIndex + 1} of {activeProject.images.length}{" "}
                    images
                  </p>
                </div>
                <motion.button
                  onClick={closeModal}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                  <i className="fa-solid fa-xmark text-xl"></i>
                </motion.button>
              </motion.div>

              <div className="relative flex-1 bg-gray-100 flex items-center justify-center min-h-[250px] md:min-h-[400px]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImageIndex}
                    src={activeProject.images[activeImageIndex]}
                    alt={`${activeProject.title} - Image ${
                      activeImageIndex + 1
                    }`}
                    initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    transition={{ duration: 0.4 }}
                    className="max-w-full max-h-[250px] md:max-h-[400px] object-contain"
                    onError={(e) => {
                      e.target.src = "";
                      e.target.alt = "Image not found";
                      e.target.className = "hidden";
                    }}
                  />
                </AnimatePresence>

                {activeProject.images.length > 1 && (
                  <>
                    <motion.button
                      onClick={prevImage}
                      whileHover={{ scale: 1.1, x: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
                    >
                      <i className="fa-solid fa-chevron-left text-lg"></i>
                    </motion.button>
                    <motion.button
                      onClick={nextImage}
                      whileHover={{ scale: 1.1, x: 2 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
                    >
                      <i className="fa-solid fa-chevron-right text-lg"></i>
                    </motion.button>
                  </>
                )}
              </div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="p-4 border-t bg-gray-50"
              >
                <div className="flex gap-3 justify-center overflow-x-auto pb-2">
                  {activeProject.images.map((image, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden transition-all duration-200 ${
                        index === activeImageIndex
                          ? "ring-2 ring-black ring-offset-2 scale-105"
                          : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.parentElement.classList.add("bg-gray-300");
                          e.target.style.display = "none";
                        }}
                      />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
        document.body
      )}
    </>
  );
}
