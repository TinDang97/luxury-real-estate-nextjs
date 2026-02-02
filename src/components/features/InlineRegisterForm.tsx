"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface InlineRegisterFormProps {
  title?: string;
  description?: string;
  projectTitle: string;
}

export default function InlineRegisterForm({ title, description, projectTitle }: InlineRegisterFormProps) {
  const t = useTranslations("RegisterForm");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email || undefined, name, phone, projectTitle }),
      });

      if (!res.ok) throw new Error("Failed to send information");

      setSuccess(true);
      // Reset form
      setTimeout(() => {
        setSuccess(false);
        setName("");
        setPhone("");
        setEmail("");
      }, 5000);
    } catch (err: any) {
      setError(err.message || "Failed to process request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Form */}
          <div className="bg-white border-2 border-[#c5a059]/10 p-6 sm:p-10 rounded-2xl shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-serif text-slate-900 mb-3">
              {title || t("title")}
            </h2>
            <p className="text-slate-600 mb-8">
              {description || t("description")}
            </p>

            {success ? (
              <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-6 rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <div>
                    <p className="font-semibold mb-1">{t("successTitle")}</p>
                    <p className="text-sm">{t("successMessage")}</p>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-600 mb-2 font-semibold">
                    {t("nameLabel")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder={t("namePlaceholder")}
                    required
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#c5a059] focus:border-[#c5a059] outline-none transition-all"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-600 mb-2 font-semibold">
                    {t("phoneLabel")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder={t("phonePlaceholder")}
                    required
                    pattern="[0-9]{10,11}"
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#c5a059] focus:border-[#c5a059] outline-none transition-all"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <p className="text-xs text-slate-500 mt-1">{t("phoneHelper")}</p>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-600 mb-2 font-semibold">
                    {t("emailLabel")} <span className="text-slate-400">({t("optional")})</span>
                  </label>
                  <input
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#c5a059] focus:border-[#c5a059] outline-none transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded">
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0c1a2c] text-white px-8 py-4 rounded-lg hover:bg-slate-800 transition-all uppercase tracking-widest text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {loading ? t("sending") : t("submitButton")}
                </button>
              </form>
            )}
          </div>

          {/* Right: Contact Options */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-serif text-slate-900 mb-4">{t("contactTitle")}</h3>
              <p className="text-sm sm:text-base text-slate-600 mb-6">{t("contactDescription")}</p>
            </div>

            <div className="space-y-4">
              {/* Zalo */}
              <a
                href="https://zalo.me/0906113111"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 bg-white border-2 border-slate-200 rounded-xl hover:border-[#0180C7] hover:shadow-lg transition-all group"
              >
                <div className="w-14 h-14 rounded-full bg-[#0180C7] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.83 1.324 5.358 3.4 7.16l-.744 2.743c-.067.246.172.455.408.357l3.192-1.327c1.169.458 2.458.71 3.744.71 5.523 0 10-4.145 10-9.243C22 6.145 17.523 2 12 2zm.5 12.5h-1v-5h1v5zm0-6h-1V7h1v1.5z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 mb-1">{t("zaloTitle")}</p>
                  <p className="text-sm text-slate-600">0906 113 111</p>
                </div>
                <svg className="w-5 h-5 text-slate-400 group-hover:text-[#0180C7] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>

              {/* KakaoTalk */}
              <a
                href="https://qr.kakao.com/talk/p/0932120293"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 bg-white border-2 border-slate-200 rounded-xl hover:border-[#FEE500] hover:shadow-lg transition-all group"
              >
                <div className="w-14 h-14 rounded-full bg-[#FEE500] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-[#3A1D1D]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.707 4.8 4.33 6.108l-.873 3.195c-.095.35.31.62.58.44l3.76-2.486c.068.006.136.008.203.008 4.97 0 9-3.185 9-7.115S16.97 3 12 3z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 mb-1">{t("kakaoTitle")}</p>
                  <p className="text-sm text-slate-600">0932 120 293</p>
                </div>
                <svg className="w-5 h-5 text-slate-400 group-hover:text-[#FEE500] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=61570954898524"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 bg-white border-2 border-slate-200 rounded-xl hover:border-[#1877F2] hover:shadow-lg transition-all group"
              >
                <div className="w-14 h-14 rounded-full bg-[#1877F2] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 mb-1">{t("facebookTitle")}</p>
                  <p className="text-sm text-slate-600">{t("facebookDescription")}</p>
                </div>
                <svg className="w-5 h-5 text-slate-400 group-hover:text-[#1877F2] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>

              {/* Phone */}
              <a
                href="tel:0906113111"
                className="flex items-center gap-4 p-5 bg-white border-2 border-slate-200 rounded-xl hover:border-[#c5a059] hover:shadow-lg transition-all group"
              >
                <div className="w-14 h-14 rounded-full bg-[#c5a059] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 mb-1">{t("hotlineTitle")}</p>
                  <p className="text-sm text-slate-600">0906 113 111</p>
                </div>
                <svg className="w-5 h-5 text-slate-400 group-hover:text-[#c5a059] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            <p className="text-xs text-slate-500 text-center pt-4 border-t border-slate-200">
              {t("workingHours")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
