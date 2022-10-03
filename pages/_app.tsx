import "../styles/globals.css";
import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import NextNProgress from "nextjs-progressbar";
import { UnauthorizedModal } from "components/auth";
import { AuthContext } from "context/authContext";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [openUnauthorizedModal, setOpenUnauthorizedModal] = useState(false);
  return (
    <>
      <NextNProgress color="#3B41E3" />
      <ToastContainer />
      <AuthContext.Provider
        value={{ openUnauthorizedModal, setOpenUnauthorizedModal }}
      >
        <Component {...pageProps} />
        <UnauthorizedModal />
      </AuthContext.Provider>
    </>
  );
}

export default MyApp;
