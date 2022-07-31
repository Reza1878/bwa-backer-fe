import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "react-feather";
import { clsx } from "clsx";

const Home: NextPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Head>
        <title>Bwa Backer</title>
      </Head>
      <div>
        <div className="header__bg lg:max-h-[664px] -skew-y-6 origin-top-left h-auto" />
        <header className="relative my-6">
          <nav className="container px-6 xl:px-24 mx-auto py-4 flex justify-between flex-wrap flex-col lg:flex-row">
            <div className="flex items-center flex-wrap">
              <div className="flex justify-between w-full lg:w-auto items-center">
                <Image
                  alt="logo"
                  src="/image/logo.svg"
                  width={55}
                  height={55}
                />

                <a
                  className="lg:hidden block text-white"
                  href="#"
                  onClick={() => setOpen(!open)}
                >
                  {open ? <X /> : <Menu />}
                </a>
              </div>

              <ul
                className={clsx(
                  "lg:pl-4 lg:flex",
                  open && "block",
                  !open && "hidden"
                )}
              >
                <li className="text-white hover:text-secondary transition-colors px-2 py-2">
                  <a href="#">Home</a>
                </li>
                <li className="text-white hover:text-secondary transition-colors px-2 py-2">
                  <a href="#">Project</a>
                </li>
                <li className="text-white hover:text-secondary transition-colors px-2 py-2">
                  <a href="#">Features</a>
                </li>
                <li className="text-white hover:text-secondary transition-colors px-2 py-2">
                  <a href="#">Success Stories</a>
                </li>
              </ul>
            </div>

            <div
              className={clsx(
                "lg:flex py-4 lg:flex-row flex-col",
                open && "flex",
                !open && "hidden"
              )}
            >
              <a
                href="#"
                className="inline-block text-center px-6 py-1 bg-transparent text-white rounded-full border border-white hover:bg-white hover:bg-opacity-25 font-light transition-all lg:mr-2 lg:mb-0 mb-2"
              >
                Daftar
              </a>
              <a
                href="#"
                className="inline-block text-center px-6 py-1 bg-transparent text-white rounded-full border border-white hover:bg-white hover:bg-opacity-25 font-light transition-all"
              >
                Akun Saya
              </a>
            </div>
          </nav>
          <div className="container px-6 xl:px-24 mx-auto flex flex-wrap justify-between pt-6">
            <div className="lg:w-1/2 w-full">
              <h1 className="text-white font-medium text-2xl lg:text-4xl mb-8">
                We helps <u className="decoration-secondary">startup</u>
                <br className="block" /> to getting started &{" "}
                <u className="decoration-secondary">funding</u>
                <br className="block" /> their truly needs
              </h1>
              <p className="text-white text-base lg:text-xl font-light mb-8">
                Fund the best idea to become <br />a real product and be the
                contributor
              </p>

              <a
                className="px-8 text-center w-full lg:w-auto py-4 text-white font-medium inline-block bg-success hover:bg-secondary transition-colors rounded-full"
                href="#"
              >
                Find a Project
              </a>
            </div>
            <picture className="lg:w-1/2 w-full">
              <img src="/image/hero-image@2x.png" alt="" />
            </picture>
          </div>
        </header>

        <main className="lg:pt-24 2xl:pt-0">
          <section id="step-section" className="container px-6 mx-auto">
            <h2 className="text-2xl">
              Only 3 steps to execute your brigth ideas
            </h2>
            <div className="flex items-center flex-col">
              <picture className="lg:block hidden">
                <img alt="line-step" src="/image/line-step.svg" />
              </picture>
              <div className="w-full flex justify-evenly flex-wrap">
                <div className="text-center w-full lg:w-1/3 flex flex-col items-center lg:py-0 py-6">
                  <picture>
                    <img src="/image/step-1-illustration.svg" alt="Step 1" />
                  </picture>
                  <p className="py-2 font-medium text-xl">Sign Up</p>
                  <p>
                    Sign Up account and start <br /> funding project{" "}
                  </p>
                </div>
                <div className="text-center w-full lg:w-1/3 flex flex-col items-center lg:-mt-14 lg:py-0 py-6">
                  <picture>
                    <img src="/image/step-2-illustration.svg" alt="Step 1" />
                    <p className="py-2 font-medium text-xl">Open Project</p>
                    <p>
                      Choose some project idea, <br />
                      and start funding
                    </p>
                  </picture>
                </div>
                <div className="text-center w-full lg:w-1/3 flex flex-col items-center lg:-mt-28 lg:py-0 py-6">
                  <picture>
                    <img src="/image/step-3-illustration.svg" alt="Step 1" />
                  </picture>
                  <p className="py-2 font-medium text-xl">Execute</p>
                  <p>
                    Time to makes dream <br />
                    comes true
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;
