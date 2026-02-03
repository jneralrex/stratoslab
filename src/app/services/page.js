"use client";

import FAQ from "@/components/Faq";
import Snackbar from "@/components/Snackbar";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import Link from "next/link";


export default function Services() {
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);
  const calendlyRef = useRef(null);

  const [contactForm, setContactForm] = useState(false);
  const [snackbar, setSnackbar] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    services: "",
    time: "",
  });

  const validateInput = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setMessage((prev) => {
        const services = prev.services || [];
        return {
          ...prev,
          services: checked
            ? [...services, value] // Add service if checked
            : services.filter((service) => service !== value), // Remove service if unchecked
        };
      });
    } else {
      setMessage((prev) => ({ ...prev, [name]: value }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.services || message.services.length === 0) {
      setSnackbar({
        message: "Please select at least one service.",
        type: "error",
      });
      return;
    }

    setLoading(true);

    try {
      const formattedServices = message.services.join(", ");
      const emailData = {
        ...message,
        services: formattedServices,
        time: new Date().toLocaleString(),
      };

      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        emailData,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID
      )


      if (response.status === 200) {
        setSnackbar({
          message: "Message submitted successfully!",
          type: "success",
        });
        setMessage({
          name: "",
          email: "",
          subject: "",
          message: "",
          services: "",
          time: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setSnackbar({
        message: "Failed to submit message. Try again!",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (snackbar.message) {
      const timer = setTimeout(
        () => setSnackbar({ message: "", type: "" }),
        5000
      );
      return () => clearTimeout(timer);
    }
  }, [snackbar.message]);

  useEffect(() => {
    if (!calendlyLoaded) return;

    const currentRef = calendlyRef.current;
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => {
      if (window.Calendly && currentRef) {
        window.Calendly.initInlineWidget({
          url: "https://calendly.com/trustedek01",
          parentElement: currentRef,
          prefill: {},
          utm: {},
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      if (currentRef) {
        currentRef.innerHTML = "";
      }
    };
  }, [calendlyLoaded]);


  const slides = [
    {
      image: "/marketing.avif",
      title: "Marketing and Community Management",
      description:
        "We help developers and brands build strong communities and execute effective marketing strategies to drive growth.",
    },
    {
      image: "/ux.avif",
      title: "UI/UX Design",
      description:
        "We craft user-centered designs that enhance usability, improve user satisfaction, and deliver seamless experiences.",
    },
    {
      image: "/socialmedia.avif",
      title: "Social Media Management",
      description:
        "We manage social media platforms to boost visibility, engage audiences, and drive authentic user traffic to your projects.",
    },
    {
      image: "/fullstack.avif",
      title: "Full Stack Development",
      description:
        "We develop robust and scalable web applications using the latest technologies and best practices.",
    },
    {
      image: "/graphicdesign.avif",
      title: "Graphic Designs and Animations",
      description:
        "We create visually stunning graphic designs and animations that captivate and communicate effectively.",
    },
    {
      image: "/contentcreation.avif",
      title: "Content Creation",
      description:
        "We produce high-quality content tailored to your brand, ensuring it resonates with your target audience.",
    },
    {
      image: "/token.avif",
      title: "Token Creation",
      description:
        "We specialize in creating secure and scalable tokens for blockchain projects, tailored to your specific needs.",
    },
    {
      image: "/telegram.avif",
      title: "Telegram Bots Setup",
      description:
        "We develop and set up Telegram bots to automate tasks, enhance engagement, and streamline communication.",
    },
    {
      image: "/smartcontract.avif",
      title: "Smart Contracts",
      description:
        "We write secure and efficient smart contracts to power your blockchain applications with confidence.",
    },
    {
      image: "/coaching.avif",
      title: "Coaching",
      description:
        "We provide expert coaching to help you navigate challenges and achieve your business goals effectively.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  const handleScrollById = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  useEffect(() => {
    handleScrollById("top");
  }, []);

  return (
    <main id="top" className="">
      <nav
        className="fixed left-0 right-0 transition-all duration-300 bg-[#4e3c70] backdrop-blur-lg mt-[20px] md:w-[90%] md:mx-auto rounded-lg z-[99]"
      >
        <div className="flex justify-between items-center text-white  h-16">
          <Link href="/">
            <Image
              src="/logo-new.webp"
              alt="Trustedtek lab logo"
              width={30}
              height={30}
              className="h-auto w-auto ml-4 cursor-pointer"

            />{" "}
          </Link>
          <div className=" flex gap-2 sm:gap-4 justify-evenly items-center w-[80%] sm:w-[80%] lg:w-[70%] text-[8px] sm:text-[14px]">
            <div className="cursor-pointer">
              <Link href="/services">Services</Link>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => handleScrollById("contact")}
            >
              Contact
            </div>
            <div className="cursor-pointer">

              <a href={"https://glistening-vest-5c6.notion.site/2038f6cae2cf80519084d3c2521e5b15?v=2038f6cae2cf816f81c8000cd65f4441&source=copy_link"} target="_blank" aria-label="Visit our Portfolio">
                Portfolio
              </a>
            </div>
            <div className="cursor-pointer">
              <Link href="/trustedtek/student" aria-label="Explore our Courses">
                Classes
              </Link>
            </div>
            <div className="cursor-pointer">
              <Link href="/trustedtek/affiliate" aria-label="Visit our Affiliate Program">
                Affiliate Program
              </Link>
            </div>
          </div>
        </div>
      </nav>

       <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-[#4e3c70] text-white border-2 border-white shadow-lg transition-all duration-300 block"
        aria-label="Back to Top"
      >
        ↑
      </button>
      
      <div className="h-screen text-white">
        <div className="flex flex-col items-center justify-center h-screen gap-[10px] lg:gap-[50px] p-2 ">
          <h1 className="text-[26px] sm:text-[40px] lg:text-6xl font-extrabold text-center max-w-[1240px] md:p-5 mt-[30px] md:mt-[50px]">
            Our Professional Services
          </h1>
          <p className="text-lg text-center max-w-[620px]">
            We provide comprehensive solutions to help you build, launch, and grow your Web3 projects.
          </p>
          <div className="flex gap-4">
            <button
              className=" backdrop-blur-lg md:mx-auto  text-white bg-[#171717] rounded-lg p-2 border-2 border-white hover:bg-black hover:border-white transition-all duration-300 max-w-[150px]"
              onClick={() => setCalendlyLoaded(true)}
            >
              <p className="text-white hover:text-white"> Book a Call</p>
            </button>
            <button
              className=" backdrop-blur-lg md:mx-auto  text-white bg-[#171717] rounded-lg p-2 border-2 border-white hover:bg-black hover:border-white transition-all duration-300 max-w-[150px]"
              onClick={() => setContactForm(true)}
            >
              Fill a form
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col  justify-center min-h-screen bg-gradient-to-t from-[#2b1055]/90 via-[#23153c]/90 to-black/90 z-10">
        <h1
          id="services-section"
          className="text-2xl lg:text-6xl font-extrabold text-center mt-10 mb-10 max-w-[1240px] text-white w-[80%] mx-auto"
        >
          Services We Offer
        </h1>
        <div className="relative w-full lg:max-w-[90%] mx-auto overflow-hidden bg-[#4e3c70] rounded-lg">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="relative min-w-full flex flex-col items-center justify-center gap-4 p-5"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "400px",
                }}
              >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <h2 className="relative text-[30px] lg:text-[50px] font-bold text-center text-white z-10">
                  {slide.title}
                </h2>
                <p className="relative text-lg text-center text-white z-10">
                  {slide.description}
                </p>
                <div className="absolute flex justify-center mt-4 bottom-2 z-20">
                  {slides.map((_, index) => (
                    <span
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-3 w-3 mx-1 rounded-full cursor-pointer ${currentIndex === index ? "bg-white" : "bg-gray-500"
                        }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={prevSlide}
            className="absolute -bottom-5 md:top-1/2 left-4 transform -translate-y-1/2 bg-white text-black px-4 py-2 rounded-full border-black/50 border-2 backdrop-blur-lg"
          >
            Prev
          </button>
          <button
            onClick={nextSlide}
            className="absolute -bottom-5 md:top-1/2 right-4 transform -translate-y-1/2 bg-white text-black px-4 py-2 rounded-full border-black/50 border-2 backdrop-blur-lg"
          >
            Next
          </button>
        </div>

        <FAQ />

        <div
          id="contact"
          className="flex flex-col items-center justify-center gap-4 p-5"
        >
          <h1 className="text-3xl sm:text-6xl font-extrabold text-center max-w-[1240px] text-white">
            Ready to get started?
          </h1>
          <p className="text-lg text-center max-w-[620px] text-[#b2aeb9] font-bold">
            Contact us today via any of these chanel for consultation and let us
            help you bring your vision to life.
          </p>
          <div className="flex gap-4">
            <button
              className=" backdrop-blur-lg md:mx-auto  text-white bg-[#171717] rounded-lg p-2 border-2 border-white hover:bg-black hover:border-white transition-all duration-300 max-w-[150px]"
              onClick={() => setCalendlyLoaded(true)}
            >
              <p className="text-white hover:text-white"> Book a Call</p>
            </button>
            <button
              className=" backdrop-blur-lg md:mx-auto  text-white bg-[#171717] rounded-lg p-2 border-2 border-white hover:bg-black hover:border-white transition-all duration-300 max-w-[150px]"
              onClick={() => setContactForm(true)}
            >
              Fill a form
            </button>
          </div>
          <div className="flex gap-4">
            <a href={"https://twitter.com/stratos_lab"} target="_blank" aria-label="Visit our Twitter">
              <Image
                src="/x.png"
                alt="Twitter"
                width={40}
                height={40}
                className="cursor-pointer"
              />
            </a>
            <a href={""} target="_blank" aria-label="Visit our Discord">
              <Image
                src="/discord.png"
                alt="Discord"
                width={40}
                height={40}
                className="cursor-pointer"
              />
            </a>

            <a href={"https://t.me/STRATOS_LAB"} target="_blank" aria-label="Visit our Telegram">
              <Image
                src="/telegramlogo.svg"
                alt="Telegram"
                width={40}
                height={40}
                className="cursor-pointer"
              />
            </a>
          </div>
        </div>
        <footer className="flex justify-center items-center gap-4 mt-10 bg-black p-5">
          <p className="text-[#b2aeb9] text-[12px] font-bold md:text-[20px]">
            &copy; 2025 Trustedtek lab. All rights reserved.
          </p>
        </footer>
      </div>
      {calendlyLoaded && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[999] flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl relative h-[500px]">
            <button
              onClick={() => setCalendlyLoaded(false)}
              className="absolute left-0 -top-5 md:top-2 text-gray-600 hover:text-red-500 text-[50px] font-bold"
            >
              &times;
            </button>
            <div
              ref={calendlyRef}
              style={{
                minHeight: "100%",
                height: "100%",
              }}
            />
          </div>
        </div>
      )}
      {contactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[999] flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full sm:w-8/12 overflow-auto max-h-[90vh]">
            <div className="flex flex-row justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-white">
                Send a Message
              </h2>
              <button
                onClick={() => setContactForm(false)}
                className="text-gray-600 hover:text-red-500 text-4xl font-bold"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="p-3 rounded-md bg-gray-800 text-white focus:ring focus:ring-green-400"
                value={message.subject}
                onChange={validateInput}
                required
              />
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="p-3 rounded-md bg-gray-800 text-white focus:ring focus:ring-green-400"
                value={message.name}
                onChange={validateInput}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="p-3 rounded-md bg-gray-800 text-white focus:ring focus:ring-green-400"
                value={message.email}
                onChange={validateInput}
                required
              />
              <div className="p-3 rounded-md text-white bg-gray-800">
                <p>Which of our services would you be needing?</p>
                <div className="flex flex-col space-y-2">
                  {[
                    "UI/UX Design",
                    "Full Stack Development",
                    "Content Creation",
                    "Marketing and Community Management",
                    "Social Media Management",
                    "Graphic Designs and Animations",
                    "Token Creation",
                    "Telegram Bots Setup",
                    "Smart Contracts",
                    "Coaching",
                  ].map((service) => (
                    <label
                      key={service}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        name="services"
                        value={service}
                        onChange={validateInput}
                        className="form-checkbox text-green-500"
                      />
                      <span>{service}</span>
                    </label>
                  ))}
                </div>
              </div>
              <textarea
                name="message"
                placeholder="Message here..."
                className="p-3 rounded-md bg-gray-800 text-white focus:ring focus:ring-green-400 h-32"
                value={message.message}
                onChange={validateInput}
                required
              />
              <button
                type="submit"
                className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition disabled:bg-gray-500"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      )}

      {snackbar.message && (
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          onClose={() => setSnackbar({ message: "", type: "" })}
        />
      )}
    </main>
  );
}