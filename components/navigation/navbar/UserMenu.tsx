import clsx from "clsx";
import { Img, Typography } from "components/common";
import { BASE_URL } from "config/constant";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { ChevronUp } from "react-feather";
import { UserType } from "service/types";
import useToast from "utils/toast-hooks";

interface UserMenuProps {
  user: UserType;
}

function UserMenu(props: UserMenuProps) {
  const { user } = props;
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();
  const userMenu = useMemo(() => {
    return [
      { href: "/member/dashboard", title: "Dashboard" },
      { href: "/member/account", title: "My Account" },
    ];
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    showToast("Logout success!", "success");
    if (router.pathname === "/") {
      router.reload();
    } else {
      router.push("/");
    }
  };
  return (
    <div className="relative">
      <div
        className={clsx("bg-white rounded-t-xl cursor-pointer", [
          !openUserMenu && "rounded-b-xl",
        ])}
        onClick={() => setOpenUserMenu(!openUserMenu)}
      >
        <div className="w-full flex p-2">
          <Img
            src={
              user.image_url
                ? `${BASE_URL}${user.image_url}`
                : "/image/mock-avatar.png"
            }
            className="w-12 h-12 object-cover rounded-full mr-2"
          />
          <div className="flex-grow">
            <Typography variant="small" className="font-medium">
              {user.name}
            </Typography>
            <Typography variant="small" className="font-light text-gray-400">
              {user.occupation}
            </Typography>
          </div>
          <div className="flex justify-center items-center ml-2">
            <ChevronUp
              className={clsx("rotate-0 transition-all", [
                openUserMenu && "rotate-180",
              ])}
            />
          </div>
        </div>
      </div>

      <div
        className={clsx(
          [openUserMenu && "show h-auto"],
          [!openUserMenu && "hidden h-0"],
          "absolute top-16 bg-white z-50 w-full rounded-b-xl border-2 border-gray-300 transition-all"
        )}
      >
        {userMenu.map((um, index) => (
          <Link key={index} href={um.href}>
            <a>
              <Typography
                variant="small"
                className={clsx(
                  "p-2 hover:text-secondary transition-all block cursor-pointer border-b-2 border-b-gray-300"
                )}
              >
                {um.title}
              </Typography>
            </a>
          </Link>
        ))}
        <a onClick={handleLogout}>
          <Typography
            variant="small"
            className={clsx(
              "p-2 hover:text-secondary transition-all block cursor-pointer"
            )}
          >
            Logout
          </Typography>
        </a>
      </div>
    </div>
  );
}

export default UserMenu;
