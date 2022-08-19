import { HeaderBackground } from "components/atoms";
import { GuestHeader, StepSection } from "components/organism";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  const projects = [
    {
      image: "/project-thumbnail-1.jpg",
      title: "Robotic Hand",
      description: "Creating robotic hand for better movement",
      target: 10000000,
      progress: 20,
    },
    {
      image: "/project-thumbnail-2.jpg",
      title: "Auto Pilot Drone",
      description: "Self driving drone, no worry to drive again",
      target: 12000000,
      progress: 30,
    },
    {
      image: "/project-thumbnail-3.jpg",
      title: "Wireboard",
      description: "The new era of mechanical keyboard",
      target: 23000000,
      progress: 25,
    },
    {
      image: "/project-thumbnail-4.jpg",
      title: "Wireless Earphone",
      description: "Just pair to phone and ready to set",
      target: 405000000,
      progress: 50,
    },
    {
      image: "/project-thumbnail-5.jpg",
      title: "Auto Heater",
      description: "Make the room keep warm automatically",
      target: 124000000,
      progress: 75,
    },
    {
      image: "/project-thumbnail-6.jpg",
      title: "Smart Lock",
      description: "Open the door with just one tap and click",
      target: 60000000,
      progress: 85,
    },
  ];
  return (
    <div>
      <Head>
        <title>Backer</title>
      </Head>
      <div>
        <HeaderBackground part="header" />
        <GuestHeader />
        <main className="lg:pt-24 2xl:pt-0 pb-24">
          <StepSection />
          <section className="container px-6 xl:px-24 mx-auto py-4">
            <div className="flex flex-wrap justify-between items-center">
              <h2 className="text-2xl lg:text-3xl">
                New projects you can <br className="hidden lg:block" />
                taken care of
              </h2>

              <a href="#" className="w-full lg:w-auto hover:underline">
                View all
              </a>
            </div>

            <div className="flex lg:justify-between flex-wrap mt-4 text-">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="rounded-lg box-border border border-gray-400 p-6 w-full lg:w-[30%] hover:shadow-xl transition-all project-card m-2"
                >
                  <div className="w-full">
                    <picture>
                      <img
                        className="rounded-sm w-full lg:h-52 object-cover"
                        src={`/image/${project.image}`}
                        alt=""
                      />
                    </picture>
                    <h5 className="font-medium text-xl py-2">
                      {project.title}
                    </h5>
                    <p className="font-light text-sm">{project.description}</p>

                    <div className="bg-gray-300 my-2 block h-4 rounded-lg relative">
                      <span
                        style={{
                          width: `${project.progress}%`,
                          height: "100%",
                          position: "absolute",
                        }}
                        className="bg-primary opacity-90 rounded-lg"
                      >
                        {" "}
                      </span>
                    </div>
                    <div className="flex pt-2 pb-0 lg:pb-2 justify-between progress">
                      <p className="font-light text-base">
                        {project.progress}%
                      </p>
                      <p className="font-medium text-base">
                        Rp. {new Intl.NumberFormat().format(project.target)}
                      </p>
                    </div>
                    <a
                      href="#"
                      className="block mt-2 lg:mt-0 text-center bg-success hover:bg-secondary rounded-sm py-2 text-white opacity-100 lg:opacity-0 transition-all btn-fund"
                    >
                      Fund Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

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
                  Funding at Bucker is very easy and comfortable. Just need to
                  find an idea, click and already funding.
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
        </main>
        <footer className="relative min-h-[660px] bg-primary">
          <div className="header__bg min-h-[660px] skew-y-[4deg] origin-bottom-right"></div>
          <div className="relative pt-12 lg:pt-24">
            <div className="container mx-auto text-center px-6 xl:px-24">
              <h1 className="text-white font-medium text-4xl leading-tight pb-6">
                Easy way to funding <br className="hidden lg:block" /> best idea
                and innovation
              </h1>

              <a
                href="#"
                className="inline-block bg-success hover:bg-secondary text-white text-lg font-medium transition-all px-6 py-4 rounded-full"
              >
                Getting Started
              </a>

              <div className="flex flex-wrap justify-between pt-12">
                <div className="w-full lg:w-1/3 flex flex-col items-start pb-8">
                  <div className="w-full flex items-center">
                    <picture>
                      <img src="/image/logo.svg" alt="" />
                    </picture>
                    <p className="text-white text-xl pl-2">Backer Inc.</p>
                  </div>
                  <p className="text-white pt-4 text-left">
                    Help people executing their <br /> bright ideas
                  </p>
                </div>

                <div className="w-full lg:w-1/5 text-left pb-8">
                  <p className="font-medium text-white pb-2 lg:pb-8">Explore</p>
                  <ul>
                    <li className="py-1">
                      <a href="#" className="text-white">
                        Our service
                      </a>
                    </li>
                    <li className="py-1">
                      <a href="#" className="text-white">
                        Equity System
                      </a>
                    </li>
                    <li className="py-1">
                      <a href="#" className="text-white">
                        Refund
                      </a>
                    </li>
                    <li className="py-1">
                      <a href="#" className="text-white">
                        Shareholder
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="w-full lg:w-1/5 text-left pb-8">
                  <p className="font-medium text-white pb-2 lg:pb-8">
                    Investor
                  </p>
                  <ul>
                    <li className="py-1">
                      <a href="#" className="text-white">
                        My Account
                      </a>
                    </li>
                    <li className="py-1">
                      <a href="#" className="text-white">
                        Top Startups
                      </a>
                    </li>
                    <li className="py-1">
                      <a href="#" className="text-white">
                        How-to Tutorials
                      </a>
                    </li>
                    <li className="py-1">
                      <a href="#" className="text-white">
                        Withdrawal
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="w-full lg:w-1/5 text-left pb-8">
                  <p className="font-medium text-white pb-2 lg:pb-8">Office</p>
                  <ul>
                    <li className="py-1">
                      <a href="#" className="text-white">
                        +021 2208 1996
                      </a>
                    </li>
                    <li className="py-1">
                      <a href="#" className="text-white">
                        KBP, Bandung No.12 (Backer)
                      </a>
                    </li>
                    <li className="py-1">
                      <a href="#" className="text-white">
                        support@backer.id
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
