import useAuthStore from "../store/useAuthStore";
import api from "./axiosInstance";

// ✅ Register Affiliate
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
export async function logUserIn({ email, password }) {
  try {
    const { data } = await api.post("auth/signin", { email, password });

    console.log(data);

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
