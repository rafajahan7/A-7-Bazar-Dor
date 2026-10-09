const Footer = () => {
return ( <footer className="border-t border-gray-200 bg-white"> <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">


            {/* Left side */}
            <p className="text-sm font-semibold text-gray-800">
                বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </p>

            {/* Right side */}
            <p className="text-sm text-gray-500">
                সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
            </p>

        </div>
    </footer>
);


};

export default Footer;
