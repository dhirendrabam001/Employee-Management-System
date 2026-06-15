import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { PAYSLIPS_API_END_POINT } from "../utils/constantUrl";
import { setSignlePayslipData } from "../redux/payslipSlice";
import { finishPageLoad, startPageLoad } from "../utils/pageLoader";

const useGetPayslipById = (selectedPayslipId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedPayslipId) return;

    let cancelled = false;
    const startTime = Date.now();
    startPageLoad(dispatch);

    const fetchGetPayslipById = async () => {
      try {
        const res = await axios.get(
          `${PAYSLIPS_API_END_POINT}/getPayslipById/${selectedPayslipId}`,
          {
            withCredentials: true,
          },
        );

        if (!cancelled && res.data.success) {
          dispatch(setSignlePayslipData(res.data.payslip));
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) {
          finishPageLoad(dispatch, startTime);
        }
      }
    };

    fetchGetPayslipById();

    return () => {
      cancelled = true;
    };
  }, [selectedPayslipId, dispatch]);
};

export default useGetPayslipById;
