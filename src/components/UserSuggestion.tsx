interface UserSuggestionProps {
  userName: string;
  jobTitle: string;
  img: string;
}

export default function UserSuggestion(props: UserSuggestionProps) {
  return (
    <div className="flex items-center my-3">
      <img
        src={props.img}
        alt={props.userName}
        className="rounded-full h-14 w-14 p-1 border-gray-200 border-2"
      />
      <div className="flex flex-col flex-1 ml-2 w-[80px]">
        <h2 className="font-bold font-xs truncate">{props.userName}</h2>
        <h3 className="font-semibold font-xs text-gray-600 truncate overflow-hidden">
          {props.jobTitle}
        </h3>
      </div>
      <button className="text-blue-500 hover:brightness-125">Follow</button>
    </div>
  );
}
