import { useState } from "react";
import { getVideo } from "@/lib/utils";
import { PiPlayCircleLight } from "react-icons/pi";
import Image from "next/image";
import IframeModal from "../modal";

export default function VideoCard({ video }: { video: Video }) {
  const link = getVideo(video);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="aspect-[16/9] mb-3 relative">
        <Image
          src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
          alt=""
          width={500}
          height={280}
          className="w-full h-full object-cover p-1 bg-zinc-800"
          unoptimized
        />
        <button
          className="absolute inset-0 flex items-center justify-center"
          onClick={() => setIsOpen(true)}
        >
          <PiPlayCircleLight className="text-7xl text-white/60" />
        </button>
      </div>
      <div className="h-full flex flex-col">
        <h3 className="mb-3">{video.name}</h3>
        <p className="text-white/60">{video.type}</p>
      </div>
      {link && (
        <IframeModal
          src={link}
          isOpen={isOpen}
          close={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
