"use client";
import Image from "next/image";
import { SearchIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { useSession, signIn, signOut } from "next-auth/react";
import {useRecoilState} from 'recoil';
import { modalState } from "../../atom/modalAtom";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const {  data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);

  return (
    <div className="shadow-sm border-b sticky top-0 bg-white z-30">
      {/* left */}
      <div className="flex items-center justify-between max-w-6xl mx-4 lg:mx-auto ">
        <div className="items-center h-24 w-36 hidden lg:inline-grid cursor-pointer border-1 ">
          <Image
            width="300"
            height="40"
            src="https://cdn2.downdetector.com/static/uploads/logo/Instagram_Logo_Large.png"
            alt="Instagram logo"
            className="object-contain"
            onClick={() => router.push('/')}
          />
        </div>

        <div className="flex h-24 w-36 lg:hidden items-center justify-center cursor-pointer">
          <Image
            width="50"
            height="50"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instagram-Icon.png/800px-Instagram-Icon.png"
            alt="Instagram logo"
            className="object-contain"
            onClick={() => router.push('/')}
          />
        </div>

        <div className="flex border border-gray-600 px-3 py-1 rounded-md items-center ">
          <SearchIcon className="h-5 text-gray-500 " />
          <input
            type="text"
            className="border-none bg-gray-50 rounded-md border-gray-500 text-sm focus:ring-0"
            placeholder="Search"
          />
        </div>
        <div className="flex justify-center items-center ml-4 space-x-3">
          <HomeIcon onClick={() => router.push('/')} className="hidden md:inline-flex h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out" />
          {session ? (
            <>
              <PlusCircleIcon className="h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out" onClick={() => setOpen(true)} />
              <img
                src={session.user?.image ? session.user?.image : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                alt="user image"
                className="h-10 w-10 rounded-full cursor-pointer hover:scale-110 transition-transform ease-out duration-200"
                onClick={() => signOut()}
              />
            </>
          ) : (
            <button className="text-blue-500 font-semibold hover:text-blue-700" onClick={() => signIn()}>Sign in</button>
          )}
        </div>
      </div>

      {/* middle */}

      {/* right */}
    </div>
  );
}
