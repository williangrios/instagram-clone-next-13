"use client";
import { modalState } from "../../atom/modalAtom";
import { useRecoilState } from "recoil";
import Modal from "react-modal";
import { CameraIcon } from "@heroicons/react/outline";
import { ChangeEvent, useRef, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { db, storage } from "../../firebase";
import { useSession } from "next-auth/react";

export default function UploadModal() {
  const [open, setOpen] = useRecoilState(modalState);
  const filePickerRef = useRef<HTMLInputElement | null>(null);
  //const captionRef = useRef('')
  const captionRef = useRef<HTMLInputElement | null>(null);

  const [selectedFile, setSelectedFile] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();

  async function uploadPost() {
    if (loading) return;
    try {
      setLoading(true);

      //const caption = typeof captionRef.current !== 'object' ?  captionRef.current?.value : captionRef.current;
      const caption =
        captionRef.current instanceof HTMLInputElement
          ? captionRef.current.value
          : captionRef.current;

      const docRef = await addDoc(collection(db, "posts"), {
        caption: caption,
        userName: session?.user?.name,
        profileImg: session?.user?.image,
        timestamp: serverTimestamp(),
      });

      const imgRef = ref(storage, `posts/${docRef.id}/image`);
      await uploadString(imgRef, selectedFile, "data_url").then(
        async (snapshot) => {
          const downloadURL = await getDownloadURL(imgRef);
          await updateDoc(doc(db, "posts", docRef.id), {
            image: downloadURL,
          });
        }
      );
      setOpen(false);
      setLoading(false);
      setSelectedFile("");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  function addImageToPost(event: ChangeEvent<HTMLInputElement>) {
    const reader = new FileReader();
    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (typeof readerEvent.target?.result === "string") {
        setSelectedFile(readerEvent.target?.result);
      }
    };
  }

  return (
    <div>
      {open ? (
        <Modal
          isOpen={open}
          onRequestClose={() => {
            setOpen(false);
            setSelectedFile("");
          }}
          className="max-w-lg w-[90%] absolute top-48 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md outline-none p-6"
        >
          <div className="flex flex-col justify-center items-center h-[100%]">
            {selectedFile !== "" ? (
              <img
                src={selectedFile}
                alt="selected file"
                className="w-full max-h-[250px] object-cover cursor-pointer mb-6 "
                onClick={() => setSelectedFile("")}
              />
            ) : (
              <CameraIcon
                onClick={() => filePickerRef.current?.click()}
                className="text-red-500 bg-red-300 p-2 h-16 w-16 rounded-full border border-gray-400 mb-6 cursor-pointer"
              />
            )}
            <input
              type="file"
              hidden
              ref={filePickerRef}
              onChange={addImageToPost}
            />
            <input
              type="text"
              maxLength={150}
              placeholder="Please, enter your caption..."
              ref={captionRef}
              className="border-none mb-6 text-center w-full focus:ring-0"
            />
            <button
              disabled={loading || selectedFile === ""}
              onClick={uploadPost}
              className="w-full text-white border-none bg-red-600 hover:brightness-125 font-semibold p-3 rounded-lg text-lg shadow-md hover:brightness-125 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:brightness-100"
            >
              Upload Post
            </button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
