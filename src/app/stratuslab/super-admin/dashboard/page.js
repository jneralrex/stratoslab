'use client';

import { useState } from 'react';
import AllUsers from './all-users/page.js';
import AllTransactions from './all-transactions/page.js';
import useAuthStore from '@/utils/store/useAuthStore.js';

const DashboardLayout = () => {
  const [activeComponent, setActiveComponent] = useState('allUsers');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {user} = useAuthStore();

  const handleComponentChange = (component) => {
    setActiveComponent(component);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Menu icon for mobile */}
      <div className="md:hidden flex items-center p-4 bg-gray-100 border-b border-gray-200">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Open menu"
          className="text-gray-600 hover:text-gray-900"
        >
          {/* Simple hamburger icon */}
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
            <rect y="5" width="24" height="2" rx="1" fill="currentColor"/>
            <rect y="11" width="24" height="2" rx="1" fill="currentColor"/>
            <rect y="17" width="24" height="2" rx="1" fill="currentColor"/>
          </svg>
        </button>
        <span className="ml-2 font-semibold text-lg">Dashboard</span>
      </div>
      {/* Sidebar */}
      <aside
        className={`
          bg-gray-100 p-4 border-r border-gray-200
          fixed inset-y-0 left-0 z-20 w-64
          transform transition-transform duration-200
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:static md:translate-x-0 md:w-1/5 md:block
        `}
        style={{ height: '100vh' }}
      >
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800">Welcome, {user?.username || 'Admin'}</h2>
        </div>
        <ul>
          <li className="mb-4">
            <button
              className={`text-gray-600 hover:text-gray-900 ${activeComponent === 'allUsers' ? 'font-bold' : ''}`}
              onClick={() => handleComponentChange('allUsers')}
            >
              All Users
            </button>
          </li>
          <li className="mb-4">
            <button
              className={`text-gray-600 hover:text-gray-900 ${activeComponent === 'allTransactions' ? 'font-bold' : ''}`}
              onClick={() => handleComponentChange('allTransactions')}
            >
              All Transactions
            </button>
          </li>
        </ul>
      </aside>
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Main content */}
      <main className="flex-1 md:w-4/5 md:ml-0 ml-0 mt-0 md:mt-0">
        {activeComponent === 'allUsers' && <AllUsers />}
        {activeComponent === 'allTransactions' && <AllTransactions />}
      </main>
    </div>
  );
};

export default DashboardLayout;