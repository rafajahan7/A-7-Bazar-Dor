
import Link from "next/link";
import CategoryProductList from "@/components/CategoryProductList";

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
  markets?: Market[];
};

const API_URL =
  "https://api.abcz.workers.dev/api/bazardor/products";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let products: Product[];

  try {
    const response = await fetch(
      `${API_URL}?category=${encodeURIComponent(slug)}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const result = await response.json();

    products = Array.isArray(result)
      ? result
      : result.products ?? result.data ?? [];
  } catch {
    return (
      <main className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-xl font-bold">
          পণ্যের তথ্য লোড করা যায়নি।
        </h1>
        <Link
          href="/"
          className="mt-5 inline-flex rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700"
        >
          হোম পেজে ফিরে যান
        </Link>
      </main>
    );
  }

  
  products = products.filter(
    (product) => product.category === slug
  );

  if (products.length === 0) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16 text-center">
        <div className="text-5xl">🔎</div>
        <h1 className="mt-4 text-2xl font-bold">
          কোনো পণ্য পাওয়া যায়নি
        </h1>
        <p className="mt-2 text-gray-500">
          এই ক্যাটাগরিতে কোনো পণ্য নেই অথবা ক্যাটাগরিটি সঠিক নয়।
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700"
        >
          হোম পেজে ফিরে যান
        </Link>
      </main>
    );
  }

  const category = products[0];

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-8">
      <header className="rounded-2xl border bg-white p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-green-50 text-4xl">
            {category.categoryIcon || "🛒"}
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              {category.categoryNameBn}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              এই ক্যাটাগরির সব পণ্যের আজকের বাজারদর
            </p>
          </div>
        </div>
      </header>

      <CategoryProductList products={products} />
    </main>
  );
}

