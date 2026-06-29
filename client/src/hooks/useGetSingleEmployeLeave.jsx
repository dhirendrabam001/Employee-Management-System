import axios from "axios";
import { useEffect } from "react";
import { LEAVE_API_END_POINT } from "../utils/constantUrl";
import { useDispatch } from "react-redux";
import { setLeave } from "../redux/leaveSlice";

const useGetSingleEmployeLeave = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleEmployeeLeave = async () => {
      try {
        const res = await axios.get(`${LEAVE_API_END_POINT}/getMyLeave`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setLeave(res.data.leave));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSingleEmployeeLeave();
  }, []);
};

export default useGetSingleEmployeLeave;
