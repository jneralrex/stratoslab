import useAuthStore from "../store/useAuthStore";
import api from "./axiosInstance";

// Register Affiliate
export async function regAffiliate({ fullName, username, email, phoneNumber, countryOfResidence, password }) {
  try {
    const { data } = await api.post("auth/signup", {
      fullName,
      username,
      email,
      phoneNumber,
      countryOfResidence,
      course: "nil",
      role: "affiliate",
      password,
    });

    console.log("Registered affiliate:", data);

    // Save email in store for OTP verification
    useAuthStore.getState().setEmail(email);

    return data.user;
  } catch (err) {
    console.error("Registration failed:", err.response?.data || err.message);
    throw err;
  }
}


// Register Admin
export async function regAdmin({ fullName, username, email, phoneNumber, countryOfResidence, password }) {
  try {
    const { data } = await api.post("auth/signup", {
      fullName,
      username,
      email,
      phoneNumber,
      countryOfResidence,
      course: "nil",
      role: "admin",
      password,
    });

    console.log("Registered affiliate:", data);

    // Save email in store for OTP verification
    useAuthStore.getState().setEmail(email);

    return data.user;
  } catch (err) {
    console.error("Registration failed:", err.response?.data || err.message);
    throw err;
  }
}

//Reg by Admin
export async function regByAdmin({ fullName, username, email, phoneNumber, role, countryOfResidence, password }) {
  try {
    const { data } = await api.post("auth/signup", {
      fullName,
      username,
      email,
      phoneNumber,
      countryOfResidence,
      course: "nil",
      role,
      password,
    });

    console.log("Registered affiliate:", data);

    return data.user;
  } catch (err) {
    console.error("Registration failed:", err.response?.data || err.message);
    throw err;
  }
}

// Register Student
export async function regStudent({ fullName, username, email, phoneNumber, countryOfResidence, course, ref, password }) {
  try {
    const { data } = await api.post("auth/signup", {
      fullName,
      phoneNumber,
      countryOfResidence,
      username,
      email,
      password,
      role: "student",
      course,
      ref,
    });

    console.log("Registered student:", data);

    // Save email in store for OTP verification
    useAuthStore.getState().setEmail(email);
    return data.user;
  } catch (err) {
    console.error("Registration failed:", err.response?.data || err.message);
    throw err;
  }
};

// ✅ Verify OTP
export async function verifyOtp({ otp }) {
  try {
    const email = useAuthStore.getState().email;

    if (!email) throw new Error("No email found, Register first.");

    const { data } = await api.post("auth/verify-otp", { email, otp });

    console.log("OTP verified:", data);

    return data;
  } catch (err) {
    console.error("OTP verification failed:", err.response?.data || err.message);
    throw err;
  }
}

// resend OTP
export async function resendOtp() {
  try {
    const email = useAuthStore.getState().email;

    if (!email) throw new Error("No email found, Register first.");

    const { data } = await api.post("auth/resend-otp", { email });

    console.log("OTP verified:", data);

    return data;
  } catch (err) {
    console.error("OTP verification failed:", err.response?.data || err.message);
    throw err;
  }
}

//  Login User
// export async function logUserIn({ email, password }) {
//   try {
//     const { data } = await api.post("auth/signin", { email, password });

//     console.log(data);

//     useAuthStore.getState().setTokens({
//       accessToken: data.accessToken,
//       refreshToken: data.refreshToken,
//     });
//     useAuthStore.getState().setUser(data.user);

//     return data.user;
//   } catch (err) {
//     console.error("Login failed:", err.response?.data || err.message);
//     throw err;
//   }
// }

export async function logUserIn({ email, password }) {
  try {
    const { data } = await api.post("auth/signin", { email, password });

    useAuthStore.getState().setTokens({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
    useAuthStore.getState().setUser(data.user);

    return data.user;
  } catch (err) {
    console.error("Login failed:", err.response?.data || err.message);
    throw err;
  }
}

export async function logStudent({ email, password }) {
  try {
    const { data } = await api.post("auth/signin", { email, password });

    if (data.user.role !== "student") {
      alert("Student only");
      return null; 
    }

    useAuthStore.getState().setTokens({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });

    useAuthStore.getState().setUser(data.user);

    return data.user; 
  } catch (err) {
    console.error("Login failed:", err.response?.data || err.message);
    throw err;
  }
}


//  Get Earnings
export async function getAffiliateEarnings() {
  try {
    const { data } = await api.get("affiliate/earnings");
    return data;
  } catch (err) {
    console.error("Failed to fetch earnings:", err.response?.data || err.message);
    throw err;
  }
}

//  Get Referrals
export async function getAffiliateRefferals() {
  try {
    const { data } = await api.get("affiliate/referrals");
    return data;
  } catch (err) {
    console.error("Failed to fetch referrals:", err.response?.data || err.message);
    throw err;
  }
}



// Transaction Endpoints for admins

export async function getAllTransactions() {
  try {
    const { data } = await api.get("transactions");
    return data.transactions;
  } catch (err) {
    console.error("Failed to fetch transactions:", err.response?.data || err.message);
    throw err;
  }
}

export async function getTransactionsByStatus(status) {
  try {
    const { data } = await api.get(`transactions/status/${status}`);
    return data.transactions;
  } catch (err) {
    console.error("Failed to fetch transactions by status:", err.response?.data || err.message);
    throw err;
  }
}

export async function confirmTransaction(transactionId) {
  try {
    const { data } = await api.post(`transactions/${transactionId}/confirm`);
    return data;
  } catch (err) {
    console.error("Failed to confirm transaction:", err.response?.data || err.message);
    throw err;
  }
}

export async function rejectTransaction(transactionId) {
  try {
    const { data } = await api.post(`transactions/${transactionId}/reject`);
    return data;
  } catch (err) {
    console.error("Failed to reject transaction:", err.response?.data || err.message);
    throw err;
  }
}

export async function deleteTransaction(transactionId) {
  try {
    const { data } = await api.delete(`transactions/${transactionId}`);
    return data;
  } catch (err) {
    console.error("Failed to delete transaction:", err.response?.data || err.message);
    throw err;
  }
}


// Get All Users - Admin
// ✅ Admin: Get All Users
export async function getAllUsers(page = 1, limit = 10) {
  try {
    const { data } = await api.get(`user/getAllUsers?page=${page}&limit=${limit}`);
    console.log(data)
    return data; // contains users, totalUsers, totalPages, currentPage
  } catch (err) {
    console.error("Failed to fetch users:", err.response?.data || err.message);
    throw err;
  }
}



// ================= STUDENT TRANSACTION ENDPOINTS =================

// Create Transaction (upload receipt)
export async function createTransaction(formData) {
  try {
    const { data } = await api.post("/transactions", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (err) {
    console.error("Failed to create transaction:", err.response?.data || err.message);
    throw err;
  }
}

// Get all transactions for logged-in student
export async function getMyTransactions() {
  try {
    const { data } = await api.get("/transactions/user/me");
    return data.transactions;
  } catch (err) {
    console.error("Failed to fetch my transactions:", err.response?.data || err.message);
    throw err;
  }
}

// Update a transaction
export async function updateTransaction(transactionId, payload) {
  try {
    const { data } = await api.put(`/transactions/${transactionId}`, payload);
    return data;
  } catch (err) {
    console.error("Failed to update transaction:", err.response?.data || err.message);
    throw err;
  }
}

// Delete a transaction
// export async function deleteTransaction(transactionId) {
//   try {
//     const { data } = await api.delete(`/transactions/${transactionId}`);
//     return data;
//   } catch (err) {
//     console.error("Failed to delete transaction:", err.response?.data || err.message);
//     throw err;
//   }
// }



