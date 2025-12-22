export default function About() {
  const logosRow1 = [
    {
      name: "React",
      icon: (
        <img
          src="/assets/icons/react.png"
          alt="React"
          className="w-12 h-12 object-contain"
        />
      ),
    },
    {
      name: "Flutter",
      icon: (
        <img
          src="/assets/icons/flutter.webp"
          alt="Flutter"
          className="w-12 h-12 object-contain"
        />
      ),
    },
    {
      name: "PHP",
      icon: (
        <img
          src="/assets/icons/php.png"
          alt="PHP"
          className="w-12 h-12 object-contain"
        />
      ),
    },
    {
      name: "Python",
      icon: (
        <img
          src="/assets/icons/python.png"
          alt="Python"
          className="w-12 h-12 object-contain"
        />
      ),
    },
    {
      name: "Android",
      icon: (
        <img
          src="/assets/icons/android.png"
          alt="Android"
          className="w-12 h-12 object-contain"
        />
      ),
    },
    {
      name: "Arduino",
      icon: (
        <img
          src="/assets/icons/arduino.png"
          alt="Arduino"
          className="w-12 h-12 object-contain"
        />
      ),
    },
  ];

  const logosRow2 = [
    {
      name: "Premiere Pro",
      icon: (
        <img
          src="/assets/icons/premiere.png"
          alt="Premiere Pro"
          className="w-12 h-12 object-contain"
        />
      ),
    },
    {
      name: "Photoshop",
      icon: (
        <img
          src="/assets/icons/photoshop.png"
          alt="Photoshop"
          className="w-12 h-12 object-contain"
        />
      ),
    },
    {
      name: "Illustrator",
      icon: (
        <img
          src="/assets/icons/illustrator.png"
          alt="Illustrator"
          className="w-12 h-12 object-contain"
        />
      ),
    },
    {
      name: "After Effects",
      icon: (
        <img
          src="/assets/icons/aftereffects.png"
          alt="After Effects"
          className="w-12 h-12 object-contain"
        />
      ),
    },
  ];

  const logosRow3 = [
    {
      name: "Figma",
      icon: (
        <img
          src="/assets/icons/figma.png"
          alt="Figma"
          className="w-12 h-12 object-contain"
        />
      ),
    },
    {
      name: "Canva",
      icon: (
        <img
          src="/assets/icons/canva.webp"
          alt="Canva"
          className="w-12 h-12 object-contain"
        />
      ),
    },
  ];

  const LogoRow = ({ logos }) => {
    return (
      <div className="flex flex-wrap gap-8 justify-center w-full">
        {logos.map((logo, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center hover:scale-110 transition-transform"
          >
            <div className="w-20 h-20 flex items-center justify-center">
              {logo.icon}
            </div>
            <span className="text-sm text-black mt-2 whitespace-nowrap">
              {logo.name}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full md:w-3/4 h-full flex flex-col md:flex-row relative overflow-y-auto md:overflow-visible">
      <div className="hidden md:flex absolute top-8 right-0 flex-col items-end gap-3 z-20 pointer-events-none">
        <div className="flex gap-2 items-center">
          <span className="text-xs text-gray-400 tracking-widest">002</span>
          <div className="w-4 h-4 border-2 border-black"></div>
        </div>
        <div className="flex gap-1">
          <div className="w-6 h-1 bg-black"></div>
          <div className="w-3 h-1 bg-gray-300"></div>
        </div>
        <div className="w-6 h-6 rounded-full border border-black"></div>
      </div>
      <div className="hidden md:flex absolute bottom-8 left-0 flex-col gap-2 z-20 pointer-events-none">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-black"></div>
          <div className="w-3 h-3 bg-gray-400"></div>
          <div className="w-3 h-3 border border-black"></div>
        </div>
        <div className="w-20 h-px bg-gradient-to-r from-black to-transparent"></div>
        <span className="text-xs text-gray-400 tracking-widest">ABOUT</span>
      </div>
      <div className="hidden md:flex absolute bottom-8 right-0 flex-col items-end gap-2 z-20 pointer-events-none">
        <div className="grid grid-cols-3 gap-1">
          <div className="w-2 h-2 bg-black"></div>
          <div className="w-2 h-2 bg-gray-300"></div>
          <div className="w-2 h-2 bg-black"></div>
          <div className="w-2 h-2 bg-gray-300"></div>
          <div className="w-2 h-2 bg-black"></div>
          <div className="w-2 h-2 bg-gray-300"></div>
        </div>
        <div className="flex gap-1">
          <div className="w-1 h-4 bg-black"></div>
          <div className="w-1 h-6 bg-gray-400"></div>
          <div className="w-1 h-3 bg-black"></div>
        </div>
      </div>
      <div className="w-full md:w-1/2 h-1/2 md:rounded-full md:h-full flex items-center justify-center p-4 md:p-8 flex-shrink-0">
        <div className="w-40 md:w-80 h-full md:rounded-full overflow-hidden shadow-2xl">
          <img
            src="/assets/myImage.png"
            alt="Profile"
            className="w-full h-full object-cover md:rounded-full"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentElement.innerHTML =
                '<div class="w-full h-full flex items-center justify-center text-gray-400 text-lg">Your Image</div>';
            }}
          />
        </div>
      </div>
      <div className="w-full md:w-3/4 flex-1 flex flex-col justify-center p-4 md:p-8">
        <div className="flex-2 mb-6 md:mb-12">
          <div className="mb-4 md:mb-6">
            <div className="text-left mb-6 md:mb-12">
              <h1 className="text-4xl md:text-8xl font-bold mb-3 md:mb-6">
                A Developer—
              </h1>
              <div className="flex items-center justify-between">
                <h1 className="text-4xl md:text-8xl font-bold">
                  and an Editor
                </h1>
                <div className="hidden md:flex gap-2">
                  <span>■</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm md:text-lg text-gray-700 leading-relaxed">
            Hello! I started web development back in 2021, driven by my
            background in multimedia arts. Over the years, I've honed my skills
            in both front-end and back-end technologies, as well as engaging in
            Mobile Application Development, allowing me to create dynamic and
            responsive web applications.
          </p>
        </div>

        <div className="space-y-4">
          <LogoRow logos={logosRow1} />
          <LogoRow logos={logosRow2} />
          <LogoRow logos={logosRow3} />
        </div>
      </div>
    </div>
  );
}
