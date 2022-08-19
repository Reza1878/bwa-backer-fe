import { Button, Container, Img, Typhograpy } from "components/atoms";
import GuestNavbar from "components/molecules/navbar/GuestNavbar";
import React from "react";
function GuestHeader() {
  return (
    <header className="relative my-6">
      <GuestNavbar />
      <Container className="flex flex-wrap justify-between pt-6">
        <div className="lg:w-1/2 w-full">
          <Typhograpy className="mb-8 lg:pt-20 text-white" variant="h3">
            We helps <u className="decoration-secondary">startup</u> to getting{" "}
            <br className="hidden md:block" /> started &{" "}
            <u className="decoration-secondary">funding</u> their{" "}
            <br className="hidden lg:block" /> truly needs
          </Typhograpy>
          <Typhograpy variant="h5" className="font-light mb-8 text-white">
            Fund the best idea to become <br />a real product and be the
            contributor
          </Typhograpy>
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
