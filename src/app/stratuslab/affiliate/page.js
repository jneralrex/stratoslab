'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function AffiliateLandingPage() {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center px-6 py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          💸 Join Our Affiliate Program
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Get paid to refer users! Share your unique link, earn commissions for every signup and sale.
          It&apos;s fast, free, and effortless.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/register">
            <button className="bg-blue-600 px-8 py-3 rounded-lg font-semibold text-white hover:bg-blue-700 transition">
              Join Now
            </button>
          </Link>

          <Link href="/login">
            <button className="bg-transparent border border-blue-600 px-8 py-3 rounded-lg font-semibold text-white hover:bg-blue-700 transition">
              Already an Affiliate?
            </button>
          </Link>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          Earn up to <span className="text-green-400 font-bold">$100</span> per active user. No limits.
        </div>
      </div>
    </motion.div>
  )
}
