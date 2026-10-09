import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

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
    <div className="w-full overflow-hidden bg-green-50 py-2 sm:py-3">
        <div className="flex w-full items-center gap-4 overflow-hidden whitespace-nowrap px-2 sm:gap-8 sm:px-4">
            <MarqueeText>
                {headlines.map((h) => (
                    <div
                        key={h.id}
                        className="flex shrink-0 items-center gap-1.5 px-2 text-xs sm:gap-2 sm:px-3 sm:text-sm"
                    >
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
    </div>
);


};

export default Marquee;
