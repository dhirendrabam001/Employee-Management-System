import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSignlePayslipData } from "../redux/payslipSlice";

const useGetEmployeeSinglePayslip = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!id) return;

    const fetchEmployeeSinglePayslip = async () => {
      try {
        const res = await axios.get(
          `${EMPLOYEE_API_END_POINT}/getSinglePayslipById/${id}`,
          {
            withCredentials: true,
          },
        );

        if (res.data.success) {
          dispatch(setSignlePayslipData(res.data.payslip));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchEmployeeSinglePayslip();
  }, [id, dispatch]);
};

export default useGetEmployeeSinglePayslip;
