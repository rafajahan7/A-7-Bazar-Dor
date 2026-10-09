
"use client";

import { useMemo, useState } from "react";
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

type SortOption = "default" | "low" | "high";

export default function CategoryProductList({
  products,
}: {
  products: Product[];
}) {
  const [sort, setSort] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const list = [...products];

    if (sort === "low") {
      list.sort((a, b) => a.today - b.today);
    } else if (sort === "high") {
      list.sort((a, b) => b.today - a.today);
    }

    return list;
  }, [products, sort]);

  return (
    <section>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-500">
          মোট {products.length.toLocaleString("bn-BD")}টি পণ্য
        </p>

        <label className="flex items-center gap-3">
          <span className="shrink-0 text-sm font-medium">
            সাজান:
          </span>

          <select
            value={sort}
            onChange={(event) =>
              setSort(event.target.value as SortOption)
            }
            className="w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:border-green-600 sm:w-auto"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

