import clsx from "clsx";
import { Backdrop } from "components/common";
import { MemberSidebar } from "components/navigation";
import Head from "next/head";
import React, { ReactNode, useEffect, useState } from "react";
import { Menu } from "react-feather";

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
      <div className="bg-gray-100 h-full w-full">
        <div className="flex w-full h-full">
          <MemberSidebar open={open} />
          <main className="lg:pl-72 w-full">
            <div className=" px-12 py-10 ">
              <header className="block lg:hidden">
                <button onClick={() => setOpen(!open)}>
                  <Menu />
                </button>
              </header>
              {children}
            </div>
          </main>
        </div>
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
