import Link from "next/link";
import React from "react";

type GuestFooterListItems = {
  title: string;
  href: string;
};

interface GuestFooterListProps {
  title: string;
  items: GuestFooterListItems[];
}

function GuestFooterList(props: GuestFooterListProps) {
  const { title, items } = props;
  return (
    <div className="w-full lg:w-1/5 text-left pb-8">
      <p className="font-medium text-white pb-2 lg:pb-8">{title}</p>
      <ul>
        {items.map((item, index) => (
          <li key={`${index}+${title}`} className="py-1">
            <Link href={item.href}>
              <a className="text-white">{item.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GuestFooterList;
