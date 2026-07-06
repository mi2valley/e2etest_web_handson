# カードアプリ — E2E リグレッションテスト ハンズオン

AI Agent（Bob）がブラウザを自動操作し、E2E リグレッションテストを実行するハンズオン用のダミーアプリです。

---

## 必要なツール

| ツール      | 推奨バージョン | 確認コマンド     |
| ----------- | -------------- | ---------------- |
| **Node.js** | v20 LTS 以上   | `node --version` |
| **npm**     | v10 以上       | `npm --version`  |

上記がインストールされてない場合は[SETUP](./docs/SETUP.md)参照。

---

## アプリの起動

```bash
# 1. 依存パッケージをインストール
npm install

# 2. 開発サーバーを起動
npm run dev
```

ブラウザで `http://localhost:3000` を開くとログイン画面が表示されます。

**テストアカウント**

- メールアドレス: `test@example.com`
- パスワード: `password123`

---

## AI Agent によるテスト実行

Bob で以下のように指示します。

```
@/tests/scenarios/TC-001-login-success.md を読んで、テストを実行してください
```

Bob がブラウザを自動操作し、PASS / FAIL を報告します。

---

## テストシナリオ一覧

| ファイル                                                  | 内容                                             |
| --------------------------------------------------------- | ------------------------------------------------ |
| [TC-001](tests/scenarios/TC-001-login-success.md)         | ログイン成功                                     |
| [TC-002](tests/scenarios/TC-002-card-and-transactions.md) | カード一覧フィルタリング・利用明細ソート・月切替 |
| [TC-003](tests/scenarios/TC-003-point-exchange.md)        | ポイント交換フロー・残高の正確性                 |
| [TC-004](tests/scenarios/TC-004-profile.md)               | プロフィールの電話番号変更                       |

---

## アプリ構成

```
src/
├── app/
│   ├── login/        # ログイン画面
│   ├── cards/        # カード一覧画面
│   ├── transactions/ # 利用明細画面
│   └── points/       # ポイント交換画面
├── components/       # 共通コンポーネント
├── data/             # JSON ダミーデータ
└── lib/              # 型定義・認証ヘルパー
tests/
└── scenarios/        # テストシナリオ Markdown
```

詳細なセットアップ手順は [docs/SETUP.md](docs/SETUP.md) を参照してください。
