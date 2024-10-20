"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

// Define the interface for each item in the items array
interface DropdownItem {
  title: string;
  item: string;
}

// Define the props for the DropDown component
interface InputProps {
  title?: string;
  items?: DropdownItem[];
  defaultItem?: string;
}

const DropDown: React.FC<InputProps> = ({
  title = null,
  items = [],
  defaultItem = "",
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [selectedTitle, setSelectedTitle] = useState<DropdownItem>({
    title: "",
    item: "",
  });

  useEffect(() => {
    const defaultSelected = items.find((e) => e.item === defaultItem);
    if (defaultSelected) {
      setSelectedTitle(defaultSelected);
    }
  }, [defaultItem, items]);

  const handleClick = (title: string, item: string) => {
    setSelectedTitle({ title, item });
    setExpanded(false);
  };

  return (
    <div className="w-[250px] mt-5 relative">
      <OutsideClickHandler onOutsideClick={() => setExpanded(false)}>
        <div onClick={() => setExpanded(!expanded)}>
          <div className="w-full bg-white p-3 text-left text-gray-700 border border-gray-300 rounded-lg cursor-pointer relative">
            {title && <label className=" text-gray-700">{title} :</label>}

            <span className="">
              {" "}
              {selectedTitle.title || (
                <div className="h-4 bg-gray-200 inline-block w-12 relative top-1 rounded col-span-2"></div>
              )}
            </span>

            <svg
              className="absolute top-3.5 right-3 w-5 h-5 text-gray-500"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"></path>
            </svg>
          </div>

          <div
            className={` absolute left-0 right-0 z-20 ${
              expanded ? "block" : "hidden"
            } mt-2`}
          >
            <ul className="max-h-[250px] overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-md p-2">
              {items.map((e, i) => (
                <li key={i} className="text-left">
                  <Link
                    href={e.item}
                    className="w-full text-left px-4 py-2 block rounded-full hover:bg-gray-100"
                    onClick={() => handleClick(e.title, e.item)}
                  >
                    {e.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default DropDown;
