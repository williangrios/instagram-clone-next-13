import Image from "next/image";
import {
  DotsHorizontalIcon,
  HeartIcon,
  ChatIcon,
  BookmarkIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";
import {
  HeartIcon as HeartIconFilled,
} from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import Moment from "react-moment";

interface PostProps {
  id: number;
  userName: string;
  userImage: string;
  img: string;
  caption: string;
}

export default function Post(props: PostProps) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    createComment(0, "", "", { seconds: 0, nanoseconds: 0 }, ""),
  ]);
  const [hasLiked, setHasLiked] = useState(false);

  function createComment(
    id: number,
    comment: string,
    profileImg: string,
    timestamp: {
      seconds: number;
      nanoseconds: number;
    },
    userName: string
  ) {
    console.log(timestamp);

    return {
      id,
      userName,
      comment,
      timestamp,
      profileImg,
    };
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts", props.id.toString(), "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setComments(
          snapshot.docs.map((comment: any) =>
            createComment(
              comment.id,
              comment.data().comment,
              comment.data().profileImg,
              comment.data().timestamp,
              comment.data().userName
            )
          )
        );
      }
    );
  }, [props.id]);

  // async function likePost(){
  //   await setDoc(doc(db, 'posts', id, 'likes', session?.user.uid))
  // }

  async function sendComment(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const commentToSend = comment.trim();
    setComment("");
    await addDoc(collection(db, "posts", props.id.toString(), "comments"), {
      comment: commentToSend,
      userName: session?.user?.name,
      profileImg: session?.user?.image,
      timestamp: serverTimestamp(),
    });
  }

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
      <img
        className="object-conver w-full"
        src={props.img}
        alt={props.caption}
      />

      {session && (
        <>
          {/* post buttons */}
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex space-x-2">
              {
                hasLiked ? (
                  <HeartIconFilled onClick={likePost} className="text-red-500 post-buttons" />
                )
                :(
                  <HeartIcon onClick={likePost} className="post-buttons" />
                )
              }
              <ChatIcon className="post-buttons" />
            </div>
            <BookmarkIcon className="post-buttons" />
          </div>
        </>
      )}

      {/* comment */}
      <p className="px-6 pb-4 truncate mt-3">
        <span className="font-bold mr-2">{props.userName}</span>
        {props.caption}
      </p>
      {comments.length > 0 && (
        <div className="mx-10 max-h-24 overflow-y-scroll scrollbar-none">
          {comments.map((comment) => (
            <>
              {comment.id === 0 ? (
                <></>
              ) : (
                <div
                  key={comment.id}
                  className="flex space-x-2 items-center justify-center my-2"
                >
                  <img
                    src={comment.profileImg}
                    alt="user"
                    width="24px"
                    height="24px"
                    className="rounded-full"
                  />
                  <p className="font-semibold">{comment.userName}</p>
                  <p className="flex-1 truncate">{comment.comment}</p>
                  <Moment fromNow>
                    {
                      new Date(
                        comment.timestamp?.seconds * 1000 +
                          comment.timestamp?.nanoseconds / 1000000
                      )
                    }
                  </Moment>
                </div>
              )}
            </>
          ))}
        </div>
      )}

      {session && (
        <>
          <form className="flex px-6 pb-4 items-center">
            <EmojiHappyIcon className="post-buttons" />
            <input
              type="text"
              className="mx-2 flex-1 border-none focus:ring-0 rounded-md"
              placeholder="Post your comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="submit"
              onClick={(e) => sendComment(e)}
              disabled={!comment.trim()}
              className="text-blue-500 disabled:text-blue-200"
            >
              Post
            </button>
          </form>
        </>
      )}
    </div>
  );
}
