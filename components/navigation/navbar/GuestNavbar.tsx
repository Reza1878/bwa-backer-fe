import clsx from "clsx";
import { Button, Container, Img, Logo, Typography } from "components/common";
import { BASE_URL } from "config/constant";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";

import React, { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Menu, X } from "react-feather";
import { UserType } from "service/types";
import UserService from "service/user_service";
import NavItem from "./NavItem";

function GuestNavbar() {
  const [open, setOpen] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const userMenu = useMemo(() => {
    return [
      { href: "/dashboard", title: "Dashboard" },
      { href: "/account-settings", title: "Account Settings" },
      { href: "/logout", title: "Logout" },
    ];
  }, []);
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    let active = true;

    const fetchUser = async () => {
      const token = Cookies.get("token");
      if (token) {
        const response = await UserService.getUser();

        if (!active) return;

        setUser(response.data);
      }
    };

    fetchUser();
    return () => {
      active = false;
    };
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
                Masuk
              </Button>
            </>
          ) : (
            <div
              className="bg-white rounded-xl cursor-pointer"
              onClick={() => setOpenUserMenu(!openUserMenu)}
            >
              <div className="flex p-2">
                <Img
                  src={
                    user.image_url
                      ? `${BASE_URL}${user.image_url}`
                      : "/image/mock-avatar.png"
                  }
                  className="w-12 h-12 object-cover rounded-full mr-2"
                />
                <div>
                  <Typography variant="small" className="font-medium">
                    {user.name}
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-light text-gray-400"
                  >
                    {user.occupation}
                  </Typography>
                </div>
                <div className="flex justify-center items-center ml-2">
                  {!openUserMenu ? <ChevronUp /> : <ChevronDown />}
                </div>
              </div>
              <div
                className={clsx(
                  [openUserMenu && "show"],
                  [!openUserMenu && "hidden"]
                )}
              >
                {userMenu.map((um, index) => (
                  <Link key={index} href={um.href}>
                    <Typography
                      variant="small"
                      className={clsx(
                        "p-2 hover:text-secondary transition-all",
                        [
                          index !== userMenu.length - 1 &&
                            "border-b-2 border-b-gray-300",
                        ]
                      )}
                    >
                      {um.title}
                    </Typography>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </nav>
  );
}

export default GuestNavbar;
