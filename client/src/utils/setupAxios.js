import axios from "axios";
import { handleSessionExpired } from "./sessionExpired";

/**
 * If any API returns 401 (token expired), send user to home page.
 * Runs once when app starts (see main.jsx).
 */
export function setupAxios() {
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error.response?.status;
      const url = error.config?.url || "";

      // Skip /me (handled in App.jsx) and /logout (avoid loop)
      const skip =
        url.includes("/me") ||
        url.includes("/logout") ||
        url.includes("/login") ||
        url.includes("/register");

      if (status === 401 && !skip) {
        await handleSessionExpired(
          error.response?.data?.message || "Session expired. Please login again.",
        );
      }

      return Promise.reject(error);
    },
  );
}
