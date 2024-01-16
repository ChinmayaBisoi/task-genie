import { X } from "lucide-react";
import React from "react";

const Popup = ({
  show = false,
  onClose = () => {},
  className = "",
  children,
}: {
  show: boolean;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
}) => {
  if (!show) return null;
  return (
    <div className="fixed left-0 top-0  z-10 flex h-screen w-screen items-center justify-center bg-neutral-600/70 pb-20 backdrop-blur-sm">
      <div
        className={`relative w-screen rounded-lg bg-white p-4 shadow-md md:max-h-[80vh] md:max-w-md ${className}`}
      >
        <button
          className="absolute right-4 top-4 rounded-md p-1 hover:bg-neutral-100"
          onClick={onClose}
        >
          <X />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
