"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import useLoadingStore from "@/utils/store/useLoading";
import { logStudent} from "@/utils/axios/endPoints";

export default function LoginPage() {
const { register, handleSubmit } = useForm();
  const { loading } = useLoadingStore(); 

  const router = useRouter();

 const onSubmit = async (formData) => {
  try {
    const user = await logStudent(formData);  

    if (!user) return; 

    router.push("/trustedtek/student/dashboard"); 
  } catch (error) {
    alert("Login failed: " + (error.response?.data?.message || error.message));
  }
};


  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">
          Login to Your Account
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input 
            type="email"
            {...register("email")} 
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Password
          </label>
          <input 
            type="password"
            {...register("password")} 
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3 rounded-lg transition duration-200 w-full"
        >
         {loading ? "Logging in..." : "Login"}        </button>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don`&apos;`t have an account?{" "}
            <Link
              href="/trustedtek/student/register"
              className="text-blue-500 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </motion.div>
  );
}
