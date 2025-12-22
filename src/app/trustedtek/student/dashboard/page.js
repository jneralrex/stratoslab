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
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuthStore();

  const [snackbar, setSnackbar] = useState({ message: "", type: "", visible: false });

  const showSnackbar = (message, type = "success") => {
    setSnackbar({ message, type, visible: true });
    setTimeout(() => setSnackbar({ message: "", type: "", visible: false }), 4000);
  };

  // Fetch student's transactions
  const loadTransactions = async () => {
    try {
      setLoading(true);
      const res = await getMyTransactions();
      setTransactions(res);
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to load transactions ❌", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  });

  // Handle new transaction
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !receipt) return showSnackbar("Please enter amount and upload receipt ❗", "error");

    try {
      const formData = new FormData();
      formData.append("amount", amount);
      formData.append("receipt", receipt);
      formData.append("studentId", user?.id);

      await createTransaction(formData);
      showSnackbar("Transaction submitted successfully", "success");
      setAmount("");
      setReceipt(null);
      setShowForm(false);
      loadTransactions();
    } catch (err) {
      showSnackbar("Failed to submit transaction ❌", "error");
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

  const handleToggleForm = () => {
    if (showForm) {
      setAmount("");
      setReceipt(null);
    }
    setShowForm(!showForm);
  };


  return (
    <div className="p-4 sm:p-6 lg:p-10 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">

      {snackbar.visible && (
        <div
          className={`fixed top-5 right-5 px-4 py-3 rounded-lg shadow-lg text-white font-medium transition-all duration-500 ${snackbar.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
        >
          {snackbar.message}
        </div>
      )}

      {/* Welcome Section */}
      <section className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Hey <span className="text-blue-600">{user?.username}</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage your payments & transaction history here.
        </p>
      </section>

      {/* Toggle Upload Form */}
      <section className="flex justify-end mb-4">
        <button
          onClick={handleToggleForm}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow transition-all duration-200"
        >
          {showForm ? "Cancel" : "➕ New Transaction"}
        </button>

      </section>

      {/* Upload Transaction Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mb-8 space-y-4"
        >
          <h2 className="text-lg font-semibold border-b pb-2">Upload New Transaction</h2>

          <div>
            <label className="block mb-1 text-sm font-medium">Amount</label>
            <input
              type="number"
              className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <section className="mb-4">
            <label className="block mb-2 font-medium">Receipt</label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="receipt"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border-gray-300 dark:border-gray-500 transition"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5.001 5.001 0 0115.9 6H17a5 5 0 010 10h-1M12 12v9m0 0l-3-3m3 3l3-3"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, PDF (max. 5MB)</p>
                </div>
                <input
                  id="receipt"
                  type="file"
                  className="hidden"
                  onChange={(e) => setReceipt(e.target.files[0])}
                  required
                />
              </label>
            </div>
            {receipt && (
              <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                Selected: {receipt.name}
              </p>
            )}
          </section>


          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-all duration-200"
          >
            Submit Transaction
          </button>
        </form>
      )}

      {/* Transactions Table */}
      <section className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">📜 Transaction History</h2>

        {loading ? (
          <p className="text-center py-6">Loading transactions...</p>
        ) : transactions.length > 0 ? (
          <table className="w-full text-sm sm:text-base border-collapse">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-left">
                <th className="p-3 border">Course</th>
                <th className="p-3 border">Amount</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Receipt</th>
                <th className="p-3 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr
                  key={tx._id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="p-3 border">{tx.course || "—"}</td>
                  <td className="p-3 border font-medium">${tx.amount}</td>
                  <td
                    className={`p-3 border font-semibold capitalize ${tx.status === "confirmed"
                      ? "text-green-600"
                      : tx.status === "rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                      }`}
                  >
                    {tx.status || "pending"}
                  </td>
                  <td className="p-3 border">
                    {tx.receipt?.url ? (
                      <a
                        href={tx.receipt.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </a>
                    ) : (
                      "No receipt"
                    )}
                  </td>
                  <td className="p-3 border text-center">
                    {tx.status === "pending" && (
                      <button
                        onClick={() => handleDelete(tx._id)}
                        className="text-red-600 hover:text-red-800 font-medium"
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
          <p className="text-center py-6 text-gray-500">No transactions found</p>
        )}
      </section>
    </div>
  );
}
