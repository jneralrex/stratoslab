// 'use client'

// import { useEffect, useRef, useState } from 'react'
// import { motion } from 'framer-motion'

// export default function AffiliatePage() {
//   const [stats, setStats] = useState({
//     clicks: 0,
//     signups: 0,
//     earnings: 0,
//     referralLink: '',
//   })

//   const [copied, setCopied] = useState(false)
//   const linkRef = useRef(null)

//   useEffect(() => {
//     const fetchAffiliateStats = async () => {
//       const user = 'yourUsername' // Replace with logged-in user
//       const referralLink = `https://yourdomain.com/register?ref=${user}`

//       try {
//         const res = await fetch(`/api/affiliate/stats?ref=${user}`)
//         const data = await res.json()

//         setStats({
//           clicks: data.clicks,
//           signups: data.signups,
//           earnings: data.earnings,
//           referralLink,
//         })
//       } catch (err) {
//         console.error('Failed to fetch affiliate stats', err)
//       }
//     }

//     fetchAffiliateStats()
//   }, [])

//   const handleCopy = async () => {
//     try {
//       if (linkRef.current) {
//         await navigator.clipboard.writeText(linkRef.current.textContent)
//         setCopied(true)
//         setTimeout(() => setCopied(false), 2000)
//       }
//     } catch (err) {
//       console.error('Failed to copy link', err)
//     }
//   }

//   return (
//     <motion.div
//       className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//     >
//       <div className="max-w-2xl w-full text-center">
//         <h1 className="text-4xl font-bold mb-4">Affiliate Dashboard</h1>
//         <p className="mb-6 text-gray-300">
//           Earn money by referring users to our platform. Share your referral link and track your stats below.
//         </p>

//         <div className="bg-gray-800 p-4 rounded-lg mb-6">
//           <h2 className="text-xl font-semibold mb-2">Your Referral Link</h2>
//           <div
//             ref={linkRef}
//             className="bg-gray-700 p-2 rounded text-sm break-all mb-2"
//           >
//             {stats.referralLink || 'Loading...'}
//           </div>
//           <button
//             className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 transition"
//             onClick={handleCopy}
//             disabled={!stats.referralLink}
//           >
//             {copied ? 'Copied!' : 'Copy Link'}
//           </button>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
//           <div className="bg-gray-800 p-4 rounded-lg">
//             <h3 className="text-xl font-bold">{stats.clicks}</h3>
//             <p className="text-gray-400">Total Clicks</p>
//           </div>
//           <div className="bg-gray-800 p-4 rounded-lg">
//             <h3 className="text-xl font-bold">{stats.signups}</h3>
//             <p className="text-gray-400">Signups</p>
//           </div>
//           <div className="bg-gray-800 p-4 rounded-lg">
//             <h3 className="text-xl font-bold">${stats.earnings}</h3>
//             <p className="text-gray-400">Total Earnings</p>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   )
// }

'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function AffiliatePage() {
  const [stats, setStats] = useState({
    clicks: 0,
    signups: 0,
    earnings: 0,
    referralLink: '',
  })

  const [copied, setCopied] = useState(false)
  const linkRef = useRef(null)

  useEffect(() => {
    // Simulate dummy data (no API call)
    const user = 'yourUsername'
    const referralLink = `https://yourdomain.com/register?ref=${user}`

    // Dummy stats
    const dummyData = {
      clicks: 123,
      signups: 45,
      earnings: 890,
    }

    // Set the state directly
    setStats({
      ...dummyData,
      referralLink,
    })
  }, [])

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

  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold mb-4">Affiliate Dashboard</h1>
        <p className="mb-6 text-gray-300">
          Earn money by referring users to our platform. Share your referral link and track your stats below.
        </p>

        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">Your Referral Link</h2>
          <div
            ref={linkRef}
            className="bg-gray-700 p-2 rounded text-sm break-all mb-2"
          >
            {stats.referralLink}
          </div>
          <button
            className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={handleCopy}
          >
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl font-bold">{stats.clicks}</h3>
            <p className="text-gray-400">Total Clicks</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl font-bold">{stats.signups}</h3>
            <p className="text-gray-400">Signups</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl font-bold">${stats.earnings}</h3>
            <p className="text-gray-400">Total Earnings</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
