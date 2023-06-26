import Feed from "@/components/Feed";
import Header from "@/components/Header";
import UploadModal from "@/components/UploadModal";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* header */}
      <Header />

      {/* feed  */}
      <Feed />

      {/* modal  */}
      <UploadModal />
    </div>
  );
}
