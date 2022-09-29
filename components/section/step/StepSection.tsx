import { Container, Typography } from "components/common";
import React from "react";
import Image from "next/image";

import StepItem from "./StepItem";
import stepLine from "../../../public/image/line-step.svg";
import step1 from "../../../public/image/step-1-illustration.svg";
import step2 from "../../../public/image/step-2-illustration.svg";
import step3 from "../../../public/image/step-3-illustration.svg";

function StepSection() {
  const stepImages = [
    {
      id: 1,
      src: step1,
      description: (
        <>
          Sign Up account and start <br /> funding project{" "}
        </>
      ),
      title: "Sign Up",
    },
    {
      id: 2,
      src: step2,
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
      src: step3,
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
        <div className="lg:block hidden">
          <Image src={stepLine} alt="step-line" />
        </div>
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
