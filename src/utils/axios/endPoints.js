import useAuthStore from "../store/useAuthStore";
import api from "./axiosInstance";


// Pass credentials to backend
export async function logUserIn({ email, password }) {
  try {
    const { data } = await api.post("auth/signin", { email, password });

    console.log(data)

    // save tokens + user in store
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

export async function getAffiliateEarnings() {
  try {
    const { data } = await api.get("affiliate/earnings");
    return data;
  } catch (err) {
    console.error("Failed to fetch earnings:", err.response?.data || err.message);
    throw err;
  }
}
export async function getAffiliateRefferals() {
  try {
    const { data } = await api.get("affiliate/referrals");
    return data;
  } catch (err) {
    console.error("Failed to fetch earnings:", err.response?.data || err.message);
    throw err;
  }
}


