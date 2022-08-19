import clsx from "clsx";
import { Container, Img, Typhograpy } from "components/atoms";
import React from "react";

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
      containerClass: "",
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
      containerClass: "lg:-mt-14",
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
      containerClass: "lg:-mt-28",
    },
  ];
  return (
    <Container
      id="step-section"
      className="container px-6 xl:px-24 mx-auto py-4"
    >
      <Typhograpy variant="h4">
        Only 3 steps to execute your bright ideas
      </Typhograpy>
      <div className="flex items-center flex-col">
        <Img containerClassNames="lg:block hidden" src="/image/line-step.svg" />
        <div className="w-full flex justify-evenly flex-wrap">
          {stepImages.map((item) => (
            <div
              key={item.id}
              className={clsx(
                "text-center w-full lg:w-1/3 flex flex-col items-center lg:py-0 py-6",
                item.containerClass
              )}
            >
              <Img src={item.src} />
              <Typhograpy className="font-medium py-2">{item.title}</Typhograpy>
              <Typhograpy variant="small">{item.description}</Typhograpy>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default StepSection;
