'use client';

import { useParams, useRouter } from 'next/navigation';

export default function CourseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug;

  return (
    <div className="text-white p-6 bg-gradient-to-br from-gray-900 to-black min-h-screen">

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
      <h1 className="text-3xl font-bold">Course Detail: {slug}</h1>
      <p className="mt-4">Here you can show detailed information for the course: {slug}</p>
    </div>
  );
}
