'use client'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { logUserIn } from '@/utils/axios/endPoints'
import useLoadingStore from '@/utils/store/useLoading'

export default function LoginPage() {
  const { register, handleSubmit } = useForm()
  const { loading } = useLoadingStore(); 

  const router = useRouter()

  const onSubmit = async (formData) => {
    try {
      await logUserIn(formData)
      router.push("/trustedtek/affiliate/dashboard") 
    } catch (error) {
      alert("Login failed: " + (error.response?.data?.message || error.message))
    }
  }

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

        {/* Submit */}
        <button 
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
                  {loading ? "Logging in..." : "Login"}

        </button>

        <p className="text-sm mt-4 text-center text-gray-600 dark:text-gray-400">
          Don&apos;t have an account? <a href="/trustedtek/affiliate/register" className="text-blue-500 hover:underline">Register</a>
        </p>
      </form>
    </motion.div>
  )
}
