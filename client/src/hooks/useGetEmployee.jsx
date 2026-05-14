import { useEffect } from "react";
import axios from "axios";
import { EMPLOYEE_API_END_POINT } from "../utils/constantUrl";
import { useDispatch } from "react-redux";
import { setEmployee } from "../redux/employeeSlice";

const useGetEmployee = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllEmployee = async () => {
      try {
        const res = await axios.get(
          `${EMPLOYEE_API_END_POINT}/getEmployeeList`,
          {
            withCredentials: true,
          },
        );

        console.log("Employee Data:", res.data);

        if (res.data.success) {
          dispatch(setEmployee(res.data.employee));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllEmployee();
  }, [dispatch]);
};

export default useGetEmployee;
