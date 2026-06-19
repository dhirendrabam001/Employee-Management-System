import axios from "axios";
import { ATTENDANCE_API_END_POINT } from "./constantUrl";
import { setAttendance } from "../redux/attendanceSlice";

export const refreshAttendanceList = async (dispatch) => {
  const res = await axios.get(`${ATTENDANCE_API_END_POINT}/getAllAttendance`, {
    withCredentials: true,
  });

  if (res.data.success) {
    dispatch(setAttendance(res.data.attendance));
  }

  return res.data.attendance || [];
};

export const formatClockTime = (value) => {
  if (!value) return "—";
  return new Date(value).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatWorkingHrs = (hours) => {
  if (!hours || hours <= 0) return "—";
  const totalMinutes = Math.round(hours * 60);
  const hrs = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  if (hrs === 0) return `${mins}m`;
  return `${hrs}h ${mins}m`;
};

export const formatElapsed = (ms) => {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const secs = String(totalSeconds % 60).padStart(2, "0");
  return `${hrs}:${mins}:${secs}`;
};

export const getActiveAttendance = (attendanceList = []) =>
  attendanceList.find((item) => item.isClockedIn === true) || null;

export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
};
