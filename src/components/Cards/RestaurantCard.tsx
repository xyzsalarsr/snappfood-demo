import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";

interface RestaurantCardProps {
  title: string;
  background: string;
  deliveryFee: number;
  logo: string;
  rating: number;
  link: string;
  description: string;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  title,
  background,
  deliveryFee,
  logo,
  rating,
  link,
  description,
}) => {
  return (
    <div className="group font-[#292929] bg-white shadow-lg p-0 rounded-xl relative overflow-hidden transition-all ease-in-out duration-200">
      <Image
        src={background}
        alt=""
        width={800}
        height={500}
        className="w-full h-[120px] object-cover bg-gray-100 rounded-t-xl"
      />
      <div className="p-5">
        <Image
          src={logo}
          alt=""
          width={80}
          height={80}
          className="w-[80px] h-[80px] object-cover rounded-xl bg-white relative z-10 border border-gray-100 mx-auto block -mt-10 shadow-xl shadow-zinc-500/10"
        />
        <h3 className="mt-4 text-center block text-xl font-['yekan-bold'] transition-all ease-in-out duration-200">
          {title}
        </h3>
        <div className="my-2 flex justify-center items-center gap-2 text-xs">
          <FaStar className="inline-block text-xs text-[#ffce00]" />{" "}
          <span className="relative top-[2px]">
            {((Number(rating) / 10) * 5).toFixed(1)}
          </span>
        </div>
        <p className="text-xs text-center text-zinc-500">{description}</p>
        <span className="flex justify-center items-center mt-3 gap-2 text-[13px] border border-gray-200 p-1 mx-auto bg-white w-9/12 rounded-full">
          <TbTruckDelivery />
          هزینه ارسال :{" "}
          {deliveryFee !== 0 ? `${deliveryFee.toLocaleString()} تومان` : "رایگان"}
        </span>
      </div>
      <Link href={link} className="absolute inset-0 z-10" />
    </div>
  );
};

export default RestaurantCard;
