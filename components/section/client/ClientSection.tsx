import React from "react";

function ClientSection() {
  return (
    <section className="container px-6 xl:px-24 mx-auto py-4">
      <h2 className="text-2xl lg:text-3xl">
        See What Out <br className="hidden lg:block" />
        Happy Clients Say
      </h2>

      <div className="flex pt-6 lg:pl-20">
        <picture>
          <img
            className="hidden lg:block"
            src="/image/testimonial-line.svg"
            alt=""
          />
        </picture>
        <div className="lg:p-8 w-full lg:w-1/2">
          <h1 className="text-xl lg:text-2xl leading-relaxed">
            <i>&quot; </i>
            Funding at Bucker is very easy and comfortable. Just need to find an
            idea, click and already funding.
            <i> &quot;</i>
          </h1>
          <div className="pt-2 text-center lg:text-left">
            <p className="text-lg">Sophie Nicole</p>
            <p className="font-light text-base text-gray-400">
              Project Manager
            </p>
          </div>

          <div className="flex pt-4 justify-center lg:justify-start">
            <picture className="opacity-60 pr-4">
              <img src="/image/testimonial-1-icon.png" alt="" />
            </picture>
            <picture className="opacity-60 pr-4">
              <img src="/image/testimonial-2-icon.png" alt="" />
            </picture>
            <picture className="pr-4">
              <img
                src="/image/testimonial-3-icon.png"
                alt=""
                className="rounded-full border-2 border-primary p-1"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClientSection;
