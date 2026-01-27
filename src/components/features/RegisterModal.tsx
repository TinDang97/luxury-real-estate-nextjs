"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
}

export default function RegisterModal({ isOpen, onClose, projectTitle }: RegisterModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Save to Firestore (Capture User Information)
      if (db) {
          await addDoc(collection(db, "registrations"), {
            name,
            email,
            projectTitle,
            timestamp: serverTimestamp(),
            source: "brochure_request"
          });
      } else {
          console.warn("Firebase Firestore is not initialized. Skipping DB save.");
          // We proceed with the email automation even if DB save fails/is not configured
      }

      // 2. Trigger Automation (Resend Email)
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, projectTitle }),
      });

      if (!res.ok) throw new Error("Failed to send brochure");

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-white p-8 shadow-2xl rounded-sm border-t-4 border-[#c5a059]"
          >
            {success ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-2xl font-serif text-slate-900 mb-2">Thank You!</h3>
                <p className="text-slate-600 mb-6">
                  We have received your interest. Check your email ({email}) for the {projectTitle} information.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-serif text-slate-900 mb-2">
                  Learn More
                </h2>
                <p className="text-sm text-slate-500 mb-6">
                  Register to receive exclusive information and news about {projectTitle}.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full border-b border-slate-300 py-2 focus:outline-none focus:border-[#c5a059] transition-colors bg-transparent"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full border-b border-slate-300 py-2 focus:outline-none focus:border-[#c5a059] transition-colors bg-transparent"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {error && <p className="text-red-500 text-xs">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#0c1a2c] text-white py-3 hover:bg-[#1a2f47] transition-all disabled:opacity-50 mt-4 uppercase tracking-widest text-sm"
                  >
                    {loading ? "Sending..." : "Receive Information"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
