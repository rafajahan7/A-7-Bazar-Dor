
import ProductCard from "@/components/ProductsCard";

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
};

const API_URL =
  "https://api.abcz.workers.dev/api/bazardor/products";

export default async function ProductSections() {
  let products: Product[] = [];

  try {
    const response = await fetch(API_URL, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const result = await response.json();

    products = Array.isArray(result)
      ? result
      : result.products ?? result.data ?? [];
  } catch {
    return (
      <p className="mx-auto max-w-6xl px-4 py-8 text-red-600">
        পণ্যের তথ্য লোড করা যায়নি।
      </p>
    );
  }

  // Section A: Biggest price increases
  const increased = products
    .filter((product) => product.change?.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  // Section B: Biggest price decreases
  const decreased = products
    .filter((product) => product.change?.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8">
      {/* Section A */}
      <section>
        <h2 className="mb-4 text-lg font-bold">
          <span className="text-red-500">▲</span>{" "}
          আজ দাম বেড়েছে
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {increased.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Section B */}
      <section>
        <h2 className="mb-4 text-lg font-bold">
          <span className="text-green-600">▼</span>{" "}
          আজ দাম কমেছে
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {decreased.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Section C */}
      <section>
        <h2 className="text-lg font-bold">সব পণ্য</h2>

        <p className="mb-4 mt-1 text-sm text-gray-500">
          নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর এক নজরে
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

