"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface InlineRegisterFormProps {
  title?: string;
  description?: string;
  projectTitle: string;
}

export default function InlineRegisterForm({ title, description, projectTitle }: InlineRegisterFormProps) {
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
      if (db) {
          await addDoc(collection(db, "registrations"), {
            name,
            email,
            projectTitle,
            timestamp: serverTimestamp(),
            source: "inline_form"
          });
      }

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, projectTitle }),
      });

      if (!res.ok) throw new Error("Failed to send information");

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to process request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center border-2 border-[#c5a059]/10 p-12 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#c5a059]/5 rounded-bl-full z-0" />
        
        <div className="relative z-10">
          <h2 className="text-3xl font-serif text-slate-900 mb-4">
            {title || "Download Project Brochure"}
          </h2>
          {description && (
            <p className="text-slate-500 mb-10 max-w-xl mx-auto">
              {description}
            </p>
          )}

          {success ? (
            <div className="bg-green-50 text-green-700 p-8 rounded-xl font-medium">
              ✨ Thank you! We have sent the brochure to {email}.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Full Name"
                required
                className="flex-1 px-6 py-4 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#c5a059] outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                className="flex-1 px-6 py-4 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#c5a059] outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-[#0c1a2c] text-white px-8 py-4 rounded-lg hover:bg-slate-800 transition-colors uppercase tracking-widest text-xs font-bold disabled:opacity-50 min-w-[180px]"
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </form>
          )}
          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        </div>
      </div>
    </section>
  );
}
