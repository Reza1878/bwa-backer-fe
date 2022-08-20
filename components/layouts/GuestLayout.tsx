import HeaderBackground from "components/HeaderBackground";
import Head from "next/head";
import React, { HTMLAttributes } from "react";
import { GuestHeader } from "components/navigation";

interface GuestLayoutProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
}

function GuestLayout(props: Partial<GuestLayoutProps>) {
  const { title, children } = props;
  return (
    <>
      <Head>
        <title>{title || "Backer"}</title>
      </Head>
      <div>
        <HeaderBackground part="header" />
        <GuestHeader />
        <main className="lg:pt-20 2xl:pt-0 pb-24">{children}</main>
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
    </>
  );
}

export default GuestLayout;
