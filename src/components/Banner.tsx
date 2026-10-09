import Image from "next/image";
import Link from "next/link";

const Banner = () => {
return ( <section className="w-full px-4 pt-5 sm:px-6 lg:px-8"> <div className="card mx-auto w-full max-w-6xl border border-base-200 bg-base-100 shadow-sm"> <div className="card-body flex flex-col items-center justify-between gap-6 p-5 sm:p-6 md:flex-row md:gap-8 md:p-8">


                <div className="w-full min-w-0 flex-1 text-center md:text-left">
                    <span className="badge badge-success badge-outline mb-3 max-w-full">
                        বাজারদর • প্রতিদিনের আপডেট
                    </span>

                    <h1 className="text-2xl font-bold leading-tight text-base-content sm:text-3xl md:text-4xl">
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    <p className="mt-4 mx-auto max-w-xl text-sm leading-6 text-base-content/70 sm:text-base md:mx-0">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                        বাজারের সর্বশেষ দর জানুন সহজেই এক জায়গায়।
                    </p>

                    <div className="mt-5">
                        <Link
                            href="#সব-পণ্য"
                            className="btn btn-success btn-sm text-white sm:btn-md"
                        >
                            সব দাম দেখুন
                        </Link>
                    </div>
                </div>

                <div className="flex w-full min-w-0 flex-1 items-center justify-center md:w-auto">
                    <Image
                        src="/bazar-hero.png"
                        alt="Basket filled with fresh fruits and vegetables"
                        width={280}
                        height={200}
                        priority
                        sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 280px"
                        className="h-auto w-48 max-w-full object-contain sm:w-56 md:w-64"
                    />
                </div>

            </div>
        </div>
    </section>
);


};

export default Banner;
