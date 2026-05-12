import { useEffect } from "react";
import { showPromise } from "../utils/toast";
import axios from "axios";
import { EMPLOYEE_API_END_POINT } from "../utils/constantUrl";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const useGetEmployee = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllEmployee = async () => {
      try {
        const promise = axios.get(
          `${EMPLOYEE_API_END_POINT}/addEmployee`,
          {},
          {
            withCredentials: true,
          },
        );

        toast.promise(promise, {
          pending: "Fetching data...",
          success: "Employee data fetched successfully",
          error: {
            render({ data }) {
              return data?.response?.data?.message || "Something is wrong!";
            },
          },
        });

        const res = await promise;
        console.log("data", res);

        if (res.data.success) {
          dispatch();
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllEmployee();
  }, [dispatch]);
};

export default useGetEmployee;
