import clsx from "clsx";
import { Backdrop, Typography } from "components/common";
import { MemberSidebar } from "components/navigation";
import Head from "next/head";
import React, { ReactNode, useEffect, useState } from "react";
import { Heart, Menu } from "react-feather";

interface MemberLayoutProps {
  title: string;
  children: ReactNode;
}

function MemberLayout(props: MemberLayoutProps) {
  const { title, children } = props;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.querySelector("body")?.classList.add("bg-gray-100");
  }, []);
  return (
    <>
      <Head>
        <title>{`Backer - ${title}`}</title>
      </Head>
      <div className="bg-gray-100 h-full w-full flex flex-col justify-between">
        <div className="flex w-full h-full" style={{ minHeight: "95vh" }}>
          <MemberSidebar open={open} />
          <main className="lg:pl-72 w-full">
            <div className="px-12 py-10 ">
              <header className="block lg:hidden">
                <button onClick={() => setOpen(!open)}>
                  <Menu />
                </button>
              </header>
              {children}
            </div>
          </main>
        </div>
        <footer className="lg:pl-72 w-full">
          <div className="flex justify-between px-10">
            <div>
              <Typography className="opacity-70">&copy; Reza</Typography>
            </div>
            <div className="flex items-center">
              <Typography className="opacity-70">Made with</Typography>
              <span className="pl-1">
                <Heart
                  fill="red"
                  height={18}
                  width={18}
                  stroke="red"
                  opacity={0.7}
                />
              </span>
            </div>
          </div>
        </footer>
      </div>
      <Backdrop
        show={open}
        onClick={() => setOpen(!open)}
        className="lg:invisible"
      />
    </>
  );
}

export default MemberLayout;
