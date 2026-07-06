"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth";

export default function NavBar() {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav
      aria-label="メインナビゲーション"
      className="bg-blue-700 text-white px-6 py-3 flex items-center justify-between"
    >
      <span className="font-bold text-lg">カードアプリ</span>
      <div className="flex items-center gap-6">
        <Link href="/cards" className="hover:underline">
          カード一覧
        </Link>
        <Link href="/transactions" className="hover:underline">
          利用明細
        </Link>
        <Link href="/points" className="hover:underline">
          ポイント交換
        </Link>
        <Link href="/profile" className="hover:underline">
          プロフィール
        </Link>
        <button
          onClick={handleLogout}
          className="bg-white text-blue-700 px-3 py-1 rounded text-sm font-medium hover:bg-blue-50"
        >
          ログアウト
        </button>
      </div>
    </nav>
  );
}
