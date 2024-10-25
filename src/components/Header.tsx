"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react";

const Header: FC = () => {
  const navItem = [
    {
      title: "خانه",
      href: "/",
    },
    {
      title: "رستوران ها",
      href: "/restaurants",
    },
  ];

  const pathname = usePathname();

  return (
    <header className="fixed top-4 left-0 right-0 w-full z-50">
      <div className="container">
        <div className="py-4 px-7 rounded-lg flex gap-3 justify-between items-center text-right bg-[#ffd3f0]/80 backdrop-blur">
          <ul className="flex items-center gap-4">
            {navItem.map((e, i) => (
              <Link
                key={i}
                className={`${
                  pathname === e.href && "font-['yekan-bold']"
                } text-zinc-800`}
                href={e.href}
              >
                {e.title}
              </Link>
            ))}
          </ul>

          <Image
            src={"/img/logo.svg"}
            alt="Snapp logo"
            width={60}
            height={60}
            className="h-auto inline-block "
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
