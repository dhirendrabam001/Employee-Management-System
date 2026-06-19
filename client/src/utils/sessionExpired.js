import axios from "axios";
import store from "../redux/store";
import { setUser } from "../redux/authSlice";
import { USER_API_END_POINT } from "./constantUrl";
import { showError } from "./toast";

let isHandling = false;

/**
 * Call when token is expired or invalid.
 * Clears user, removes cookie, shows message, goes to home page.
 */
export async function handleSessionExpired(message) {
  if (isHandling) return;
  isHandling = true;

  store.dispatch(setUser(null));
  showError(message || "Session expired. Please login again.");

  try {
    await axios.get(`${USER_API_END_POINT}/logout`, {
      withCredentials: true,
    });
  } catch {
    // ignore — we still redirect to home
  }

  window.location.href = "/";
}
