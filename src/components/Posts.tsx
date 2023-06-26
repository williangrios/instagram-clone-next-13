import { useEffect, useState } from "react";
import Post from "./Post";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";

export default function Posts() {
  function createPost(
    id: number,
    userName: string,
    userImage: string,
    img: string,
    caption: string
  ) {
    return {
      id,
      userName,
      userImage,
      img,
      caption,
    };
  }

  const [posts, setPost] = useState([createPost(0, "", "", "", "")]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot: any) => {
        setPost(
          snapshot.docs.map((post: any) =>
            createPost(
              post.id,
              post.data().userName,
              post.data().profileImg,
              post.data().image,
              post.data().caption
            )
          )
        );
      }
    );
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          userName={post.userName}
          userImage={post.userImage}
          img={post.img}
          caption={post.caption}
        />
      ))}
    </div>
  );
}
