export interface Card {
  id: string;
  name: string;
  brand: "VISA" | "Mastercard" | "JCB";
  lastFour: string;
  limit: number;
  used: number;
}

export interface Transaction {
  id: string;
  date: string; // "YYYY-MM-DD"
  merchant: string;
  amount: number; // 円
  category: string;
  cardId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  points: number;
  phone: string;
}
