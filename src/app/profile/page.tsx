
"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <p className="p-8 text-center">Loading profile...</p>;
  }

  if (!session) {
    return (
      <main className="p-8 text-center">
        <p>Please sign in to view your profile.</p>
        <Link href="/sign-in" className="btn btn-success mt-4">
          Sign In
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <div className="rounded-xl border border-base-300 bg-base-100 p-6 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold">My Profile</h1>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{session.user.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{session.user.email}</p>
          </div>
        </div>

        <Link
          href="/profile/update"
          className="btn btn-success mt-6 text-white"
        >
          Update
        </Link>
      </div>
    </main>
  );
}