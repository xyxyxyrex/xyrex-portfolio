import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // EmailJS credentials from environment variables
  const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/xyrex-kyle-salazar-36572a392/",
      icon: "fa-brands fa-linkedin-in",
    },
    {
      name: "GitHub",
      url: "https://github.com/xyxyxyrex",
      icon: "fa-brands fa-github",
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/xyxyrex/",
      icon: "fa-brands fa-facebook-f",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/xyxyreeex/",
      icon: "fa-brands fa-instagram",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col relative overflow-y-auto">
      {/* Geometric Elements */}
      {/* Top Left */}
      <div className="hidden md:flex absolute top-8 left-12 flex-col gap-2 z-20 pointer-events-none">
        <div className="flex gap-2 items-center">
          <div className="w-4 h-4 bg-black"></div>
          <div className="w-4 h-4 border-2 border-black"></div>
        </div>
        <div className="w-12 h-px bg-black"></div>
        <span className="text-xs text-gray-400 tracking-widest">005</span>
      </div>

      {/* Top Right */}
      <div className="hidden md:flex absolute top-8 right-12 flex-col items-end gap-2 z-20 pointer-events-none">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-black"></div>
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          <div className="w-2 h-2 rounded-full bg-black"></div>
        </div>
        <div className="w-6 h-6 border-2 border-black rotate-45"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 md:px-12 py-6 md:py-8">
        <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8 md:gap-16">
          {/* Left Side - Info */}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-2 md:mb-4">
              Let's Talk
            </h1>
            <p className="text-base md:text-xl text-gray-600 mb-6 md:mb-8">
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
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-4 md:space-y-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  Message sent successfully!
                </div>
              )}
              {submitStatus === "error" && (
                <div className="flex items-center justify-center gap-2 text-red-600 font-medium">
                  <i className="fa-solid fa-times-circle"></i>
                  Failed to send. Please try again.
                </div>
              )}
              )
            </form>
          </div>
        </div>
      </div>

      {/* Footer - Similar to Home header */}
      <footer className="border-t border-dashed border-black flex-shrink-0">
        <div className="flex flex-wrap md:flex-nowrap w-full py-4 md:py-6 px-4 md:px-8">
          {socialLinks.map((social, index) => (
            <div
              key={social.name}
              className={`w-1/2 md:flex-1 flex items-center justify-center gap-2 md:gap-3 py-2 md:py-0 ${
                index !== socialLinks.length - 1
                  ? "md:border-r md:border-dashed md:border-black"
                  : ""
              }`}
            >
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 md:gap-3 group"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <i
                    className={`${social.icon} text-white text-sm md:text-lg`}
                  ></i>
                </div>
                <span className="text-sm md:text-base font-medium group-hover:underline">
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
