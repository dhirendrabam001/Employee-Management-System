import axios from "axios";
import { useEffect } from "react";
import { ATTENDANCE_API_END_POINT } from "../utils/constantUrl";
import { useDispatch } from "react-redux";
import { setAttendance } from "../redux/attendanceSlice";

const useGetAllAttendance = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchGetAllAttendance = async () => {
      try {
        const res = await axios.get(
          `${ATTENDANCE_API_END_POINT}/getAllAttendance`,
          {
            withCredentials: true,
          },
        );

        if (res.data.success) {
          dispatch(setAttendance(res.data.attendance));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchGetAllAttendance();
  }, [dispatch]);
};

export default useGetAllAttendance;
