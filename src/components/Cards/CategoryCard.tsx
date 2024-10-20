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
    <div className="group font-[#292929] bg-white shadow-lg hover:bg-gray-100 p-1 rounded-xl relative overflow-hidden transition-all ease-in-out duration-200">
      <Image
        src={imgSrc}
        alt={title}
        width={800}
        height={500}
        className="w-full h-[100px] object-cover rounded-xl"
      />
      <span className="group-hover:bg-gray-100 bg-white absolute right-0 px-4 py-1 rounded-tl-lg bottom-0 mt-2 min-w-20 transition-all ease-in-out duration-200">
        {title}
      </span>
      <Link href={link} className="absolute inset-0 z-10" />
    </div>
  );
};

export default CategoryCard;
