import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface Props {
  title: string;
  imgSrc: string;
  link: string;
}

const CategoryCard: FC<Props> = ({ title = "", imgSrc = "", link = "" }) => {
  return (
    <div className="group shadow-lg rounded-xl relative overflow-hidden transition-all ease-in-out duration-200">
      <Image
        src={imgSrc}
        alt={title}
        width={800}
        height={500}
        className="w-full h-[100px] object-cover rounded-xl"
      />
      <span className="group-hover:bg-pink-900/80 text-white flex justify-center items-center flex-col text-2xl font-['yekan-bold'] bg-black/70 absolute inset-0 px-4 py-1 rounded-tl-lg bottom-0 transition-all ease-in-out duration-200">
        {title}
      </span>
      <Link href={link} className="absolute inset-0 z-10" />
    </div>
  );
};

export default CategoryCard;
