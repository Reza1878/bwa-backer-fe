import clsx from "clsx";
import { Avatar, Logo, Typography } from "components/common";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { Briefcase, CreditCard, Home, LogOut, User } from "react-feather";
import { AuthService } from "service/auth_service";
import { UserType } from "service/types";
import UserService from "service/user_service";
import { useSendAndHandleInvalidToken } from "utils/hooks";
import useToast from "utils/toast-hooks";

interface MemberSidebarProps {
  open: boolean;
}

function MemberSidebar(props: Partial<MemberSidebarProps>) {
  const { open } = props;
  const router = useRouter();
  const sendAndHandleInvalidToken = useSendAndHandleInvalidToken();
  const { toastLoading, updateToast } = useToast();
  const routes = useMemo(() => {
    return [
      {
        title: "Dashboard",
        icon: (strokeWidth: number = 1) => <Home strokeWidth={strokeWidth} />,
        href: "/member/dashboard",
      },
      {
        title: "Campaign",
        icon: (strokeWidth: number = 1) => (
          <Briefcase strokeWidth={strokeWidth} />
        ),
        href: "/member/campaign",
      },
      {
        title: "Transaction",
        icon: (strokeWidth: number = 1) => (
          <CreditCard strokeWidth={strokeWidth} />
        ),
        href: "/member/transaction",
      },
      {
        title: "Account",
        icon: (strokeWidth: number = 1) => <User strokeWidth={strokeWidth} />,
        href: "/member/account",
      },
    ];
  }, []);

  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    let active = true;

    const fetchUser = async () => {
      const response = await sendAndHandleInvalidToken(UserService.getUser);
      const { data } = response;
      if (!active) return;
      setUser(data);
    };

    fetchUser();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleLogout = async () => {
    const refreshToken = Cookies.get("refresh_token") || "test";

    toastLoading();
    const response = await sendAndHandleInvalidToken(() =>
      AuthService.logout(refreshToken)
    );

    if (response.meta.code !== 200) {
      updateToast(response.meta.message, "error");
      return;
    }
    updateToast("Logout success", "success");

    Cookies.remove("token");
    Cookies.remove("refresh_token");
    router.push("/");
  };
  return (
    <aside
      className={clsx(
        "bg-white h-full lg:w-72 visible fixed z-10 overflow-hidden transition-all",
        [open && "w-72"],
        [!open && "w-0"]
      )}
    >
      <div className="flex justify-center items-center py-10 border-b border-b-gray-100">
        <Logo />
        <Typography variant="h4" className="text-success font-bold ml-2">
          BACKER
        </Typography>
      </div>

      <div className="flex pl-6 items-center py-6">
        <Avatar className="w-12 h-12" src={user?.image_url} />
        <Typography className="ml-2 font-medium">
          {user?.name ?? "..."}
        </Typography>
      </div>

      <ul>
        {routes.map((item) => (
          <li key={item.href} className="flex items-center relative py-4 px-6">
            <Link href={item.href}>
              <a className="flex w-full overflow-hidden">
                {router.pathname.includes(item.href) && (
                  <span className="absolute bg-success inset-y-0 w-1 left-0 rounded-r-lg"></span>
                )}
                {item.icon(router.pathname.includes(item.href) ? 2 : 1)}
                <Typography
                  variant="small"
                  className={clsx("ml-2", [
                    router.pathname.includes(item.href) && "font-medium",
                  ])}
                >
                  {item.title}
                </Typography>
              </a>
            </Link>
          </li>
        ))}
        <li>
          <div
            className="flex items-center py-4 px-6 cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut strokeWidth={1} />
            <Typography variant="small" className="ml-2">
              Logout
            </Typography>
          </div>
        </li>
      </ul>
    </aside>
  );
}

export default MemberSidebar;
