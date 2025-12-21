'use client'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useLoadingStore from '@/utils/store/useLoading'
import { regAdmin } from '@/utils/axios/endPoints'
import { useEffect, useState } from 'react'

export default function RegisterPage() {
  const { register, handleSubmit, watch, setValue } = useForm()

  const { loading } = useLoadingStore();
  const [countries, setCountries] = useState([]);
    const [loadingCountries, setLoadingCountries] = useState(true);
    const [phoneCode, setPhoneCode] = useState("");

  const router = useRouter()

  // Fetch countries
  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags,idd"
        );
        const data = await res.json();

        const formatted = data.map((c) => ({
          name: c.name.common,
          flag: c.flags?.png,
          code: c.idd?.root ? c.idd.root + (c.idd.suffixes?.[0] || "") : "",
        }));

        formatted.sort((a, b) => a.name.localeCompare(b.name));
        setCountries(formatted);
      } catch (err) {
        console.error("Failed to fetch countries", err);
      } finally {
        setLoadingCountries(false);
      }
    }

    fetchCountries();
  }, []);

  // Handle country selection → auto-fill phone code
  const handleCountryChange = (e) => {
    const selected = countries.find((c) => c.name === e.target.value);
    if (selected?.code) {
      setPhoneCode(selected.code);
      setValue("phoneNumber", selected.code + " "); // Pre-fill with code
    }
  };

  const onSubmit = async (formData) => {
    try {
      await regAdmin(formData)
      router.push("/trustedtek/super-admin/verify-otp")
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
          Create Your Account
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Full Name
          </label>
          <input
            type="text"
            {...register("fullName")}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Country of Residence */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Country of Residence
          </label>
          {loadingCountries ? (
            <p className="text-gray-500">Loading countries...</p>
          ) : (
            <select
              {...register("countryOfResidence")}
              required
              onChange={handleCountryChange}
              className="w-full px-4 py-2 rounded-md border"
            >
              <option value="">Select your country</option>
              {countries.map((c, i) => (
                <option key={i} value={c.name}>
                  {c.name} ({c.code || "N/A"})
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Phone Number</label>
          <input
            type="text"
            {...register("phoneNumber")}
            placeholder="e.g. +234 8012345678"
            className="w-full px-4 py-2 rounded-md border"
            required
          />
        </div>


        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Username
          </label>
          <input
            type="text"
            {...register("username")}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

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
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          {loading ? "Signing up..." : "Sign Up"}

        </button>

        <p className="text-sm mt-4 text-center text-gray-600 dark:text-gray-400">
          Already have an account? <a href="/trustedtek/affiliate/login" className="text-blue-500 hover:underline">Login</a>
        </p>
      </form>
    </motion.div>
  )
}
