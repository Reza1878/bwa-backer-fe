import Image from "next/image";
import React from "react";
import testimonialLine from "../../../public/image/testimonial-line.svg";
import client1 from "../../../public/image/testimonial-1-icon.png";
import client2 from "../../../public/image/testimonial-2-icon.png";
import client3 from "../../../public/image/testimonial-3-icon.png";

function ClientSection() {
  return (
    <section className="container px-6 xl:px-24 mx-auto py-4">
      <h2 className="text-2xl lg:text-3xl">
        See What Out <br className="hidden lg:block" />
        Happy Clients Say
      </h2>

      <div className="flex pt-6 lg:pl-20">
        <div className="lg:block hidden">
          <Image src={testimonialLine} alt="testimonial-line" />
        </div>
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
            <div className="pr-4 rounded-full">
              <Image src={client1} className="opacity-60" alt="client-1" />
            </div>
            <div className="pr-4 rounded-full">
              <Image src={client2} className="opacity-60" alt="client-2" />
            </div>
            <div className="rounded-full flex justify-center items-center p-1 border-2 border-primary ">
              <Image src={client3} alt="client-3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClientSection;
