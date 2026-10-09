type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  image: string;
  unit: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: Market[];
};

const API_URL =
  "https://api.abcz.workers.dev/api/bazardor/products";

function formatPrice(price: number) {
  return `${price.toLocaleString("bn-BD")} টাকা`;
}

function getUnit(unit: string) {
  const units: Record<string, string> = {
    kg: "প্রতি কেজি",
    liter: "প্রতি লিটার",
    litre: "প্রতি লিটার",
    piece: "প্রতি পিস",
    dozen: "প্রতি ডজন",
  };

  return units[unit] ?? `প্রতি ${unit}`;
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const response = await fetch(API_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch product details");
  }

  const result = await response.json();

  const products: Product[] = Array.isArray(result)
    ? result
    : result.products ?? result.data ?? [];

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-xl font-bold">
          পণ্যটি খুঁজে পাওয়া যায়নি
        </h1>
      </main>
    );
  }

  const markets = product.markets ?? [];

  const minPrice =
    markets.length > 0
      ? Math.min(...markets.map((market) => market.min))
      : product.today;

  const maxPrice =
    markets.length > 0
      ? Math.max(...markets.map((market) => market.max))
      : product.today;

  // Average of the midpoint of each market's price range
  const averagePrice =
    markets.length > 0
      ? Math.round(
          markets.reduce(
            (sum, market) => sum + (market.min + market.max) / 2,
            0
          ) / markets.length
        )
      : product.today;

  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-8">
      {/* Product summary */}
      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100 text-4xl">
            {product.image || product.categoryIcon || "🛒"}
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              {product.nameBn}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              বিভিন্ন বাজারের আজকের দামের সারসংক্ষেপ
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
                {product.categoryNameBn}
              </span>

              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                {getUnit(product.unit)}
              </span>
            </div>
          </div>

          <div className="rounded-xl bg-gray-50 p-4 sm:text-right">
            <p className="text-sm text-gray-500">আজকের দাম</p>
            <p className="text-2xl font-bold">
              {formatPrice(product.today)}
            </p>
          </div>
        </div>
      </section>

      {/* Price summary */}
      <section>
        <h2 className="mb-4 text-xl font-bold">
          আজকের দামের সারসংক্ষেপ
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-green-200 bg-green-50 p-5">
            <p className="text-sm text-gray-600">সর্বনিম্ন দাম</p>
            <p className="mt-2 text-2xl font-bold text-green-700">
              {formatPrice(minPrice)}
            </p>
          </div>

          <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
            <p className="text-sm text-gray-600">গড় দাম</p>
            <p className="mt-2 text-2xl font-bold text-blue-700">
              {formatPrice(averagePrice)}
            </p>
          </div>

          <div className="rounded-xl border border-red-200 bg-red-50 p-5">
            <p className="text-sm text-gray-600">সর্বোচ্চ দাম</p>
            <p className="mt-2 text-2xl font-bold text-red-700">
              {formatPrice(maxPrice)}
            </p>
          </div>
        </div>
      </section>

      {/* Market prices */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl font-bold">
            বাজারভিত্তিক আজকের দাম
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            বিভিন্ন বাজারে {product.nameBn}-এর দাম
          </p>
        </div>

        {markets.length === 0 ? (
          <div className="rounded-xl border p-6 text-gray-500">
            এই পণ্যের বাজারভিত্তিক দাম পাওয়া যায়নি।
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-5 py-4 font-semibold">
                    বাজার
                  </th>
                  <th className="px-5 py-4 font-semibold">
                    বিভাগ
                  </th>
                  <th className="px-5 py-4 font-semibold">
                    সর্বনিম্ন
                  </th>
                  <th className="px-5 py-4 font-semibold">
                    সর্বোচ্চ
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {markets.map((market, index) => (
                  <tr
                    key={`${market.market}-${index}`}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-5 py-4 font-medium">
                      {market.market}
                    </td>
                    <td className="px-5 py-4 text-gray-600">
                      {market.division}
                    </td>
                    <td className="px-5 py-4 font-semibold text-green-700">
                      {formatPrice(market.min)}
                    </td>
                    <td className="px-5 py-4 font-semibold text-red-700">
                      {formatPrice(market.max)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}