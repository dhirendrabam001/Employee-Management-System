import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { EMPLOYEE_API_END_POINT } from "../utils/constantUrl";
import { setSingleEmployeeData } from "../redux/employeeSlice";

const useGetEmployeeById = (selectedEmployeeId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!selectedEmployeeId) return;

    const fetchEmployeeByid = async () => {
      try {
        const res = await axios.get(
          `${EMPLOYEE_API_END_POINT}/getEmployeeID/${selectedEmployeeId}`,
          {
            withCredentials: true,
          },
        );

        if (res.data.success) {
          dispatch(setSingleEmployeeData(res.data.employee));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchEmployeeByid();
  }, [selectedEmployeeId]);
};

export default useGetEmployeeById;
