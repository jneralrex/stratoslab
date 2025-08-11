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
    <div className="min-h-screen bg-black text-white p-10">
      <div className="max-w-4xl mx-auto flex items-center mb-8">
        <button
          onClick={() => router.back()}
          className="mr-4 text-green-400 hover:underline flex items-center gap-2"
        >
          <span>←</span>
          <span>Back</span>
        </button>
        <h1 className="text-4xl font-bold text-center w-full">Our Courses</h1>
      </div>

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
              href={`/stratuslab/courses/${course.slug}`}
              className="text-green-400 hover:underline"
            >
              View Course →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
