"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { Transaction } from "@/lib/types";
import NavBar from "@/components/NavBar";
import transactionsData from "@/data/transactions.json";

type SortKey = "date" | "amount";
type SortDir = "asc" | "desc";

export default function TransactionsPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [currentMonth, setCurrentMonth] = useState("2026-03");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    } else {
      setReady(true);
    }
  }, [router]);

  if (!ready) return null;

  const transactions = transactionsData as Transaction[];

  const filtered = transactions.filter((t) =>
    t.date.startsWith(currentMonth)
  );

  const sorted = [...filtered].sort((a, b) => {
    const mul = sortDir === "asc" ? 1 : -1;
    if (sortKey === "date") {
      return a.date.localeCompare(b.date) * mul;
    }
    return (a.amount - b.amount) * mul;
  });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sortIndicator = (key: SortKey) => {
    if (sortKey !== key) return " ↕";
    return sortDir === "asc" ? " ↑" : " ↓";
  };

  return (
    <>
      <NavBar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <section aria-labelledby="transactions-heading">
          <h1
            id="transactions-heading"
            className="text-2xl font-bold text-gray-800 mb-6"
          >
            利用明細
          </h1>

          <div className="mb-4 flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">表示月</span>
            <div role="group" aria-label="表示月切り替え" className="flex gap-1">
              {[
                { value: "2026-03", label: "2026年3月" },
                { value: "2026-02", label: "2026年2月" },
              ].map((m) => (
                <button
                  key={m.value}
                  onClick={() => setCurrentMonth(m.value)}
                  aria-pressed={currentMonth === m.value}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                    currentMonth === m.value
                      ? "bg-blue-700 text-white border-blue-700"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="w-full text-sm">
              <caption className="sr-only">利用明細一覧</caption>
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left font-medium text-gray-600">
                    <button
                      onClick={() => handleSort("date")}
                      className="hover:text-blue-700"
                    >
                      日付{sortIndicator("date")}
                    </button>
                  </th>
                  <th scope="col" className="px-4 py-3 text-left font-medium text-gray-600">
                    利用先
                  </th>
                  <th scope="col" className="px-4 py-3 text-left font-medium text-gray-600">
                    カテゴリ
                  </th>
                  <th scope="col" className="px-4 py-3 text-right font-medium text-gray-600">
                    <button
                      onClick={() => handleSort("amount")}
                      className="hover:text-blue-700"
                    >
                      金額{sortIndicator("amount")}
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sorted.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-700">{t.date}</td>
                    <td className="px-4 py-3 text-gray-800 font-medium">
                      {t.merchant}
                    </td>
                    <td className="px-4 py-3">
                      <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                        {t.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-800 font-medium">
                      {t.amount.toLocaleString()} 円
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {sorted.length === 0 && (
              <p className="text-gray-500 text-center py-8">
                該当する明細がありません
              </p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
