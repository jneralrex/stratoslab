"use client";
import Link from "next/link";

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, Alex 👋</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">You have 2 unread notifications</p>
      </div>

      {/* Grid Layout */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Enrolled Courses */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">🎓 Enrolled Courses</h2>
          <ul className="space-y-3">
            <li className="flex justify-between items-center">
              <span>Web Development Bootcamp</span>
              <span className="text-sm text-green-500">In Progress</span>
            </li>
            <li className="flex justify-between items-center">
              <span>AI Fundamentals</span>
              <span className="text-sm text-yellow-500">Starts Soon</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Community Management</span>
              <span className="text-sm text-blue-500">Active</span>
            </li>
          </ul>
        </div>

        {/* Upcoming */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">📅 Upcoming Sessions</h2>
          <ul className="space-y-3">
            <li>
              <strong>React Class</strong> – Monday 10 AM
            </li>
            <li>
              <strong>Assignment #3</strong> – Due Wednesday
            </li>
          </ul>
        </div>

        {/* Announcements */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 col-span-2">
          <h2 className="text-xl font-semibold mb-4">📢 Announcements</h2>
          <ul className="space-y-2 list-disc list-inside text-sm">
            <li>"Live session postponed to Friday 4PM."</li>
            <li>"New resource uploaded for Week 4."</li>
          </ul>
        </div>

        {/* Certificates */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">🧾 Certificates</h2>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>Web Development</span>
              <Link href="/certificates/web-dev.pdf" className="text-blue-500 hover:underline">
                Download
              </Link>
            </li>
            <li className="flex justify-between">
              <span>Community Management</span>
              <span className="text-yellow-500">In Progress</span>
            </li>
          </ul>
        </div>

        {/* Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">⚙️ Account Settings</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/profile" className="text-blue-500 hover:underline">Update Profile</Link>
            </li>
            <li>
              <Link href="/change-password" className="text-blue-500 hover:underline">Change Password</Link>
            </li>
            <li>
              <Link href="/logout" className="text-red-500 hover:underline">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
