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
    time: "",
  });

  const courses = [
    {
      title: "Social Media Management",
      description: "Master strategy, content, analytics, and engagement on all major platforms.",
      slug: "social-media-management",
      image: "/images/courses/social-media.webp",
    },
    {
      title: "Business Management",
      description: "Learn modern business practices, team leadership, operations, and finance.",
      slug: "business-management",
      image: "/images/courses/business-pics.webp",
    },
    {
      title: "AI Building Fundamentals",
      description: "Build and deploy AI systems using practical tools and frameworks.",
      slug: "ai-building",
      image: "/images/courses/ai-pics.webp",
    },
    {
      title: "Web Development Essentials",
      description: "Front-end to back-end web development with React, Next.js, and APIs.",
      slug: "web-development",
      image: "/images/courses/web.webp",
    },
    {
      title: "Community Management",
      description: "Grow and nurture vibrant online communities with modern strategies.",
      slug: "community-management",
      image: "/images/courses/community.webp",
    },
    {
      title: "Marketing & Community Growth",
      description: "Learn how to grow and retain users for Web3 projects.",
      slug: "web3-marketing",
      image: "/images/courses/marketing.avif",
    },
    {
      title: "Forex",
      description:
        "Become proficient in currency trading strategies, market analysis, and risk management.",
      slug: "forex",
      image: "/images/courses/forex.avif",
    },
    {
      title: "Animation & Illustration",
      description:
        "Learn the art of storytelling through motion graphics, character design, and visual effects.",
      slug: "animation-and-illustration",
      image: "/images/courses/animation.avif",
    },
  ];

  const validateInput = (e) => {
    const { name, value } = e.target;
    setMessage((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const emailData = {
        ...message,
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
            src="/logo-new.webp"
            alt="Trustedtek lab logo"
            width={30}
            height={30}
            className="h-auto w-auto ml-4"

          />{" "}
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
        className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-[#4e3c70] text-white border-2 border-white shadow-lg transition-all duration-300 ${conditionalButton === "hidden" ? "hidden" : "block"
          }`}
        aria-label="Back to Top"
      >
        ↑
      </button>

      <div className="h-screen text-white">
        <div className="flex flex-col items-center justify-center h-screen gap-[10px] lg:gap-[50px] p-2 ">
          <h1 className="text-[26px] sm:text-[40px] lg:text-6xl font-extrabold text-center max-w-[1240px] md:p-5 mt-[30px] md:mt-[50px]">
            Unlock Your Potential with Our Expert-Led Classes
          </h1>
          <p className="text-lg text-center max-w-[620px]">
            Dive into the world of Web3 with our comprehensive courses, designed to take you from beginner to expert.
          </p>
          <div className="p-5 border-2 border-white rounded-lg bg-[#4e3c70]   backdrop-blur-lg transition-all">
            <div className="max-w-[400px] flex flex-col items-center justify-center gap-4">
              <div className="text-2xl font-bold text-center">
                <span className="text-[#f5a623]">Enroll Now</span> and start your journey
              </div>
              <div className="flex gap-4">
                <Link href="/trustedtek/student" className=" backdrop-blur-lg md:mx-auto  text-white bg-[#171717] rounded-lg p-2 border-2 border-white hover:bg-black hover:border-white transition-all duration-300 max-w-[150px]">
                  Explore Classes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col  justify-center min-h-screen bg-gradient-to-t from-[#2b1055]/90 via-[#23153c]/90 to-black/90 z-10">

        <div className="flex flex-col items-center justify-center gap-4 mt-10 p-5">
          <h1 className="text-2xl sm:text-6xl font-extrabold text-center mb-4 max-w-[1240px] text-white">
            Our Courses
          </h1>
          <p className="text-lg text-center max-w-[620px] text-[#b2aeb9] font-bold">
            We offer a variety of courses to help you master new skills and advance your career.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 w-[90%] mx-auto">
            {courses.map((course, index) => (
              <div key={index} className="bg-[#4e3c70] rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-102">
                <Image src={course.image} alt={course.title} width={400} height={250} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                  <p className="text-[#b2aeb9] mb-4">{course.description}</p>
                  <Link href={`/trustedtek/student/courses/${course.slug}`} className="text-white font-semibold bg-[#171717] border-2 border-white py-2 px-4 rounded-md hover:bg-black transition">
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
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
