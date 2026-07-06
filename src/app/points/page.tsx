"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import NavBar from "@/components/NavBar";
import ConfirmDialog from "@/components/ConfirmDialog";
import userData from "@/data/user.json";

export default function PointsPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [points, setPoints] = useState(userData.points);
  const [inputPoints, setInputPoints] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    } else {
      setReady(true);
    }
  }, [router]);

  if (!ready) return null;

  const handleExchangeRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(inputPoints);
    if (!inputPoints || isNaN(val) || val <= 0) {
      setError("交換ポイント数を入力してください");
      return;
    }
    if (val > points) {
      setError("保有ポイントを超えています");
      return;
    }
    if (val < 100) {
      setError("100ポイント以上から交換できます");
      return;
    }
    setError("");
    setDialogOpen(true);
  };

  const handleConfirm = () => {
    setPoints((prev) => prev - Number(inputPoints));
    setDialogOpen(false);
    setCompleted(true);
  };

  return (
    <>
      <NavBar />
      <main className="max-w-lg mx-auto px-4 py-8">
        <section aria-labelledby="points-heading">
          <h1
            id="points-heading"
            className="text-2xl font-bold text-gray-800 mb-6"
          >
            ポイント交換
          </h1>

          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <p className="text-sm text-gray-500 mb-1">現在の保有ポイント</p>
            <p className="text-3xl font-bold text-blue-700">
              <strong>{points.toLocaleString()}</strong>{" "}
              <span className="text-lg font-normal text-gray-600">ポイント</span>
            </p>
          </div>

          {!completed ? (
            <div className="bg-white rounded-xl shadow p-6">
              <form onSubmit={handleExchangeRequest} className="space-y-4">
                <div>
                  <label
                    htmlFor="exchange-points"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    交換ポイント数
                  </label>
                  <input
                    id="exchange-points"
                    type="number"
                    min="100"
                    max={points}
                    value={inputPoints}
                    onChange={(e) => setInputPoints(e.target.value)}
                    placeholder="例: 500"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {error && (
                    <p role="alert" className="text-red-600 text-sm mt-1">
                      {error}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-700 text-white py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors"
                >
                  交換する
                </button>
              </form>
              <p className="text-xs text-gray-400 mt-3">
                ※ 100ポイント以上から交換可能です
              </p>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <p role="status" className="text-green-700 font-bold text-lg mb-2">
                交換が完了しました
              </p>
              <p className="text-gray-600 text-sm mb-4">
                {Number(inputPoints).toLocaleString()} ポイントを交換しました
              </p>
              <p className="text-gray-800">
                残ポイント:{" "}
                <strong className="text-blue-700">
                  {points.toLocaleString()} ポイント
                </strong>
              </p>
              <button
                onClick={() => {
                  setCompleted(false);
                  setInputPoints("");
                }}
                className="mt-4 text-sm text-blue-700 hover:underline"
              >
                続けて交換する
              </button>
            </div>
          )}
        </section>
      </main>

      {dialogOpen && (
        <ConfirmDialog
          message={`${Number(inputPoints).toLocaleString()}ポイントを交換します。よろしいですか？`}
          onConfirm={handleConfirm}
          onCancel={() => setDialogOpen(false)}
        />
      )}
    </>
  );
}
