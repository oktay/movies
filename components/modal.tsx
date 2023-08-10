import { createPortal } from "react-dom";
import { PiX } from "react-icons/pi";

type Props = {
  src: string;
  isOpen: boolean;
  close: () => void;
};

export default function IframeModal({ src, isOpen, close }: Props) {
  if (typeof window === "object")
    return createPortal(
      isOpen && (
        <div
          className={
            "fixed top-0 left-0 right-0 bottom-0 z-10 bg-black/90 flex animate-fade-in opacity-0" +
            (isOpen ? " animate-fade-in" : "")
          }
          onClick={() => close()}
        >
          <button
            className="absolute top-1 right-1 z-100 p-3 text-3xl bg-black/60 rounded-full hover:text-primary transition"
            onClick={() => close()}
          >
            <PiX />
          </button>
          <iframe
            allow="autoplay; encrypted-media"
            className="w-full m-5 lg:m-20 border-none"
            src={src}
            allowFullScreen={true}
          />
        </div>
      ),
      document.querySelector("body")!
    );
}
