import Image from "next/image";
import Link from "next/link";
import Navlinks from "./NavLinks";

const Header = () => {
const date = new Date().toLocaleDateString("bn-BD", {
dateStyle: "full",
});


return (
    <header className="w-full">
        <div className="mx-auto flex max-w-6xl items-center gap-3 border-b px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-2">
                <Image
                    height={50}
                    width={50}
                    src="/logo-icon.png"
                    alt="bazardor"
                    className="shrink-0"
                />
                <div className="min-w-0">
                    <h2 className="text-xl font-bold sm:text-2xl">
                        বাজার দর
                    </h2>
                    <p className="text-xs text-gray-500">
                        {date}
                    </p>
                </div>
            </div>

            <div className="ml-auto flex shrink-0 gap-2">
                <Link href="/sign-in" className="btn btn-ghost btn-sm sm:btn-md">
                    সাইন ইন
                </Link>
                <Link href="/sign-up" className="btn btn-sm bg-green-700 text-white sm:btn-md">
                    সাইন আপ
                </Link>
            </div>
        </div>

        <Navlinks />
    </header>
);


};

export default Header;
