import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { finishPageLoad } from "../utils/pageLoader";

const useEndPageLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const startTime = Date.now();
    finishPageLoad(dispatch, startTime);
  }, [dispatch]);
};

export default useEndPageLoader;
