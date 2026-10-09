import Link from "next/link";
import React from "react";

interface Navs {
id: string;
slug: string;
nameBn: string;
icon: string;
}

const Navlinks = async () => {
const res = await fetch(
"https://api.abcz.workers.dev/api/bazardor/categories"
);


const navs: Navs[] = await res.json();

return (
    <div className="mt-5 w-full overflow-x-auto">
        <div className="mx-auto flex w-max min-w-full max-w-6xl items-center justify-center gap-3 px-4 pb-2 sm:gap-5 sm:px-6 lg:px-8">
            {navs.map((n, i) => (
                <Link
                    key={i}
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


};

export default Navlinks;
