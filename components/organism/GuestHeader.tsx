import { Button, Container, Img } from "components/atoms";
import GuestNavbar from "components/molecules/navbar/GuestNavbar";
import React from "react";
function GuestHeader() {
  return (
    <header className="relative my-6">
      <GuestNavbar />
      <Container className="flex flex-wrap justify-between pt-6">
        <div className="lg:w-1/2 w-full">
          <h1 className="text-white text-2xl lg:text-4xl mb-8 lg:pt-20">
            We helps <u className="decoration-secondary">startup</u> to getting
            started
            <br />& <u className="decoration-secondary">funding</u> their truly
            <br className="block lg:hidden" /> needs
          </h1>
          <p className="text-white text-base lg:text-xl font-light mb-8">
            Fund the best idea to become <br />a real product and be the
            contributor
          </p>
          <Button rounded size="md">
            Find a Project
          </Button>
        </div>
        <Img
          containerClassNames="lg:w-1/2 w-full"
          src="/image/hero-image@2x.png"
        />
      </Container>
    </header>
  );
}

export default GuestHeader;
