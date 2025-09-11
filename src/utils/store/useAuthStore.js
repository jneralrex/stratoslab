// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// const useAuthStore = create(
//   persist(
//     (set) => ({
//       accessToken: null,
//       message: null,
//       email:null,
//       user: null,

//       // Actions
//       setTokens: ({ accessToken, }) => set({ accessToken, }),

//       setUser: (user) => set({ user }),
//       setEmail: (email) => set({ email }),
//       setMessage: (message) => set({ message }),
//       logout: () =>
//         set({
//           accessToken: null,
//           refreshToken: null,
//           user: null,
//         }),
//     }),
//     {
//       name: "auth-storage", // key in localStorage
//       getStorage: () => localStorage, // defaults to localStorage
//     }
//   )
// );

// export default useAuthStore;


import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      message: null,
      email: null,

      // Actions
      setTokens: ({ accessToken, refreshToken }) =>
        set({ accessToken, refreshToken }),
      setUser: (user) => set({ user }),
      setEmail: (email) => set({ email }),
      setMessage: (message) => set({ message }),

      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
        }),
    }),
    {
      name: "auth-storage", // saves in localStorage
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;
