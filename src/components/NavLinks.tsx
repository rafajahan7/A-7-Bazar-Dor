import Link from "next/link";
import React from "react";

interface Navs{
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}
const Navlinks = async () => {
    const res = await fetch(
        "https://api.abcz.workers.dev/api/bazardor/categories"
    );

    const navs:Navs[] = await res.json();

    return (
        <div className="flex gap-5 justify-center mt-5">
            {navs.map((n, i) => (
                <Link key={i} href={`/category/${n.slug}`}>
                    {n.nameBn}
                    <span>{n.icon}</span>
                </Link>
            ))}
        </div>
    );
};

export default Navlinks;