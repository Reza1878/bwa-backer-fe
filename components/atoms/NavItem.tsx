import Link from "next/link";
import React from "react";

interface PropsInterface {
  href: string;
  title: string;
}

function NavItem(props: PropsInterface) {
  const { href, title } = props;
  return (
    <li className="text-white hover:text-secondary transition-colors px-2 py-2">
      <Link href={href}>
        <a>{title}</a>
      </Link>
    </li>
  );
}

export default NavItem;
