import { Suspense } from "react";
import Link from "next/link";

interface Navs {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

async function NavLinksContent() {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const navs: Navs[] = await res.json();

  return (
    <div className="mt-5 w-full overflow-x-auto">
      <div className="mx-auto flex w-max min-w-full max-w-6xl items-center justify-center gap-3 px-4 pb-2 sm:gap-5 sm:px-6 lg:px-8">
        {navs.map((n) => (
          <Link
            key={n.id}
            href={`/category/${n.slug}`}
            className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded-md px-2 py-2 text-sm transition-colors hover:bg-gray-100 sm:px-3 sm:text-base"
          >
            {n.nameBn}
            <span>{n.icon}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Navlinks() {
  return (
    <Suspense
      fallback={
        <div className="mt-5 px-4 py-3 text-sm text-gray-500">
          ক্যাটাগরি লোড হচ্ছে...
        </div>
      }
    >
      <NavLinksContent />
    </Suspense>
  );
}