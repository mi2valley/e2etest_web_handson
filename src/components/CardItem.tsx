import { Card } from "@/lib/types";

interface CardItemProps {
  card: Card;
}

export default function CardItem({ card }: CardItemProps) {
  return (
    <article
      aria-label={`${card.name} カード情報`}
      className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl p-6 shadow-lg"
    >
      <h2 className="text-xl font-bold mb-4">{card.name}</h2>
      <dl className="space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-blue-200">カードブランド</dt>
          <dd className="font-medium">{card.brand}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-blue-200">カード番号末尾</dt>
          <dd className="font-mono">**** {card.lastFour}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-blue-200">今月のご利用額</dt>
          <dd className="font-medium">{card.used.toLocaleString()} 円</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-blue-200">ご利用可能額</dt>
          <dd className="font-medium">
            {(card.limit - card.used).toLocaleString()} 円
          </dd>
        </div>
      </dl>
    </article>
  );
}
