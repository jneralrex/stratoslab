

"use client";
import { useEffect, useState } from "react";
import {
  getMyTransactions,
  createTransaction,
  deleteTransaction,
} from "@/utils/axios/endPoints";
import useAuthStore from "@/utils/store/useAuthStore";

export default function StudentTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false); // 👈 controls form visibility
const { user } = useAuthStore();
  // Fetch student's transactions
  const loadTransactions = async () => {
    try {
      setLoading(true);
      const res = await getMyTransactions();
      setTransactions(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  // Handle new transaction
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !receipt) return alert("Please enter amount and upload receipt");

    try {
      const formData = new FormData();
      formData.append("amount", amount);
      formData.append("receipt", receipt);

      await createTransaction(formData);
      alert("Transaction submitted successfully");
      setAmount("");
      setReceipt(null);
      setShowForm(false); // 👈 hide form after submit
      loadTransactions();
    } catch (err) {
      alert("Failed to submit transaction");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this transaction?")) return;
    try {
      await deleteTransaction(id);
      loadTransactions();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">

  <h1 className="text-3xl font-bold">Welcome back, {user?.username} 👋</h1>
      <h1 className="text-2xl font-bold mb-6">💳 My Transactions</h1>

      {/* Button to toggle upload form */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {showForm ? "Cancel Upload" : "➕ New Transaction"}
      </button>

      {/* Conditionally Render Upload Transaction Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8"
        >
          <h2 className="text-lg font-semibold mb-4">Upload New Transaction</h2>
          <div className="mb-4">
            <label className="block mb-2">Amount</label>
            <input
              type="number"
              className="w-full border rounded p-2"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Receipt</label>
            <input
              type="file"
              onChange={(e) => setReceipt(e.target.files[0])}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Submit Transaction
          </button>
        </form>
      )}

      {/* Transactions Table */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">My Transaction History</h2>
        {loading ? (
          <p>Loading...</p>
        ) : transactions.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2 border">Course</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Receipt</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx._id} className="text-center">
                  <td className="p-2 border">{tx.course}</td>
                  <td className="p-2 border">${tx.amount}</td>
                  <td
                    className={`p-2 border font-semibold ${
                      tx.status === "confirmed"
                        ? "text-green-500"
                        : tx.status === "rejected"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {tx.status || "pending"} 
                  </td>
                  <td className="p-2 border">
                    {tx.receipt?.url ? (
                      <a
                        href={tx.receipt.url}
                        target="_blank"
                        className="text-blue-600 underline"
                      >
                        View
                      </a>
                    ) : (
                      "No receipt"
                    )}
                  </td>
                  <td className="p-2 border">
                    {tx.status === "pending" && (
                      <button
                        onClick={() => handleDelete(tx._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No transactions found</p>
        )}
      </div>
    </div>
  );
}
