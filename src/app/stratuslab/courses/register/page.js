"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// 🔁 Rename this from RegisterPage to RegisterForm
function RegisterForm() {
  const searchParams = useSearchParams();
  const selectedCourse = searchParams.get("course");
  const ref = searchParams.get("ref");


  const [referral, setReferral] = useState("");

  useEffect(() => {
    if (ref) {
      setReferral(ref);
    }
  }, [ref]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: selectedCourse || "",
    refCode: ref || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.name || !formData.email || !formData.course) {
    alert("Please fill in all fields.");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData), // includes refCode!
    });

    if (!res.ok) throw new Error("Registration failed");
    const data = await res.json();

    alert("Successfully registered for " + formData.course);
    console.log("Registered:", data);

    // Redirect to dashboard
    window.location.href = "/stratuslab/courses/dashboard";
  } catch (err) {
    console.error(err);
    alert("Error during registration.");
  }
};


  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">
          Create Your Account
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Name
          </label>
          <input
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Course */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Course
          </label>
          <input
            type="text"
            name="course"
            value={formData.course}
            readOnly
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Refferal Code */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Refferal Code
          </label>
          <input
            type="text"
            name="refCode"
            value={referral}           
             readOnly
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Your Password"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Submit */}
        <Link href="/stratuslab/courses/dashboard">
        
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3 rounded-lg transition duration-200 w-full"
        >
          Submit Registration
        </button>
        </Link>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/stratuslab/courses/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </motion.div>
  );
}

// 🔁 Keep this wrapper with Suspense
export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="text-white text-center">Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
