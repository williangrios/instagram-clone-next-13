import Image from "next/image";
import React from "react";

interface storyProps {
  userName: string;
  img: string;
  id: number;
}

export default function Story(props: storyProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* <img src={props.img} alt={props.userName} /> */}
      <Image
        width="40"
        height="40"
        src={props.img}
        alt="user photo"
        className="h-14 w-14 p-[1.5px] rounded-full border-red-500 border-2 cursor-pointer hover:scale-110 transition-transform ease-out duration-200"
      />
      <p className="text-xs w-14 truncate">{props.userName}</p>
    </div>
  );
}
