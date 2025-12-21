import { useState } from "react";

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
      <div className="w-full h-full flex flex-col items-center justify-start md:justify-center px-4 md:px-12 py-4 md:py-6 relative overflow-y-auto">
        {/* Geometric Elements */}
        {/* Top Left */}
        <div className="hidden md:flex absolute top-8 left-12 flex-col gap-2 z-20 pointer-events-none">
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 bg-black"></div>
            <div className="w-4 h-4 border-2 border-black"></div>
            <div className="w-4 h-4 bg-gray-300"></div>
          </div>
          <div className="w-16 h-px bg-black"></div>
          <span className="text-xs text-gray-400 tracking-widest">003</span>
        </div>

        {/* Top Right */}
        <div className="hidden md:flex absolute top-8 right-12 flex-col items-end gap-2 z-20 pointer-events-none">
          <div className="flex gap-1">
            <div className="w-8 h-1 bg-black"></div>
            <div className="w-4 h-1 bg-gray-400"></div>
          </div>
          <div className="w-5 h-5 border-2 border-black rotate-45"></div>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-black"></div>
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          </div>
        </div>

        {/* Bottom Left */}
        <div className="hidden md:flex absolute bottom-8 left-12 flex-col gap-2 z-20 pointer-events-none">
          <div className="flex gap-1">
            <div className="w-1 h-8 bg-black"></div>
            <div className="w-1 h-5 bg-gray-400"></div>
            <div className="w-1 h-10 bg-black"></div>
            <div className="w-1 h-6 bg-gray-300"></div>
          </div>
          <span className="text-xs text-gray-400 tracking-widest">
            PROJECTS
          </span>
        </div>

        {/* Bottom Right */}
        <div className="hidden md:flex absolute bottom-8 right-12 flex-col items-end gap-2 z-20 pointer-events-none">
          <div className="grid grid-cols-4 gap-0.5">
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 ${
                  i % 3 === 0 ? "bg-black" : "bg-gray-300"
                }`}
              ></div>
            ))}
          </div>
          <div className="w-6 h-6 rounded-full border border-black flex items-center justify-center">
            <div className="w-2 h-2 bg-black rounded-full"></div>
          </div>
        </div>

        {/* Header */}
        <div className="w-full max-w-7xl mb-4 md:mb-6 mt-2 md:mt-0">
          <h1 className="text-3xl md:text-6xl font-bold mb-1 md:mb-2">
            Code Projects
          </h1>
          <h2 className="text-sm md:text-lg text-gray-600">
            This is a list of my work, both in Web and Mobile
          </h2>
        </div>

        {/* Projects Grid - 3 columns, 2 rows */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-7xl pb-4 md:pb-0"
          style={{ gridAutoRows: "1fr" }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-[240px] md:h-[280px]"
            >
              {/* Image Banner */}
              <div className="relative h-[180px] flex-shrink-0 overflow-hidden bg-gray-100">
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.classList.add(
                      "bg-gradient-to-br",
                      "from-gray-200",
                      "to-gray-300"
                    );
                  }}
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* View Images Button - center */}
                <button
                  onClick={() => openModal(project)}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-sm text-black rounded-full opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 hover:bg-white shadow-lg"
                >
                  <i className="fa-solid fa-images text-base"></i>
                  <span className="text-sm font-semibold">View Images</span>
                </button>

                {/* GitHub Button - bottom right */}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 flex items-center gap-2 px-4 py-2 bg-black/80 backdrop-blur-sm text-white rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-black"
                >
                  <i className="fa-brands fa-github text-base"></i>
                  <span className="text-sm font-medium">View in GitHub</span>
                </a>

                {/* Image count badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm text-white rounded-full text-xs">
                  <i className="fa-solid fa-image"></i>
                  <span>{project.images.length}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-bold mb-1">{project.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && activeProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-2xl overflow-hidden max-w-4xl w-full mx-4 max-h-[90vh] flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="text-xl font-bold">{activeProject.title}</h3>
                <p className="text-sm text-gray-500">
                  {activeImageIndex + 1} of {activeProject.images.length} images
                </p>
              </div>
              <button
                onClick={closeModal}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>

            {/* Main Image */}
            <div className="relative flex-1 bg-gray-100 flex items-center justify-center min-h-[250px] md:min-h-[400px]">
              <img
                src={activeProject.images[activeImageIndex]}
                alt={`${activeProject.title} - Image ${activeImageIndex + 1}`}
                className="max-w-full max-h-[250px] md:max-h-[400px] object-contain"
                onError={(e) => {
                  e.target.src = "";
                  e.target.alt = "Image not found";
                  e.target.className = "hidden";
                }}
              />

              {/* Navigation Arrows */}
              {activeProject.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
                  >
                    <i className="fa-solid fa-chevron-left text-lg"></i>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
                  >
                    <i className="fa-solid fa-chevron-right text-lg"></i>
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Navigation */}
            <div className="p-4 border-t bg-gray-50">
              <div className="flex gap-3 justify-center overflow-x-auto pb-2">
                {activeProject.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
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
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
