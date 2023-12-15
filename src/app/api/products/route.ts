import { NextResponse } from "next/server";

export interface IProduct {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  sale?: number;
}

const products: IProduct[] = [
    {
      id: '1',
      name: 'Ekster Senate Cardholder',
      price: 48.30,
      sale: 40,
      imageUrl: '/product_1.svg',
      description: 'A sleek and secure cardholder for everyday use.'
    },
    {
      id: '2',
      name: 'MOFT Universal Laptop Stand',
      price: 29.99,
      imageUrl: '/product_2.svg',
      description: 'A portable and adjustable laptop stand for comfortable working.'
    },
];

export async function GET() {
  return NextResponse.json({ products }, { status: 200 });
}