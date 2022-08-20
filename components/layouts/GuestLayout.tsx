import HeaderBackground from "components/HeaderBackground";
import Head from "next/head";
import React, { HTMLAttributes } from "react";
import { GuestFooter, GuestHeader } from "components/navigation";

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
        <GuestFooter />
      </div>
    </>
  );
}

export default GuestLayout;
