import { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { EMPLOYEE_API_END_POINT } from "../utils/constantUrl";
import { useDispatch } from "react-redux";
import { setEmployee } from "../redux/employeeSlice";
import { finishPageLoad, startPageLoad } from "../utils/pageLoader";

const useGetEmployee = ({ showLoader = true } = {}) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    let cancelled = false;
    const startTime = Date.now();

    if (showLoader) {
      startPageLoad(dispatch);
    }

    const fetchAllEmployee = async () => {
      try {
        const res = await axios.get(
          `${EMPLOYEE_API_END_POINT}/getEmployeeList`,
          {
            withCredentials: true,
          },
        );

        if (!cancelled && res.data.success) {
          dispatch(setEmployee(res.data.employee));
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled && showLoader) {
          finishPageLoad(dispatch, startTime);
        }
      }
    };

    fetchAllEmployee();

    return () => {
      cancelled = true;
    };
  }, [dispatch, pathname, showLoader]);
};

export default useGetEmployee;
