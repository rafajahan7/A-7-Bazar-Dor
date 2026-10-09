"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const SignUpPage = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);

  const handleRegister = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !password) {
      toast.error("সবগুলো ঘর পূরণ করুন");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (error) {
        toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
        return;
      }

      toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এবার লগইন করুন।");
      router.push("/sign-in");
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (
    provider: "google" | "github"
  ) => {
    setSocialLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "সোশ্যাল লগইন ব্যর্থ হয়েছে");
        setSocialLoading(false);
      }
    } catch {
      toast.error("সোশ্যাল লগইন করা যায়নি");
      setSocialLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-base-200 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-2 text-sm text-base-content/60">
            নতুন অ্যাকাউন্ট তৈরি করে বাজারদর দেখুন
          </p>
        </div>

        <div className="card border border-base-300 bg-base-100 shadow-xl">
          <div className="card-body">
            <form onSubmit={handleRegister} className="space-y-3">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">নাম</legend>

                <input
                  type="text"
                  className="input w-full"
                  placeholder="আপনার সম্পূর্ণ নাম"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                  required
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">ইমেইল</legend>

                <input
                  type="email"
                  className="input w-full"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  required
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  পাসওয়ার্ড
                </legend>

                <input
                  type="password"
                  className="input w-full"
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="new-password"
                  minLength={8}
                  required
                />

                <p className="label">
                  কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড দিন।
                </p>
              </fieldset>

              <button
                type="submit"
                className="btn btn-success mt-3 w-full text-white"
                disabled={loading || socialLoading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    অ্যাকাউন্ট তৈরি হচ্ছে...
                  </>
                ) : (
                  "অ্যাকাউন্ট তৈরি করুন"
                )}
              </button>
            </form>

            <div className="divider">অথবা</div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                className="btn btn-outline"
                disabled={loading || socialLoading}
                onClick={() => handleSocialLogin("google")}
              >
                {socialLoading ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  "Google দিয়ে চালিয়ে যান"
                )}
              </button>

              <button
                type="button"
                className="btn btn-outline"
                disabled={loading || socialLoading}
                onClick={() => handleSocialLogin("github")}
              >
                {socialLoading ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  "GitHub দিয়ে চালিয়ে যান"
                )}
              </button>
            </div>

            <p className="mt-4 text-center text-sm">
              অ্যাকাউন্ট আছে?{" "}
              <Link
  href="/sign-in"
  className="link link-success font-semibold"
>
  সাইন ইন করুন
</Link>
            </p>
          </div>
        </div>

        <div className="mt-4 text-center">
          <Link
            href="/"
            className="link link-success text-sm font-semibold"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;