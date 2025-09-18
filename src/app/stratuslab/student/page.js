"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CoursesPage() {
  const router = useRouter();

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
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 🔹 Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-black px-6 py-20 text-center relative">
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-6 text-green-400 hover:underline flex items-center gap-2"
        >
          <span>←</span>
          <span>Back</span>
        </button>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Unlock Your Career Potential 🚀
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Choose from our expert-led courses in{" "}
          <span className="text-green-400">tech, business, and community growth</span>.  
          Gain hands-on skills and take your career to the next level.
        </p>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="#courses"
            className="bg-green-500 px-8 py-3 rounded-lg font-semibold text-black hover:bg-green-400 transition"
          >
            Browse Courses
          </Link>
          <Link
            href="/stratuslab/student/login"
            className="bg-transparent border border-green-400 px-8 py-3 rounded-lg font-semibold text-green-400 hover:bg-green-400 hover:text-black transition"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Why Learn With Us */}
      <section className="py-16 max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
        <div className="bg-[#1f1f1f] p-6 rounded-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-green-400 mb-2">🎯 Practical Skills</h3>
          <p className="text-gray-300">Courses designed for real-world application, not just theory.</p>
        </div>
        <div className="bg-[#1f1f1f] p-6 rounded-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-green-400 mb-2">💻 Industry Experts</h3>
          <p className="text-gray-300">Learn from professionals with proven experience in their fields.</p>
        </div>
        <div className="bg-[#1f1f1f] p-6 rounded-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-green-400 mb-2">🌍 Flexible Learning</h3>
          <p className="text-gray-300">Study at your own pace with lifetime access to resources.</p>
        </div>
      </section>

      {/* Courses Grid */}
      <section id="courses" className="py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Our Courses</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {courses.map((course) => (
            <div
              key={course.slug}
              className="bg-[#1f1f1f] p-6 rounded-lg shadow-lg border border-gray-700 hover:shadow-green-500/30 transition-shadow duration-200"
            >
              <div className="h-40 overflow-hidden mb-4 rounded-md">
                <Image
                  width={1000}
                  height={1000}
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
              <p className="text-gray-300 mb-4">{course.description}</p>
              <Link
                href={`/stratuslab/student/courses/${course.slug}`}
                className="text-green-400 hover:underline"
              >
                View Course →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-green-500 to-blue-600 py-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
          Ready to Level Up Your Skills?
        </h2>
        <p className="text-black mb-6">Join thousands of learners already transforming their careers.</p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="#courses"
            className="bg-black px-8 py-3 rounded-lg font-semibold text-white hover:bg-gray-800 transition"
          >
            Get Started
          </Link>
          <Link
            href="/stratuslab/student/login"
            className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Login to Continue
          </Link>
        </div>
      </section>
    </div>
  );
}
