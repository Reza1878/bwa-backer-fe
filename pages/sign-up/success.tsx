import { Button, Container, Img, Typography } from "components/common";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

function Success() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };
  return (
    <>
      <Head>
        <title>Backer - Register Success</title>
      </Head>
      <Container className="flex justify-center">
        <div className="w-full lg:w-1/3 flex flex-col justify-center pt-10">
          <Img
            src="/image/success-register-illustration.svg"
            className="w-full"
          />
          <Typography className="mt-4 text-center" variant="h3">
            Welcome on board!
          </Typography>
          <Typography className="mt-4 text-center font-light">
            Your account just registered <br /> into our system
          </Typography>

          <Button rounded size="md" className="mt-4" onClick={handleClick}>
            Start Explore
          </Button>
        </div>
      </Container>
    </>
  );
}

export default Success;
