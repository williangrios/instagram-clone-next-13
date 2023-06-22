"use client";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import SuggestionArea from "./SuggestionArea";
import { useSession } from "next-auth/react";

export default function Feed() {
  const { data: session } = useSession();

  return (
    <main className="flex flex-row max-w-6xl lg:mx-auto justify-center">
      <section className="w-full md:w-2/3 border-blue-300">
        {/* stories */}
        <Stories />
        {/* posts */}
        <Posts />
      </section>
      {session ? (
        <section className="hidden md:flex md:flex-col md:w-1/3 p-6 mt-8 mx-3">
          <MiniProfile />
          <SuggestionArea />
        </section>
      ) : (
        false
      )}
    </main>
  );
}
