
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function UpdateInformationPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const updatedName = (name ?? session?.user.name ?? "").trim();

    if (!updatedName) {
      toast.error("Please enter your name.");
      return;
    }

    setIsUpdating(true);

    try {
      const { error } = await authClient.updateUser({
        name: updatedName,
      });

      if (error) {
        toast.error(error.message || "Failed to update information.");
        return;
      }

      toast.success("Information updated successfully!");
      router.push("/profile");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isPending) {
    return <p className="p-8 text-center">Loading...</p>;
  }

  if (!session) {
    return (
      <main className="p-8 text-center">
        <p>Please sign in to update your information.</p>

        <Link href="/sign-in" className="btn btn-success mt-4">
          Sign In
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <div className="rounded-xl border border-base-300 bg-base-100 p-6 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold">
          Update Information
        </h1>

        <p className="mb-6 text-sm text-gray-500">
          Update your profile name below.
        </p>

        <form onSubmit={handleUpdate}>
          <label htmlFor="name" className="mb-2 block font-medium">
            Name
          </label>

          <input
            id="name"
            type="text"
            value={name ?? session.user.name ?? ""}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your name"
            className="input input-bordered w-full"
            required
            maxLength={100}
          />

          <button
            type="submit"
            className="btn btn-success mt-6 w-full text-white"
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update Information"}
          </button>
        </form>
      </div>
    </main>
  );
}