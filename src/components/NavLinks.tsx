import Link from "next/link";
import React from "react";

const Navlinks = async () => {
    const res = await fetch(
        "https://api.abcz.workers.dev/api/bazardor/categories"
    );

    const navs = await res.json();

    return (
        <div className="flex gap-5 justify-center mt-5">
            {navs.map((n: any, i: number) => (
                <Link key={i} href={`/category/${n.slug}`}>
                    {n.nameBn}
                    <span>{n.icon}</span>
                </Link>
            ))}
        </div>
    );
};

export default Navlinks;