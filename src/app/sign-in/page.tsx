
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const SignInPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);

  const handleLogin = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!email.trim() || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড দিন");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email: email.trim(),
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "লগইন করা যায়নি");
        return;
      }

      toast.success("সফলভাবে লগইন হয়েছে!");
      router.push("/");
      router.refresh();
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
          <h1 className="text-3xl font-bold">সাইন ইন</h1>

          <p className="mt-2 text-sm text-base-content/60">
            আপনার অ্যাকাউন্টে লগইন করে বাজারদর দেখুন
          </p>
        </div>

        <div className="card border border-base-300 bg-base-100 shadow-xl">
          <div className="card-body">
            <form onSubmit={handleLogin} className="space-y-3">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  ইমেইল
                </legend>

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
                  placeholder="আপনার পাসওয়ার্ড দিন"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                />
              </fieldset>

              <button
                type="submit"
                className="btn btn-success mt-3 w-full text-white"
                disabled={loading || socialLoading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    লগইন হচ্ছে...
                  </>
                ) : (
                  "সাইন ইন"
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
                Google দিয়ে চালিয়ে যান
              </button>

              <button
                type="button"
                className="btn btn-outline"
                disabled={loading || socialLoading}
                onClick={() => handleSocialLogin("github")}
              >
                GitHub দিয়ে চালিয়ে যান
              </button>
            </div>

            <p className="mt-4 text-center text-sm">
              অ্যাকাউন্ট নেই?{" "}
              <Link
                href="/signup"
                className="link link-success font-semibold"
              >
                অ্যাকাউন্ট তৈরি করুন
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

export default SignInPage;

