import Image from 'next/image';
import React from 'react';

const Header = () => {

   const date = new Date().toLocaleDateString("bn-BD", {
  dateStyle: "full",
});

    return (
        <header className="border-t-2">
        <div className="container mx-auto relative h-20 flex items-center px-8 py-3 border-b">

            <div className="flex items-center gap-2">
                <Image
                    height={50}
                    width={50}
                    src={`/logo-icon.png`}
                    alt="bazardor"
                />

                <div>
                    <h2 className="text-2xl font-bold">
                        বাজার দর
                    </h2>

                    <p className="text-xs text-gray-500">
                        {date}
                    </p>
                </div>
            </div>

            {/* Buttons - Right */}
            <div className="ml-auto flex gap-2">
                <button className="btn btn-ghost">
                    সাইন ইন
                </button>

                <button className="btn bg-green-700 text-white">
                    সাইন আপ
                </button>
            </div>

        </div>

        </header>
    );
};

export default Header;