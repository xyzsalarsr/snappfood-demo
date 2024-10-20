import Image from "next/image";
import React, { FC } from "react";

const Header: FC = () => {
  return (
    <header className="fixed top-4 left-0 right-0 w-full z-50">
      <div className="container">
        <div className="p-4 rounded-lg text-right bg-[#ffd3f0]/80 backdrop-blur">
          <Image
            src={"/img/logo.svg"}
            alt="Snapp logo"
            width={75}
            height={60}
            className="h-auto inline-block"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
