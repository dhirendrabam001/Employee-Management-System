import { setPageLoading } from "../redux/loaderSlice";

export const MIN_PAGE_LOADER_MS = 500;

export const startPageLoad = (dispatch) => {
  dispatch(setPageLoading(true));
};

export const finishPageLoad = (dispatch, startTime) => {
  const elapsed = Date.now() - startTime;
  const remaining = Math.max(0, MIN_PAGE_LOADER_MS - elapsed);

  setTimeout(() => {
    dispatch(setPageLoading(false));
  }, remaining);
};
