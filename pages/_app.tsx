import "../styles/globals.css";
import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import NextNProgress from "nextjs-progressbar";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress color="#3B41E3" />
      <ToastContainer />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
