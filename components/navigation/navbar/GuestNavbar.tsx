import clsx from "clsx";
import { Button, Container, Logo } from "components/common";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import { Menu, X } from "react-feather";
import { UserType } from "service/types";
import UserService from "service/user_service";
import { useSendAndHandleInvalidToken } from "utils/hooks";
import NavItem from "./NavItem";
import UserMenu from "./UserMenu";

function GuestNavbar() {
  const [open, setOpen] = useState(false);

  const [user, setUser] = useState<UserType>();

  const send = useSendAndHandleInvalidToken();

  useEffect(() => {
    let active = true;

    const fetchUser = async () => {
      const token = Cookies.get("token");
      if (token) {
        const response = await send(UserService.getUser);

        if (!active) return;

        setUser(response.data);
      }
    };

    fetchUser();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const router = useRouter();
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
            <NavItem href="/" title="Home" />
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
          {!user ? (
            <>
              <Button
                rounded
                variant="transparent"
                size="sm"
                className="font-light mb-2 lg:mb-0 lg:mr-2"
                onClick={() => router.push("/sign-in")}
              >
                Sign In
              </Button>
            </>
          ) : (
            <UserMenu user={user} />
          )}
        </div>
      </Container>
    </nav>
  );
}

export default GuestNavbar;
