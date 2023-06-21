import Image from "next/image";
import { DotsHorizontalIcon, HeartIcon, ChatIcon, BookmarkIcon, EmojiHappyIcon } from "@heroicons/react/outline";

interface PostProps {
  id: number;
  userName: string;
  userImage: string;
  img: string;
  caption: string;
}

export default function Post(props: PostProps) {
  return (
    <div className="flex flex-col bg-white border rounded-md">
      {/* post header */}
      <div className="flex flex-row py-10 px-4 items-center h-12">
        <Image
          width="48"
          height="48"
          src={props.userImage}
          alt={props.userName}
          className="rounded-full object-cover border p-1"
        />
        <p className="ml-3 font-bold flex-1">{props.userName}</p>
        <DotsHorizontalIcon className="h-5 mr-4" />
      </div>
      {/* post image */}
      <img className="object-conver w-full" src={props.img} alt={props.caption} />

      {/* post buttons */}
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex space-x-2">
          <HeartIcon className="post-buttons" />
          <ChatIcon className="post-buttons" />
        </div>
        <BookmarkIcon  className="post-buttons" />
      </div>

      {/* comment */}
      <p className="px-6 pb-4 truncate"><span className="font-bold mr-2">{props.userName}</span>{props.caption}</p>
      <div className="flex px-6 pb-4 items-center">
        <EmojiHappyIcon className="post-buttons" />
        <input type="text" className="mx-2 flex-1 border-none focus:ring-0 rounded-md" placeholder="Post your comment"/>
        <button className="text-blue-500">Post</button>

      </div>

    </div>
  );
}
