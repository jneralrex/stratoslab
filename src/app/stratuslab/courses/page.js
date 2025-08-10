"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CoursesPage() {
  const router = useRouter(); // Correct hook for navigation

  const courses = [
    {
      title: "Web3 Development Bootcamp",
      description: "Learn smart contracts, full-stack dApps, and blockchain basics.",
      slug: "web3-bootcamp",
    },
    {
      title: "UI/UX Design for Crypto Projects",
      description: "Design intuitive, secure, and engaging interfaces for Web3 products.",
      slug: "ui-ux-web3",
    },
    {
      title: "Marketing & Community Growth",
      description: "Learn how to grow and retain users for Web3 projects.",
      slug: "web3-marketing",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="max-w-4xl mx-auto flex items-center mb-8">
        <button
          onClick={() => router.back()}
          className="mr-4 text-green-400 hover:underline flex items-center gap-2"
        >
         
          <div>
 ←
          </div>
           <div>
             Back
           </div>
        </button>
        <h1 className="text-4xl font-bold text-center w-full">Our Courses</h1>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {courses.map((course) => (
          <div key={course.slug} className="bg-[#1f1f1f] p-6 rounded-lg shadow-lg border border-gray-700">
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
