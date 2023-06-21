import Image from "next/image";

export default function MiniProfile() {
  return (
    <div className="flex items-center">
      <Image
        width="64"
        height="64"
        src="https://i.pravatar.cc/150?img7"
        alt="user-img"
        className="rounded-full object-cover border p-1"
      />
      <div className="flex flex-col flex-1 justify-center px-2">
        <h2 className="font-bold truncate w-[140px]">codeWithwillian</h2>
        <h3 className="text-gray-400 truncate w-[140px]">Welcome to instagram</h3>
      </div>
      <button className="text-blue-500 text-sm font-semibold hover:brightness-110">Sign out</button>
    </div>
  );
}
