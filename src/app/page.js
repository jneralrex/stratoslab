"use client";

import FAQ from "@/components/Faq";
import Snackbar from "@/components/Snackbar";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import Link from "next/link";


export default function Home() {
  const [conditional, setConditional] = useState("transparent");
  const [conditionalButton, setConditionalButton] = useState("hidden");

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
    console.log("Form submit triggered"); // ✅

    console.log("Current message.services:", message.services);

    if (!message.services || message.services.length === 0) {
      console.log("No services selected — aborting");
      setSnackbar({
        message: "Please select at least one service.",
        type: "error",
      });
      return;
    }

    setLoading(true); // ✅ should now be visible

    try {
      console.log("Sending email...");

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


      console.log("EmailJS response:", response);

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
      console.error("Submit error:", error);
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

    const currentRef = calendlyRef.current; // Copy the ref value to a local variable
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => {
      if (window.Calendly && currentRef) {
        window.Calendly.initInlineWidget({
          url: "https://calendly.com/stratos_lab/30min",
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
        currentRef.innerHTML = ""; // Use the local variable in the cleanup function
      }
    };
  }, [calendlyLoaded]);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setConditional(
          "bg-[#4e3c70] backdrop-blur-lg transition-all mt-[20px] md:w-[90%] md:mx-auto duration-300"
        );
      } else {
        setConditionalButton("hidden");
        setConditional("bg-transparent md:w-[90%] md:mx-auto duration-300");
      }

      if (window.scrollY > 500) {
        setConditionalButton(
          "hidden sm:block bg-[#4e3c70] backdrop-blur-lg transition-all duration-300"
        );
      } else {
        setConditionalButton("hidden");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
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
        className={`fixed left-0 right-0 transition-all duration-300 ${conditional} rounded-lg z-[99]`}
      >
        <div className="flex justify-between items-center text-white  h-16">
          <Image
            src="/logo2.png"
            alt="Stratos lab logo"
            width={50}
            height={50}
            // className="w-28 lg:w-30"
            // className="w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36"
            //  sizes="(max-width: 768px) 180px, (max-width: 1024px) 100px, 150px"
             className="h-auto w-auto"

          />{" "}
          <div className=" flex gap-2 sm:gap-4 justify-evenly items-center w-[80%] sm:w-[80%] lg:w-[70%] text-[8px] sm:text-[14px]">
            <div
              className="cursor-pointer"
              onClick={() => handleScrollById("services")}
            >
              Services
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
              <Link href="/stratuslab/student/courses" aria-label="Explore our Courses">
                Join Our Classes
              </Link>
            </div>
            <div className="cursor-pointer">
              <Link href="/stratuslab/affiliate" aria-label="Visit our Affiliate Program">
                Affiliate Program
              </Link>
            </div>
            <div
              className={`${conditionalButton} text-white bg-[#171717] rounded-lg p-2 border-2 border-white hover:bg-black hover:border-white transition-all duration-300 max-w-[100px] cursor-pointer`}
              onClick={() => setCalendlyLoaded(true)}
            >
              Book a Call
            </div>
          </div>
        </div>
      </nav>

       <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-[#4e3c70] text-white border-2 border-white shadow-lg transition-all duration-300 ${
          conditionalButton === "hidden" ? "hidden" : "block"
        }`}
        aria-label="Back to Top"
      >
        ↑
      </button>
      
      <div className="h-screen text-white">
        <div className="flex flex-col items-center justify-center h-screen gap-[10px] lg:gap-[50px] p-2 ">
          <h1 className="text-[26px] sm:text-[40px] lg:text-6xl font-extrabold text-center max-w-[1240px] md:p-5 mt-[30px] md:mt-[50px]">
            Premium design and development trusted by Web3 founders.
          </h1>
          <p className="text-lg text-center max-w-[620px]">
            We excel at transforming innovative Web3 ideas into fully
            functional, secure, and outstanding products.
          </p>
          <div className="p-5 border-2 border-white rounded-lg bg-[#4e3c70]   backdrop-blur-lg transition-all">
            <div className="max-w-[400px] flex flex-col items-center justify-center gap-4">
              <div className="text-2xl font-bold text-center">
                <span className="text-[#f5a623]">Contact</span> us for a free
                consultation
              </div>
              <div className="flex gap-4">
                <button
                  className=" backdrop-blur-lg md:mx-auto  text-white bg-[#171717] rounded-lg p-2 border-2 border-white hover:bg-black hover:border-white transition-all duration-300 max-w-[100px]"
                  onClick={() => setCalendlyLoaded(true)}
                >
                  <p className="text-white hover:text-white"> Book a Call</p>
                </button>
                <button
                  className=" backdrop-blur-lg md:mx-auto  text-white bg-[#171717] rounded-lg p-2 border-2 border-white hover:bg-black hover:border-white transition-all duration-300 max-w-[100px]"
                  onClick={() => setContactForm(true)}
                >
                  Fill a form
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col  justify-center min-h-screen bg-gradient-to-t from-[#2b1055]/90 via-[#23153c]/90 to-black/90 z-10">
        <h1
          id="services"
          className="text-2xl lg:text-6xl font-extrabold text-center mt-10 mb-10 max-w-[1240px] text-white w-[80%] mx-auto"
        >
          Services we offer at Stratos lab
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
                {/* Black overlay */}
                <div className="absolute inset-0 bg-black opacity-50"></div>

                {/* Slide content */}
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

        <div className="flex flex-col items-center justify-center gap-4 mt-10">
          <h1 className="text-2xl sm:text-6xl font-extrabold text-center mb-4 max-w-[1240px] text-white">
            Why Choose Us?
          </h1>
          <p className="text-lg text-center max-w-[620px] text-[#b2aeb9] font-bold">
            Our team is dedicated to delivering high-quality solutions that meet
            your unique needs. We pride ourselves on our attention to detail and
            commitment to excellence.
          </p>
          <div className="flex flex-col md:flex-row gap-10 justify-center items-center max-w-[90%] mx-auto">
            <div className="border-2 p-5 flex flex-col justify-center rounded-lg lg:h-[500px] w-full bg-gradient-to-tl from-amber-300 via-[#23153c] to-amber-300">
              <p className="w-full text-center md:text-start font-bold text-[25px] md:text-[30px] lg:text-[40px] text-white">
                Are you a new founder?
              </p>
              <ul className="text-start text-[22px] mt-4 flex flex-col gap-5 lg:text-[25px] text-[#b2aeb9] font-bold">
                <li>Looking to quickly develop an MVP?</li>
                <li>Need expert guidance for your project?</li>
                <li>Want to ensure your project&#39;s success?</li>
              </ul>
            </div>
            <div className="border-2 p-5 flex flex-col justify-center rounded-lg lg:h-[500px] w-full bg-gradient-to-tr from-green-300 via-[#23153c] to-green-300">
              <p className="w-full text-center md:text-start font-bold text-[25px] md:text-[30px] lg:text-[40px] text-white">
                Are you an existing founder?
              </p>
              <ul className="text-start text-[22px] mt-4 flex flex-col gap-5 lg:text-[25px] text-[#b2aeb9] font-bold">
                <li>Looking to redesign your website or application?</li>
                <li>
                  Want to enhance the user experience of your
                  product?
                </li>
                <li>Need to create a token or smart contract?</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-10 justify-center items-center max-w-[90%] mx-auto">
            <div className="border-2 p-5 flex flex-col md:flex-row justify-center rounded-lg lg:h-[300px] w-full bg-gradient-to-tr from-[#23153c] via-[#624f85] to-[#23153c]">
              <div>
                <p className="w-full text-center md:text-start font-bold text-[25px] md:text-[30px] lg:text-[40px] text-white">
                  We deliver with unmatched speed
                </p>
                <p className="text-start text-[22px] mt-4 flex flex-col gap-5 lg:text-[25px] text-[#b2aeb9] font-bold">
                  Our team prioritizes fast delivery, ensuring we meet deadlines
                  without compromising quality.
                </p>
              </div>
              <Image
                src="/24hrs.svg"
                alt="24-hour delivery"
                width={600}
                height={400}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-10 justify-center items-center max-w-[90%] mx-auto">
            <div className="border-2 p-5 flex flex-col lg:flex-row justify-center items-center rounded-lg lg:max-h-[400px] w-full bg-gradient-to-tr from-green-300 via-[#23153c] to-green-300">
              <div>
                <p className="w-full text-center md:text-start font-bold text-[25px] md:text-[30px] lg:text-[40px] text-white">
                  Security is our top priority
                </p>
                <p className="text-start text-[22px] mt-4 flex flex-col gap-5 lg:text-[25px] text-[#b2aeb9] font-bold">
                  We build with security at the forefront, implementing best
                  practices to safeguard your data and assets.
                </p>
              </div>
              <Image
                src="/lock.svg"
                alt="Security-focused development"
                width={80}
                height={80}
              />
            </div>
            <div className="border-2 p-5 flex flex-col lg:flex-row justify-center items-center rounded-lg lg:max-h-[400px] w-full bg-gradient-to-tl from-amber-300 via-[#23153c] to-amber-300">
              <div>
                <p className="w-full text-center md:text-start font-bold text-[25px] md:text-[30px] lg:text-[40px] text-white">
                  Meet our super-powered team
                </p>
                <p className="text-start text-[22px] mt-4 flex flex-col gap-5 lg:text-[25px] text-[#b2aeb9] font-bold">
                  Our expert team combines deep industry knowledge, innovation,
                  and precision to deliver exceptional results.
                </p>
              </div>
              <Image
                src="/bolt.svg"
                alt="Super-powered team"
                width={80}
                height={80}
              />
            </div>
          </div>
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
              className=" backdrop-blur-lg md:mx-auto  text-white bg-[#171717] rounded-lg p-2 border-2 border-white hover:bg-black hover:border-white transition-all duration-300 max-w-[100px]"
              onClick={() => setCalendlyLoaded(true)}
            >
              <p className="text-white hover:text-white"> Book a Call</p>
            </button>
            <button
              className=" backdrop-blur-lg md:mx-auto  text-white bg-[#171717] rounded-lg p-2 border-2 border-white hover:bg-black hover:border-white transition-all duration-300 max-w-[100px]"
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
            &copy; 2025 Stratos lab. All rights reserved.
          </p>
        </footer>
      </div>
      {/* Calendly Popup Widget */}
      {calendlyLoaded && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[999] flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl relative h-[500px]">
            <button
              onClick={() => setCalendlyLoaded(false)}
              className="absolute left-0 -top-5 md:top-2 text-gray-600 hover:text-red-500 text-[50px] font-bold"
            >
              &times;
            </button>

            {/* Calendly iframe container */}
            <div
              ref={calendlyRef}
              style={{
                minHeight: "100%", // Take up the full height of the parent container
                height: "100%", // Ensure it fills the height of the modal
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

      {/* Snackbar Notification */}
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
