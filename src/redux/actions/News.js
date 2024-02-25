import { setNews, getNewsDetail } from "../slices/newsSlice";

export const getNewsData = () => {
  return async (dispatch) => {

    const newsDetail = [];
    dispatch(setNews(newsDetail));
  };
};
