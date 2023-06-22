"use client";
import { modalState } from "../../atom/modalAtom";
import { useRecoilState } from "recoil";

export default function UploadModal() {
  const [open, setOpen] = useRecoilState(modalState);
  return (
    <div>
      modal
      {open ? <p>open</p> : <p>closed</p>}
      <button onClick={() => setOpen(!open)}>alterar</button>
    </div>
  );
}
