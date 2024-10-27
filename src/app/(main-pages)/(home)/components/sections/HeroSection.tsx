import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

const HeroSection: FC = () => {
  return (
    <section className="mt-28">
      <div className="container">
        <div className="items-center relative bg-pink-50 rounded-xl overflow-hidden grid lg:grid-cols-2 py-12 lg:py-24 px-10 sm:px-20 min-h-[600px]">
          <div className={"relative z-10"}>
            <h2 className="text-2xl sm:text-3xl mb-7 leading-[50px]">
              فقط <strong className="text-[#ff00a6]">یک کلیک</strong> تا غذات
              فاصله داری!
            </h2>
            <p className="my-t mb-8 text-zinc-800">
              با اسنپ فود، لذت غذا خوردن در خانه به سادگی یک سفر مجازی به
            رستوران‌های محبوب‌تون رو تجربه کن.
            </p>
            <Link href="/restaurants">
              <button
                type="button"
                className="bg-[#ff00a6] text-white px-4 py-2 rounded-xl hover:bg-[#a82b7c] transition-all ease-in-out duration-300"
              >
                 غذا می خواد
              </button>
            </Link>
          </div>
          <div className={``}>
            <Image
              width={1000}
              height={1000}
              src={"/img/landing-food.png"}
              alt="Img"
              className={`w-full h-auto lg:w-[950px]  absolute -left-[160px] -bottom-[160px] md:-left-[300px] md:-bottom-[300px] rotating-element`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
