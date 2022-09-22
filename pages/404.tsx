import { Button, Img, Typography } from "components/common";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

function FourOhFour() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Page Not Found</title>
      </Head>
      <div className="container flex flex-col items-center justify-center h-screen p-4 mx-auto">
        <div>
          <Img src="/image/404.svg" />
          <Typography className="my-4 font-medium" variant="h1">
            Oops! terjadi kesalahan
          </Typography>
          <Typography className="text-center mb-4">
            The page that you requested doesn&apos;t
            <br />
            exist at the moment
          </Typography>

          <Button
            onClick={() => {
              router.push("/");
            }}
            rounded
            style={{ width: "100%" }}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </>
  );
}

export default FourOhFour;
