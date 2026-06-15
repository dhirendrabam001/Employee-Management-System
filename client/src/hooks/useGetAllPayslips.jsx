import { useDispatch } from "react-redux";
import { setPayslip } from "../redux/payslipSlice";
import axios from "axios";
import { PAYSLIPS_API_END_POINT } from "../utils/constantUrl";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { finishPageLoad, startPageLoad } from "../utils/pageLoader";

const useGetAllPayslip = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    let cancelled = false;
    const startTime = Date.now();
    startPageLoad(dispatch);

    const fetchAllPayslipsList = async () => {
      try {
        const res = await axios.get(
          `${PAYSLIPS_API_END_POINT}/getAllPayslipsList`,
          { withCredentials: true },
        );

        if (!cancelled && res.data.success) {
          dispatch(setPayslip(res.data.payslip));
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) {
          finishPageLoad(dispatch, startTime);
        }
      }
    };

    fetchAllPayslipsList();

    return () => {
      cancelled = true;
    };
  }, [dispatch, pathname]);
};

export default useGetAllPayslip;
