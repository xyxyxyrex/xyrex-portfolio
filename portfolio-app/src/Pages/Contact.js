import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import {
  FadeUp,
  SlideIn,
  Float,
  StaggerContainer,
  StaggerItem,
} from "../Components/PageTransition";

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
    <div className="w-full min-h-[100dvh] md:h-full flex flex-col relative py-4 md:py-0">
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
        </motion.div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="w-12 h-px bg-black origin-left"
        />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-xs text-gray-400 tracking-widest"
        >
          005
        </motion.span>
      </Float>

      <Float
        delay={0.2}
        className="hidden md:flex absolute top-8 right-12 flex-col items-end gap-2 z-20 pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex gap-1"
        >
          <div className="w-2 h-2 rounded-full bg-black"></div>
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          <div className="w-2 h-2 rounded-full bg-black"></div>
        </motion.div>
        <motion.div
          initial={{ rotate: 0, opacity: 0 }}
          animate={{ rotate: 45, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="w-6 h-6 border-2 border-black"
        />
      </Float>

      <div className="flex-1 flex items-center justify-center px-4 md:px-12 py-6 md:py-8">
        <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8 md:gap-16">
          {/* Left Side - Contact Info */}
          <SlideIn
            direction="left"
            delay={0.1}
            className="flex-1 flex flex-col justify-center"
          >
            <FadeUp delay={0.2}>
              <h1 className="text-4xl md:text-6xl font-bold mb-2 md:mb-4">
                Let's Talk
              </h1>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p className="text-base md:text-xl text-gray-600 mb-6 md:mb-8">
                Have a project in mind or want to collaborate? Feel free to
                reach out!
              </p>
            </FadeUp>

            <div className="space-y-4">
              <FadeUp delay={0.4}>
                <motion.div
                  className="flex items-center gap-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="w-12 h-12 bg-black rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <i className="fa-solid fa-envelope text-white text-lg"></i>
                  </motion.div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a
                      href="mailto:salazar.xyrexkyle@gmail.com"
                      className="text-lg font-medium hover:underline"
                    >
                      salazar.xyrexkyle@gmail.com
                    </a>
                  </div>
                </motion.div>
              </FadeUp>

              <FadeUp delay={0.5}>
                <motion.div
                  className="flex items-center gap-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="w-12 h-12 bg-black rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: -10 }}
                  >
                    <i className="fa-solid fa-location-dot text-white text-lg"></i>
                  </motion.div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-lg font-medium">
                      Bacolod City, Philippines
                    </p>
                  </div>
                </motion.div>
              </FadeUp>
            </div>
          </SlideIn>

          {/* Right Side - Form */}
          <SlideIn direction="right" delay={0.2} className="flex-1">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-4 md:space-y-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FadeUp delay={0.3}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <motion.input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      whileFocus={{
                        scale: 1.02,
                        boxShadow: "0 0 0 3px rgba(0,0,0,0.1)",
                      }}
                      className="text-sm w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                </FadeUp>
                <FadeUp delay={0.35}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <motion.input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      whileFocus={{
                        scale: 1.02,
                        boxShadow: "0 0 0 3px rgba(0,0,0,0.1)",
                      }}
                      className="text-sm w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </FadeUp>
              </div>
              <FadeUp delay={0.4}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <motion.input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    whileFocus={{
                      scale: 1.02,
                      boxShadow: "0 0 0 3px rgba(0,0,0,0.1)",
                    }}
                    className="w-full text-sm px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                    placeholder="What's this about?"
                  />
                </div>
              </FadeUp>
              <FadeUp delay={0.45}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <motion.textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    whileFocus={{
                      scale: 1.02,
                      boxShadow: "0 0 0 3px rgba(0,0,0,0.1)",
                    }}
                    className="w-full text-sm px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
              </FadeUp>
              <FadeUp delay={0.5}>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-black text-white hover:bg-gray-800 hover:shadow-lg"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.i
                        className="fa-solid fa-spinner"
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          ease: "linear",
                        }}
                      />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Send Message
                      <motion.i
                        className="fa-solid fa-paper-plane"
                        whileHover={{ x: 5, y: -5 }}
                      />
                    </span>
                  )}
                </motion.button>
              </FadeUp>
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center gap-2 text-green-600 font-medium"
                >
                  <i className="fa-solid fa-check-circle"></i>
                  Message sent successfully!
                </motion.div>
              )}
              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center gap-2 text-red-600 font-medium"
                >
                  <i className="fa-solid fa-times-circle"></i>
                  Failed to send. Please try again.
                </motion.div>
              )}
            </form>
          </SlideIn>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="border-t border-dashed border-black flex-shrink-0"
      >
        <div className="flex flex-wrap md:flex-nowrap w-full py-4 md:py-6 px-4 md:px-8">
          {socialLinks.map((social, index) => (
            <motion.div
              key={social.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
              className={`w-1/2 md:flex-1 flex items-center justify-center gap-2 md:gap-3 py-2 md:py-0 ${
                index !== socialLinks.length - 1
                  ? "md:border-r md:border-dashed md:border-black"
                  : ""
              }`}
            >
              <motion.a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 md:gap-3 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="w-8 h-8 md:w-10 md:h-10 bg-black rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.15, rotate: 10 }}
                >
                  <i
                    className={`${social.icon} text-white text-sm md:text-lg`}
                  ></i>
                </motion.div>
                <span className="text-sm md:text-base font-medium group-hover:underline">
                  {social.name}
                </span>
              </motion.a>
            </motion.div>
          ))}
        </div>
      </motion.footer>
    </div>
  );
}
