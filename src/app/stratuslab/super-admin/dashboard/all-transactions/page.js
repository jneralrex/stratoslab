"use client";

import { useEffect, useState } from "react";
import {
  confirmTransaction,
  deleteTransaction,
  getAllTransactions,
  rejectTransaction,
} from "@/utils/axios/endPoints";

export default function AllTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [preview, setPreview] = useState(null);

  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    loadTransactions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [transactions, statusFilter, search, dateFrom, dateTo]);

  async function loadTransactions() {
    try {
      setLoading(true);
      const data = await getAllTransactions();
      setTransactions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function applyFilters() {
    let data = [...transactions];

    if (statusFilter !== "all") {
      data = data.filter((tx) => tx.status === statusFilter);
    }

    if (search) {
      data = data.filter(
        (tx) =>
          tx.student?.username.toLowerCase().includes(search.toLowerCase()) ||
          tx.student?.email?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (dateFrom) {
      data = data.filter(
        (tx) => new Date(tx.createdAt) >= new Date(dateFrom)
      );
    }

    if (dateTo) {
      data = data.filter(
        (tx) => new Date(tx.createdAt) <= new Date(dateTo)
      );
    }

    setFiltered(data);
    setCurrentPage(1);
  }

  async function handleConfirm(id) {
    await confirmTransaction(id);
    loadTransactions();
  }

  async function handleReject(id) {
    await rejectTransaction(id);
    loadTransactions();
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      await deleteTransaction(id);
      loadTransactions();
    }
  }

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Stats
  const stats = {
    total: transactions.length,
    pending: transactions.filter((t) => t.status === "pending").length,
    confirmed: transactions.filter((t) => t.status === "confirmed").length,
    rejected: transactions.filter((t) => t.status === "rejected").length,
  };

  return (
    <div className="p-4 md:p-6 bg-amber-50 min-h-screen overflow-x-hidden">
      <h1 className="text-2xl font-bold mb-6">Super Admin - Transactions</h1>

      {/* 📊 Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white shadow rounded text-center">
          <p className="text-gray-500">Total</p>
          <p className="text-xl font-bold">{stats.total}</p>
        </div>
        <div className="p-4 bg-yellow-100 shadow rounded text-center">
          <p className="text-gray-600">Pending</p>
          <p className="text-xl font-bold">{stats.pending}</p>
        </div>
        <div className="p-4 bg-green-100 shadow rounded text-center">
          <p className="text-gray-600">Confirmed</p>
          <p className="text-xl font-bold">{stats.confirmed}</p>
        </div>
        <div className="p-4 bg-red-100 shadow rounded text-center">
          <p className="text-gray-600">Rejected</p>
          <p className="text-xl font-bold">{stats.rejected}</p>
        </div>
      </div>

      {/* 🔍 Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="rejected">Rejected</option>
        </select>

        <input
          type="text"
          placeholder="Search by username or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded flex-1"
        />

        <div className="flex gap-2 flex-wrap">
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
      </div>

      {/* 📑 Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Student</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Receipt</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((tx) => (
                <tr key={tx._id}>
                  <td className="border p-2">
                    {tx.student?.username} <br />
                    <span className="text-xs text-gray-500">
                      {tx.student?.email}
                    </span>
                  </td>
                  <td className="border p-2">${tx.amount}</td>
                  <td className="border p-2 capitalize">{tx.status}</td>
                  <td className="border p-2">
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border p-2">
                    {tx.receipt?.url ? (
                      <button
                        onClick={() => setPreview(tx.receipt.url)}
                        className="text-blue-600 underline"
                      >
                        Preview
                      </button>
                    ) : (
                      "No Receipt"
                    )}
                  </td>
                  <td className="border p-2 flex flex-wrap gap-2">
                    {tx.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleConfirm(tx._id)}
                          className="px-2 py-1 bg-green-500 text-white rounded"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => handleReject(tx._id)}
                          className="px-2 py-1 bg-yellow-500 text-white rounded"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDelete(tx._id)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 📑 Pagination */}
      <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? "bg-gray-300" : "bg-white"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* 🖼️ Receipt Preview Modal */}
      {preview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-4 rounded shadow-lg relative max-w-md w-full">
            <button
              onClick={() => setPreview(null)}
              className="absolute top-2 right-2 text-gray-600"
            >
              ✖
            </button>
            <img src={preview} alt="Receipt" className="max-w-full h-auto" />
          </div>
        </div>
      )}
    </div>
  );
}
