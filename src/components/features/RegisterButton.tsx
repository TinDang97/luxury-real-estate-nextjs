"use client";

import { useState } from "react";
import RegisterModal from "@/components/features/RegisterModal";

export default function RegisterButton({ projectTitle }: { projectTitle: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 bg-[#c5a059] text-white px-8 py-4 shadow-xl hover:bg-[#b08d4a] transition-colors rounded-full uppercase tracking-widest font-semibold text-sm animate-bounce"
      >
        Register for Brochure
      </button>

      <RegisterModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        projectTitle={projectTitle}
      />
    </>
  );
}
