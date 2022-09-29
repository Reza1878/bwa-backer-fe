import { Button, Container, Logo, Typography } from "components/common";
import HeaderBackground from "components/HeaderBackground";
import React from "react";
import GuestFooterList from "./GuestFooterList";

function GuestFooter() {
  const lists = [
    {
      title: "Explore",
      items: [
        { href: "#", title: "Our Service" },
        { href: "#", title: "Equity System" },
        { href: "#", title: "Refund" },
        { href: "#", title: "Shareholder" },
      ],
    },
    {
      title: "Investor",
      items: [
        { href: "#", title: "My Account" },
        { href: "#", title: "Top Startups" },
        { href: "#", title: "How-to Tutorials" },
        { href: "#", title: "Withdrawal" },
      ],
    },
    {
      title: "Office",
      items: [
        { href: "#", title: "+021 2208 1996" },
        { href: "#", title: "KBP, Bandung No.12 (Backer)" },
        { href: "#", title: "support@backer.id" },
      ],
    },
  ];
  return (
    <footer className="relative min-h-[660px] bg-primary">
      <HeaderBackground part="footer" />
      <div className="relative pt-12 lg:pt-24">
        <Container className="text-center flex flex-col items-center">
          <Typography variant="h3" className="text-white font-medium pb-6">
            Easy way to funding <br className="hidden lg:block" /> best idea and
            innovation
          </Typography>
          <Button rounded className="font-medium" size="md">
            Getting Started
          </Button>

          <div className="flex flex-wrap justify-between pt-12 w-full">
            <div className="w-full lg:w-1/3 flex flex-col items-start pb-8">
              <div className="w-full flex items-center">
                <Logo />
                <p className="text-white text-xl pl-2">Backer Inc.</p>
              </div>
              <p className="text-white pt-4 text-left">
                Help people executing their <br /> bright ideas
              </p>
            </div>

            {lists.map((list, index) => (
              <GuestFooterList
                key={index}
                items={list.items}
                title={list.title}
              />
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
}

export default GuestFooter;
