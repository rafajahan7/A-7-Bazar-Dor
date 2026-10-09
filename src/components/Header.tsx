

import Image from 'next/image';
import React from 'react';
import Navlinks from './NavLinks';
import Link from 'next/link';


const Header = () => {

    {/*const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });*/}

    return (
        <header>
        <div className="flex items-center px-8 py-3 border-b">

            <div className="flex items-center gap-2">
                <Image
                    height={50}
                    width={50}
                    src="/logo-icon.png"
                    alt="bazardor"
                />

                <div>
                    <h2 className="text-2xl font-bold">
                        বাজার দর
                    </h2>

                    <p className="text-xs text-gray-500">
                       {/*{date}*/} 
                    </p>
                </div>
            </div>

            <div className="ml-auto flex gap-2">
                <Link href={'/sign-in'}><button className="btn btn-ghost">
                    সাইন ইন
                </button></Link>

                <Link href={'/sign-up'}><button className="btn bg-green-700 text-white">
                    সাইন আপ
                </button></Link>
            </div>

        </div>

        <Navlinks/>
        </header>
    );
};

export default Header;