import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create mailto link as fallback
    const mailtoLink = `mailto:salazar.xyrexkyle@gmail.com?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    // Open email client
    window.location.href = mailtoLink;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 1000);
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/yourprofile",
      icon: "fa-brands fa-linkedin-in",
    },
    {
      name: "GitHub",
      url: "https://github.com/yourprofile",
      icon: "fa-brands fa-github",
    },
    {
      name: "Facebook",
      url: "https://facebook.com/yourprofile",
      icon: "fa-brands fa-facebook-f",
    },
    {
      name: "Instagram",
      url: "https://instagram.com/yourprofile",
      icon: "fa-brands fa-instagram",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col relative">
      {/* Geometric Elements */}
      {/* Top Left */}
      <div className="absolute top-8 left-12 flex flex-col gap-2 z-20 pointer-events-none">
        <div className="flex gap-2 items-center">
          <div className="w-4 h-4 bg-black"></div>
          <div className="w-4 h-4 border-2 border-black"></div>
        </div>
        <div className="w-12 h-px bg-black"></div>
        <span className="text-xs text-gray-400 tracking-widest">005</span>
      </div>

      {/* Top Right */}
      <div className="absolute top-8 right-12 flex flex-col items-end gap-2 z-20 pointer-events-none">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-black"></div>
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          <div className="w-2 h-2 rounded-full bg-black"></div>
        </div>
        <div className="w-6 h-6 border-2 border-black rotate-45"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-12 py-8">
        <div className="w-full max-w-4xl flex gap-16">
          {/* Left Side - Info */}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-6xl font-bold mb-4">Let's Talk</h1>
            <p className="text-xl text-gray-600 mb-8">
              Have a project in mind or want to collaborate? Feel free to reach
              out!
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  <i className="fa-solid fa-envelope text-white text-lg"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a
                    href="mailto:salazar.xyrexkyle@gmail.com"
                    className="text-lg font-medium hover:underline"
                  >
                    salazar.xyrexkyle@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  <i className="fa-solid fa-location-dot text-white text-lg"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-lg font-medium">
                    Bacolod City, Philippines
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="text-sm w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="text-sm w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full text-sm px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full text-sm px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <i className="fa-solid fa-spinner animate-spin"></i>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Send Message
                    <i className="fa-solid fa-paper-plane"></i>
                  </span>
                )}
              </button>

              {submitStatus === "success" && (
                <div className="flex items-center justify-center gap-2 text-green-600 font-medium">
                  <i className="fa-solid fa-check-circle"></i>
                  Email client opened! Send your message there.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Footer - Similar to Home header */}
      <footer className="border-t border-dashed border-black">
        <div className="flex w-full py-6 px-8">
          {socialLinks.map((social, index) => (
            <div
              key={social.name}
              className={`flex-1 flex items-center justify-center gap-3 ${
                index !== socialLinks.length - 1
                  ? "border-r border-dashed border-black"
                  : ""
              }`}
            >
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <i className={`${social.icon} text-white text-lg`}></i>
                </div>
                <span className="font-medium group-hover:underline">
                  {social.name}
                </span>
              </a>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
