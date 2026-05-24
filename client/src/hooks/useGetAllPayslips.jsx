import { useDispatch } from "react-redux";
import { setPayslip } from "../redux/payslipSlice";
import axios from "axios";
import { PAYSLIPS_API_END_POINT } from "../utils/constantUrl";
import { useEffect } from "react";

const useGetAllPayslip = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllPayslipsList = async () => {
      try {
        const res = await axios.get(
          `${PAYSLIPS_API_END_POINT}/getAllPayslipsList`,
          { withCredentials: true },
        );
        console.log("data", res.data);

        if (res.data.success) {
          dispatch(setPayslip(res.data.payslip));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllPayslipsList();
  }, [dispatch]);
};

export default useGetAllPayslip;
