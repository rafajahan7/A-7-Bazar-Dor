const ProductSkeleton = () => {
return ( <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
{[1, 2, 3].map((section) => ( <section key={section}> <div className="skeleton mb-4 h-6 w-40"></div>


                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="rounded-xl border border-base-200 p-4"
                        >
                            <div className="skeleton h-5 w-3/4"></div>
                            <div className="skeleton mt-4 h-4 w-1/2"></div>
                            <div className="skeleton mt-4 h-8 w-1/3"></div>
                            <div className="skeleton mt-4 h-4 w-full"></div>
                        </div>
                    ))}
                </div>
            </section>
        ))}
    </div>
);


};

export default ProductSkeleton;
