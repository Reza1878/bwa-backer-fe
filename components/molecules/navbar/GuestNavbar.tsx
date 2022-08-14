import clsx from "clsx";
import { Button, Container, Logo, NavItem } from "components/atoms";
import React, { useState } from "react";
import { Menu, X } from "react-feather";

function GuestNavbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav>
      <Container className="flex justify-between flex-wrap flex-col lg:flex-row">
        <div className="flex items-center flex-wrap">
          <div className="flex justify-between w-full lg:w-auto items-center">
            <Logo />

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
            <NavItem href="#" title="Home" />
            <NavItem href="#" title="Project" />
            <NavItem href="#" title="Features" />
            <NavItem href="#" title="Success Stories" />
          </ul>
        </div>

        <div
          className={clsx(
            "lg:flex py-4 lg:flex-row flex-col",
            open && "flex",
            !open && "hidden"
          )}
        >
          <Button
            rounded
            variant="transparent"
            size="sm"
            className="font-light mb-2 lg:mb-0 lg:mr-2"
          >
            Daftar
          </Button>
          <Button rounded variant="transparent" className="font-light">
            Akun Saya
          </Button>
        </div>
      </Container>
    </nav>
  );
}

export default GuestNavbar;
