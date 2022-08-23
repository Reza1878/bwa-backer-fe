import HeaderBackground from "components/HeaderBackground";
import Head from "next/head";
import React, { HTMLAttributes } from "react";
import { GuestFooter, GuestHeader } from "components/navigation";

interface GuestLayoutProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  headerBackground: React.ReactNode;
}

function GuestLayout(props: Partial<GuestLayoutProps>) {
  const { title, children, headerBackground } = props;
  return (
    <>
      <Head>
        <title>{title || "Backer"}</title>
      </Head>
      <div>
        {headerBackground || (
          <HeaderBackground
            skew={false}
            part="header"
            className="h-96 lg:h-[420px]"
          />
        )}
        <GuestHeader />
        <main className="relative 2xl:pt-0 pb-24">{children}</main>
        <GuestFooter />
      </div>
    </>
  );
}

export default GuestLayout;
