import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { PAYSLIPS_API_END_POINT } from "../utils/constantUrl";
import { setSignlePayslipData } from "../redux/payslipSlice";
const useGetPayslipById = (selectedPayslipId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!selectedPayslipId) return;
    const fetchGetPayslipById = async () => {
      const res = await axios.get(
        `${PAYSLIPS_API_END_POINT}/getPayslipById/${selectedPayslipId}`,
        {
          withCredentials: true,
        },
      );
      if (res.data.success) {
        dispatch(setSignlePayslipData(res.data.payslip));
      }
    };

    fetchGetPayslipById();
  }, [selectedPayslipId, dispatch]);
};

export default useGetPayslipById;
