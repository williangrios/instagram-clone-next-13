"use client";
import { modalState } from "../../atom/modalAtom";
import { useRecoilState } from "recoil";
import Modal from "react-modal";
import { CameraIcon } from "@heroicons/react/outline";
import { ChangeEvent, useRef, useState } from "react";

export default function UploadModal() {
  const [open, setOpen] = useRecoilState(modalState);
  const filePickerRef = useRef<HTMLInputElement | null>(null);
  const [caption, setCaption] = useState("");
  const [selectedFile, setSelectedFile] = useState('');

  function addImageToPost(event:  ChangeEvent<HTMLInputElement>) {
    const reader = new FileReader();
    if ( event.target.files?.[0]) {
    reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if ( typeof readerEvent.target?.result === 'string'){
        setSelectedFile(readerEvent.target?.result);
      }
    };
  }

  return (
    <div>
      {open ? (
        <Modal
          isOpen={open}
          onRequestClose={() => {setOpen(false); setSelectedFile('')}}
          className="max-w-lg w-[90%] absolute top-48 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md outline-none p-6"
        >
          <div className="flex flex-col justify-center items-center h-[100%]">
            {selectedFile !== '' ? (
              <img src={selectedFile} alt="selected file" className="w-full max-h-[250px] object-cover cursor-pointer" onClick={()=> setSelectedFile('')}/>
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
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="border-none mb-6 text-center w-full focus:ring-0"
            />
            <button
              disabled={false}
              onClick={() => setOpen(!open)}
              className="w-full text-gray-500 border-none bg-gray-300 p-3 rounded-lg text-lg shadow-md hover:brightness-125 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100"
            >
              Upload Post
            </button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
