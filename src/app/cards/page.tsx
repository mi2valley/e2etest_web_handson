"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { Card } from "@/lib/types";
import CardItem from "@/components/CardItem";
import NavBar from "@/components/NavBar";
import cardsData from "@/data/cards.json";

type BrandFilter = "ALL" | "VISA" | "Mastercard" | "JCB";

export default function CardsPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [activeFilter, setActiveFilter] = useState<BrandFilter>("ALL");

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    } else {
      setReady(true);
    }
  }, [router]);

  if (!ready) return null;

  const cards = cardsData as Card[];
  const filteredCards =
    activeFilter === "ALL"
      ? cards
      : cards.filter((c) => c.brand === activeFilter);

  const filters: { label: string; value: BrandFilter }[] = [
    { label: "すべて", value: "ALL" },
    { label: "VISA", value: "VISA" },
    { label: "Mastercard", value: "Mastercard" },
    { label: "JCB", value: "JCB" },
  ];

  return (
    <>
      <NavBar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <section aria-labelledby="cards-heading">
          <h1 id="cards-heading" className="text-2xl font-bold text-gray-800 mb-6">
            カード一覧
          </h1>

          <div
            role="group"
            aria-label="ブランドフィルター"
            className="flex gap-3 mb-8"
          >
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                aria-pressed={activeFilter === f.value}
                className={`px-6 py-3 rounded-full text-sm font-medium border transition-colors ${
                  activeFilter === f.value
                    ? "bg-blue-700 text-white border-blue-700"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <ul aria-label="カードリスト" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCards.map((card) => (
              <li key={card.id}>
                <CardItem card={card} />
              </li>
            ))}
          </ul>

          {filteredCards.length === 0 && (
            <p className="text-gray-500 text-center py-8">
              該当するカードがありません
            </p>
          )}
        </section>
      </main>
    </>
  );
}
