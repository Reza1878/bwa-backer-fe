import { Button, Container, Img, Typography } from "components/common";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

function SuccessFundPage() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Success Fund</title>
      </Head>
      <Container className="flex flex-col justify-center items-center">
        <div className="max-w-lg">
          <Img src="/image/success-fund-illustration.svg" />
          <Typography className="my-4 font-medium" variant="h2">
            Selamat! Funding berhasil
          </Typography>
          <Typography className="text-center mb-4">
            Uang anda telah dikirim ke akun perusahaan
            <br />
            untuk diteruskan ke project leader
          </Typography>

          <Button
            onClick={() => {
              router.push("/");
            }}
            rounded
            style={{ width: "100%" }}
          >
            Fund other project
          </Button>
          <Button
            className="mt-4 border border-black text-black opacity-80"
            onClick={() => {
              router.push("/member/dashboard");
            }}
            variant="transparent"
            rounded
            style={{ width: "100%" }}
          >
            My Dashboard
          </Button>
        </div>
      </Container>
    </>
  );
}

export default SuccessFundPage;
