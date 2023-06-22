"use client";
import minifaker from "minifaker";
import "minifaker/locales/en";
import Image from "next/image";
import { useEffect, useState } from "react";
import Story from "./Story";
import { useSession } from "next-auth/react";

function createUser(userName: string, img: string, id: number) {
  return {
    userName,
    img,
    id,
  };
}

export default function Stories() {
  const [storyUsers, setStoryUsers] = useState([createUser("", "", 0)]);
  const { data: session } = useSession();
  useEffect(() => {
    const storyUsers = minifaker.array(20, (i) =>
      createUser(
        minifaker.username({ locale: "en" }).toLowerCase(),
        `https://i.pravatar.cc/150?img${Math.ceil(Math.random() * 70)}`,
        +i
      )
    );
    setStoryUsers(storyUsers);
  }, []);

  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border overflow-x-scroll rounded-sm scrollbar-none">
      {
        session && (
          <Story img={session?.user?.image} userName={session?.user?.name} isUser={true}/>
        )
      }
      {storyUsers.map((user) => (
        <Story
          key={user.id}
          userName={user.userName}
          img={user.img}
          id={user.id}
        />
      ))}
    </div>
  );
}
