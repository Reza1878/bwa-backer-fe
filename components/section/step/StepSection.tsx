import clsx from "clsx";
import { Container, Img, Typography } from "components/common";
import React from "react";
import StepItem from "./StepItem";

function StepSection() {
  const stepImages = [
    {
      id: 1,
      src: "/image/step-1-illustration.svg",
      description: (
        <>
          Sign Up account and start <br /> funding project{" "}
        </>
      ),
      title: "Sign Up",
    },
    {
      id: 2,
      src: "/image/step-2-illustration.svg",
      description: (
        <>
          Choose some project idea, <br />
          and start funding
        </>
      ),
      title: "Open Project",
    },
    {
      id: 3,
      src: "/image/step-3-illustration.svg",
      description: (
        <>
          Time to makes dream <br />
          comes true
        </>
      ),
      title: "Execute",
    },
  ];
  return (
    <Container
      id="step-section"
      className="container px-6 xl:px-24 mx-auto py-4"
    >
      <Typography variant="h4">
        Only 3 steps to execute your bright ideas
      </Typography>
      <div className="flex items-center flex-col">
        <Img containerClassNames="lg:block hidden" src="/image/line-step.svg" />
        <div className="w-full flex justify-evenly flex-wrap">
          {stepImages.map((item, index) => (
            <StepItem
              key={item.id}
              title={item.title}
              description={item.description}
              src={item.src}
              position={index}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}

export default StepSection;
