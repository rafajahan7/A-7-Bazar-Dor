
import Link from "next/link";

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  change: {
    dir: string;
    pct: number;
  };
};

export default function ProductsCard({
  product,
}: {
  product: Product;
}) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  const arrow = isUp ? "▲" : isDown ? "▼" : "—";

  const badgeColor = isUp
    ? "bg-red-100 text-red-600"
    : isDown
    ? "bg-green-100 text-green-600"
    : "bg-gray-100 text-gray-500";

  const unitName: Record<string, string> = {
    kg: "প্রতি কেজি",
    liter: "প্রতি লিটার",
    litre: "প্রতি লিটার",
    piece: "প্রতি পিস",
    dozen: "প্রতি ডজন",
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="block h-full"
    >
      <div className="card h-full border border-base-200 bg-base-100 shadow-sm transition hover:shadow-md">
        <div className="card-body gap-3 p-4">

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-base-200 text-2xl">
              {product.image || "🛒"}
            </div>

            <div>
              <h3 className="font-bold">{product.nameBn}</h3>
              <p className="text-xs text-base-content/60">
                {unitName[product.unit] || `প্রতি ${product.unit}`}
              </p>
            </div>
          </div>

          <div className="mt-2 flex items-end justify-between gap-2">
            <div>
              <p className="mb-1 text-xs text-base-content/60">
                আজকের দাম
              </p>

              <p className="text-lg font-bold">
                {product.today.toLocaleString("bn-BD")} টাকা
              </p>
            </div>

            <span className={`badge border-0 ${badgeColor}`}>
              {arrow}{" "}
              {Math.abs(product.change.pct).toLocaleString("bn-BD", {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              })}
              %
            </span>
          </div>

        </div>
      </div>
    </Link>
  );
}