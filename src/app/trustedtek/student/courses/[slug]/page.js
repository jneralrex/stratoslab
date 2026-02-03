"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

const courses = [
  {
    slug: "social-media-management",
    title: "Social Media Management",
    description:
      "Dive deep into platform algorithms, content strategies, analytics, and campaign planning.",
    image: "/images/courses/social-media.webp",
  },
  {
    slug: "business-management",
    title: "Business Management",
    description:
      "Explore leadership, business models, team building, operations, and financial planning.",
    image: "/images/courses/business-pics.webp",
  },
  {
    slug: "ai-building",
    title: "AI Building Fundamentals",
    description:
      "Build intelligent systems using Python, ML frameworks, and deploy real-world AI projects.",
    image: "/images/courses/ai-pics.webp",
  },
  {
    slug: "web-development",
    title: "Web Development Essentials",
    description:
      "Learn HTML, CSS, JavaScript, React, and backend development with APIs and databases.",
    image: "/images/courses/web.webp",
  },
  {
    slug: "community-management",
    title: "Community Management",
    description:
      "Learn to build trust, manage engagement, and grow active online communities.",
    image: "/images/courses/community.webp",
  },
  {
    slug: "web3-marketing",
    title: "Marketing & Community Growth",
    description:
      "Master token economies, community growth hacks, and brand development for Web3.",
    image: "/images/courses/marketing.avif",
  },
  {
    slug: "forex",
    title: "Forex",
    description:
      "Become proficient in currency trading strategies, market analysis, and risk management.",
    image: "/images/courses/forex.avif",
  },
  {
    slug: "animation-and-illustration",
    title: "Animation & Illustration",
    description:
      "Learn the art of storytelling through motion graphics, character design, and visual effects.",
    image: "/images/courses/animation.avif",
  },
];

export default function CourseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug;

  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    return (
      <div className="text-white p-6 bg-black min-h-screen">
        <button
          onClick={() => router.back()}
          className="text-green-400 hover:underline flex items-center gap-2 mb-4"
        >
          <span>←</span>
          <span>Back</span>
        </button>
        <h1 className="text-3xl font-bold">Course Not Found</h1>
        <p>The course you`&apos;`re looking for doesn`&apos;`t exist.</p>
      </div>
    );
  }

  const handleRegister = () => {
  router.push(`/trustedtek/student/register?course=${course.slug}`);
};


  return (
    <div className="text-white p-6 bg-gradient-to-br from-gray-900 to-black min-h-screen">
      <button
        onClick={() => router.back()}
        className="text-green-400 hover:underline flex items-center gap-2 mb-6"
      >
        <span>←</span>
        <span>Back</span>
      </button>

      <div className="max-w-4xl mx-auto">
        <Image
        width={1000}
              height={1000}
          src={course.image}
          alt={course.title}
          className="w-full lg:h-[400px] object-cover rounded-lg mb-6"
        />
        <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
        <p className="text-gray-300 text-lg">{course.description}</p>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-2">What we offer</h2>
          <ul className="list-disc list-inside text-gray-400 space-y-2 mb-6">
            <li>Hands-on projects</li>
            <li>Weekly assignments</li>
            <li>Community access</li>
          </ul>

          {/* Register Button */}
          <button
            onClick={handleRegister}
            className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3 rounded-lg transition duration-200"
          >
            Register for this Course
          </button>
        </div>
      </div>
    </div>
  );
}
