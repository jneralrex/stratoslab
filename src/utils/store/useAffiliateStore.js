// store/affiliateStore.ts
import { create } from "zustand";
import { getAffiliateEarnings, getAffiliateRefferals } from "../axios/endPoints";

const useAffiliateStore = create((set) => ({
  earnings: null,
  referrals: null,
  loading: false,
  error: null,

  fetchEarnings: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getAffiliateEarnings();
      console.log("Fetched affiliate earnings:", data);
      set({ earnings: data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch earnings", loading: false });
    }
  },

  fetchReferrals: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getAffiliateRefferals();
      console.log("Fetched affiliate referrals:", data);
      set({ referrals: data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch referrals", loading: false });
    }
  },
}));

export default useAffiliateStore;
