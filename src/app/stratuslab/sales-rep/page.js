'use client';

import { getTransactionsByStatus, confirmTransaction, rejectTransaction } from "@/utils/axios/endPoints";
import React, { useEffect, useState } from "react";

const SalesRepDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [loading, setLoading] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null); // for details modal
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState(null); // for receipt preview

  useEffect(() => {
    fetchTransactions(statusFilter);
  }, [statusFilter]);

  const fetchTransactions = async (status) => {
    setLoading(true);
    try {
      const data = await getTransactionsByStatus(status);
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (transactionId) => {
    try {
      await confirmTransaction(transactionId);
      fetchTransactions(statusFilter); // refresh list
    } catch (error) {
      console.error("Error confirming transaction:", error);
    }
  };

  const handleReject = async (transactionId) => {
    try {
      await rejectTransaction(transactionId);
      fetchTransactions(statusFilter); // refresh list
    } catch (error) {
      console.error("Error rejecting transaction:", error);
    }
  };

  const openModal = (tx) => {
    setSelectedTx(tx);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedTx(null);
    setShowModal(false);
  };

  return (
    <div className="p-6 bg-amber-50 min-h-screen">
      <h2 className="text-xl font-bold mb-4">SalesRep Transactions</h2>

      {/* Status Filter */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded px-3 py-1"
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Transactions Table */}
      {loading ? (
        <p>Loading transactions...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Student</th>
              <th className="p-2 border">Course</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Receipt</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((tx) => (
                <tr
                  key={tx._id}
                  className="text-center border hover:bg-gray-100 cursor-pointer"
                  onClick={() => openModal(tx)}
                >
                  <td className="border p-2">
                    {tx.student?.username} <br />
                    <span className="text-xs text-gray-500">
                      {tx.student?.email}
                    </span>
                  </td>
                  <td className="p-2 border">{tx.course}</td>
                  <td className="p-2 border">{tx.amount}</td>
                  <td className="p-2 border">
                    {tx.receipt?.url ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // prevent row click modal
                          setPreview(tx.receipt.url);
                        }}
                        className="text-blue-600 underline"
                      >
                        Preview
                      </button>
                    ) : (
                      "No Receipt"
                    )}
                  </td>
                  <td className="p-2 border">{tx.status}</td>
                  <td className="p-2 border">
                    {tx.status === "pending" && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleConfirm(tx._id);
                          }}
                          className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReject(tx._id);
                          }}
                          className="bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-2 border text-center" colSpan="6">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Transaction Details Modal */}
      {showModal && selectedTx && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ✖
            </button>

            <h3 className="text-lg font-bold mb-4">Transaction Details</h3>

            <div className="space-y-2 text-sm">
              <p><strong>Student:</strong> {selectedTx.student?.fullName}</p>
              <p><strong>Email:</strong> {selectedTx.student?.email}</p>
              <p><strong>Phone:</strong> {selectedTx.student?.phoneNumber}</p>
              <p><strong>Course:</strong> {selectedTx.course}</p>
              <p><strong>Amount:</strong> {selectedTx.amount}</p>
              <p><strong>Status:</strong> {selectedTx.status}</p>
              <p><strong>Created:</strong> {new Date(selectedTx.createdAt).toLocaleString()}</p>
              <p><strong>Updated:</strong> {new Date(selectedTx.updatedAt).toLocaleString()}</p>

              {selectedTx.receipt?.url && (
                <div className="mt-3">
                  <p className="font-medium">Receipt:</p>
                  <img
                    src={selectedTx.receipt.url}
                    alt="Receipt"
                    className="w-full h-40 object-cover rounded cursor-pointer"
                    onClick={() => setPreview(selectedTx.receipt.url)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 🖼️ Receipt Preview Modal */}
      {preview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-4 rounded shadow-lg relative max-w-md w-full">
            <button
              onClick={() => setPreview(null)}
              className="absolute top-2 right-2 text-gray-600"
            >
              ✖
            </button>
            <img src={preview} alt="Receipt" className="max-w-full h-auto rounded" />
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesRepDashboard;
