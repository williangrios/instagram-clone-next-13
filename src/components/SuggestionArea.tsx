"use client";

import { useEffect, useState } from "react";
import UserSuggestion from "./UserSuggestion";
import minifaker from "minifaker";

export default function SuggestionArea() {
  const [suggestions, setSuggestions] = useState([
    { userName: "", jobTitle: "", id: 0 },
  ]);

  useEffect(() => {
    const suggestionsMinifaker = minifaker.array(5, (i) => ({
      userName: minifaker.username({ locale: "en" }).toLocaleLowerCase(),
      jobTitle: minifaker.jobTitle({ locale: "en" }).toLocaleLowerCase(),
      id: i,
    }));
    setSuggestions(suggestionsMinifaker);
  }, []);

  return (
    <div className="flex flex-col ">
      <div className="py-4 flex items-center justify-between">
        <h3 className="text-gray-400 font-semibold flex-1">
          Suggestions for you
        </h3>
        <button className="text-gray-700 cursor-pointer font-semibold hover:brightness-110">
          See All
        </button>
      </div>
      {suggestions.map((sug) => (
        <UserSuggestion
          key={sug.id}
          userName={sug.userName}
          jobTitle={sug.jobTitle}
          img={`https://i.pravatar.cc/150?img${sug.id}`}
        />
      ))}
    </div>
  );
}
