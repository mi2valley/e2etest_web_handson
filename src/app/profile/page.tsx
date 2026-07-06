"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import NavBar from "@/components/NavBar";
import userData from "@/data/user.json";

export default function ProfilePage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [phone, setPhone] = useState(userData.phone);
  const [editing, setEditing] = useState(false);
  const [newPhone, setNewPhone] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    } else {
      setReady(true);
    }
  }, [router]);

  if (!ready) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhone.trim()) return;
    setPhone(newPhone.trim());
    setEditing(false);
    setNewPhone("");
    setSaved(true);
  };

  return (
    <>
      <NavBar />
      <main className="max-w-lg mx-auto px-4 py-8">
        <section aria-labelledby="profile-heading">
          <h1
            id="profile-heading"
            className="text-2xl font-bold text-gray-800 mb-6"
          >
            プロフィール
          </h1>

          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <dl className="space-y-3">
              <div>
                <dt className="text-sm text-gray-500">お名前</dt>
                <dd className="text-gray-800 font-medium">{userData.name}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">メールアドレス</dt>
                <dd className="text-gray-800 font-medium">{userData.email}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">電話番号</dt>
                <dd className="text-gray-800 font-medium">{phone}</dd>
              </div>
            </dl>

            {saved && (
              <p role="status" className="text-green-700 text-sm font-medium">
                電話番号を更新しました
              </p>
            )}

            {!editing ? (
              <button
                onClick={() => {
                  setEditing(true);
                  setNewPhone("");
                  setSaved(false);
                }}
                className="text-sm text-blue-700 hover:underline"
              >
                電話番号を変更する
              </button>
            ) : (
              <form onSubmit={handleSave} className="space-y-3">
                <div>
                  <label
                    htmlFor="new-phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    新しい電話番号
                  </label>
                  <input
                    id="new-phone"
                    type="tel"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="例: 080-9876-5432"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800"
                  >
                    保存する
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(false);
                      setNewPhone("");
                    }}
                    className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50"
                  >
                    キャンセル
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
