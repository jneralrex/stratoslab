'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import useAuthStore from '@/utils/store/useAuthStore'
import useAffiliateStore from '@/utils/store/useAffiliateStore'

export default function AffiliatePage() {
  const { user } = useAuthStore()
  const { earnings, fetchEarnings, fetchReferrals, referrals, loading, error } = useAffiliateStore()

  const [copied, setCopied] = useState(false)
  const linkRef = useRef(null)

  useEffect(() => {
    if (!user) return
    fetchEarnings() 
    fetchReferrals()
  }, [user, fetchEarnings, fetchReferrals])

  const handleCopy = async () => {
    try {
      if (linkRef.current) {
        await navigator.clipboard.writeText(linkRef.current.textContent)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (err) {
      console.error('Failed to copy link', err)
    }
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-gray-900">
        <p>Please log in to access your affiliate dashboard.</p>
      </div>
    )
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold mb-4">Affiliate Dashboard</h1>
        <p className="mb-6 text-gray-300">
          Welcome <span className="font-semibold">{user?.username}</span>!  
          Earn money by referring users to our platform.
        </p>

        {/* Referral Link */}
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">Your Referral Link</h2>
          <div
            ref={linkRef}
            className="bg-gray-700 p-2 rounded text-sm break-all mb-2"
          >
            {user.refLink}
          </div>
          <button
            className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={handleCopy}
          >
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>

        {/* Stats */}
        {loading && <p>Loading stats...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {earnings && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-bold">{referrals.count || 0}</h3>
                <p className="text-gray-400">Total Referrals</p>
              </div>

            
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-bold">${earnings.data?.commissions?.reduce((sum, c) => sum + c.amount, 0) || 0}</h3>
                <p className="text-gray-400">Earnings Commissions</p>
              </div>
            </div>

            {/* List commissions */}
            <div className="mt-8 text-left">
              <h2 className="text-2xl font-semibold mb-4">Commission History</h2>
              <ul className="space-y-3">
                {earnings.data?.commissions?.map((c, i) => (
                  <li key={i} className="bg-gray-800 p-4 rounded-lg">
                    <p><span className="font-bold">${c.amount}</span> - {c.type} ({c.status})</p>
                    <p className="text-gray-400 text-sm">
                      User: {c.referredUser.username} | {new Date(c.createdAt).toLocaleDateString()}
                    </p>
                  </li>
                ))}

               
              </ul>
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}
