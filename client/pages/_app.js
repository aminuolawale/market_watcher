import Layout from "../components/Layout";
import { wrapper } from "../utils/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "../utils/redux/actions/userActions";
import { SET_LOADED } from "../utils/redux/types";

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch();
  const loaded = useSelector((state) => state.userReducer.loaded);
  console.log(loaded);
  useEffect(() => {
    const authTokens = JSON.parse(localStorage.getItem("authTokens")) || null;
    if (!loaded && authTokens) {
      dispatch(refreshToken(authTokens));
    } else {
      console.log("Make me");
      dispatch({ type: SET_LOADED });
    }
    const interval = setInterval(() => {
      if (authTokens) {
        dispatch(refreshToken(authTokens));
      }
    }, 540000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      {loaded && (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </>
  );
}

export default wrapper.withRedux(MyApp);
