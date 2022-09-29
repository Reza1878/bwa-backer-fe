import { Button, Container, Typography } from "components/common";
import HeaderBackground from "components/HeaderBackground";
import { GuestLayout } from "components/layouts";
import { ClientSection, ProjectSection, StepSection } from "components/section";
import heroImage from "../public/image/hero-image@2x.png";

import type { NextPage } from "next";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <GuestLayout
      title="Backer"
      headerBackground={<HeaderBackground part="header" />}
    >
      <div className="lg:pb-20">
        <Container className="flex flex-wrap justify-between lg:pt-6">
          <div className="lg:w-1/2 w-full">
            <Typography className="mb-8 lg:pt-20 text-white" variant="h3">
              We helps <u className="decoration-secondary">startup</u> to
              getting <br className="hidden md:block" /> started &{" "}
              <u className="decoration-secondary">funding</u> their{" "}
              <br className="hidden lg:block" /> truly needs
            </Typography>
            <Typography variant="h5" className="font-light mb-8 text-white">
              Fund the best idea to become <br />a real product and be the
              contributor
            </Typography>
            <Button
              rounded
              size="md"
              onClick={() => {
                location.href = "#project-section";
              }}
            >
              Find a Project
            </Button>
          </div>
          <div className="relative lg:w-1/2 w-full">
            <Image src={heroImage} alt="Hero image" placeholder="blur" />
          </div>
        </Container>
      </div>
      <StepSection />
      <ProjectSection />
      <ClientSection />
    </GuestLayout>
  );
};

export default Home;
