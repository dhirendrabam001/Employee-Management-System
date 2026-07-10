import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { PAYSLIPS_API_END_POINT } from "../utils/constantUrl";
import { setemployeeParticularPayslip } from "../redux/payslipSlice";
const useGetParticularEmployeePayslip = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchParticularEmployeePayslip = async () => {
      try {
        const res = await axios.get(`${PAYSLIPS_API_END_POINT}/getMyPayslip`, {
          withCredentials: true,
        });
        if (res.data.success) {
          console.log("data", res.data);

          dispatch(setemployeeParticularPayslip(res.data.payslip));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchParticularEmployeePayslip();
  }, [dispatch]);
};

export default useGetParticularEmployeePayslip;
