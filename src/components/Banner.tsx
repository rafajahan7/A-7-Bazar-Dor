
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
    return (
        <section className="px-4 pt-5">
            <div className="card bg-base-100 border border-base-200 shadow-sm max-w-6xl mx-auto">
                <div className="card-body flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-8">

                    {/* Left side: Text and button */}
                    <div className="flex-1 text-center md:text-left">
                        <span className="badge badge-success badge-outline mb-3">
                            বাজারদর • প্রতিদিনের আপডেট
                        </span>

                        <h1 className="text-2xl md:text-4xl font-bold text-base-content leading-tight">
                            আজকের বাজারের দাম এক নজরে
                        </h1>

                        <p className="text-sm text-base-content/70 mt-4 max-w-xl">
                            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                            বাজারের সর্বশেষ দর জানুন সহজেই এক জায়গায়।
                        </p>

                        <div className="mt-5">
                            <Link
                                href="#সব-পণ্য"
                                className="btn btn-success btn-sm text-white"
                            >
                                সব দাম দেখুন
                            </Link>
                        </div>
                    </div>

                    {/* Right side: Banner image */}
                    <div className="flex-1 flex justify-center items-center">
                        <Image
                            src="/bazar-hero.png"
                            alt="Basket filled with fresh fruits and vegetables"
                            width={280}
                            height={200}
                            priority
                            className="w-48 md:w-64 h-auto object-contain"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Banner;