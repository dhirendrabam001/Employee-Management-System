import { useEffect } from "react";
import axios from "axios";
import { LEAVE_API_END_POINT } from "../utils/constantUrl";
import { useDispatch } from "react-redux";
import { setLeaveAllEmployee } from "../redux/leaveSlice";
const useGetEmployeeLeave = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllEmployeeLeave = async () => {
      try {
        const res = await axios.get(
          `${LEAVE_API_END_POINT}/getAllEmployeeLeave`,
          {
            withCredentials: true,
          },
        );
        if (res.data.success) {
          console.log("data starting", res.data);

          dispatch(setLeaveAllEmployee(res.data.leaves));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllEmployeeLeave();
  }, [dispatch]);
};

export default useGetEmployeeLeave;
