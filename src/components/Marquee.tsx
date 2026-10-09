
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"

interface IProduct {
    id: number;
    slug: string;
    nameBn: string;
    unit: string;
    categoryIcon: string;
    today: number;
    change: {
        dir: string;
        pct: number;
    };
}

const Marquee = async () => {
    const res = await fetch(
        "https://api.abcz.workers.dev/api/bazardor/products"
    );

    const data = await res.json();

    const headlines: IProduct[] = Array.isArray(data)
        ? data
        : data.data || [];

    return (
        <div className="flex gap-8 overflow-hidden whitespace-nowrap bg-green-50 py-3">
            <MarqueeText>{headlines.map((h) => (
                <div key={h.id} className="flex items-center gap-2">
                    <span>{h.categoryIcon}</span>

                    <span className="font-medium">
                        {h.nameBn}
                    </span>

                    <span className="font-bold">
                        ৳{h.today}/{h.unit}
                    </span>

                    <span
                        className={
                            h.change.dir === "up"
                                ? "text-red-600"
                                : h.change.dir === "down"
                                ? "text-green-600"
                                : "text-gray-500"
                        }
                    >
                        {h.change.dir === "up"
                            ? "↑"
                            : h.change.dir === "down"
                            ? "↓"
                            : "→"}{" "}
                        {h.change.pct}%
                    </span>
                </div>
            ))}
            </MarqueeText>
        </div>
    );
};

export default Marquee;