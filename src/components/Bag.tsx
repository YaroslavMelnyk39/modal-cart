'use client';

import { IProduct } from '@/app/api/products/route';
import Image from 'next/image';
import React, { useState } from 'react';
import CartModal from './CartModal';

const Bag = ({ products }: { products: IProduct[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (<>
    <button
      className="relative text-3xl"
      onClick={() => setIsModalOpen(true)}
    >
        <Image
            src="/bag.svg"
            alt="Bag Icon"
            width={32}
            height={32}
            priority
        />
      {products.length > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
          {products.length}
        </span>
      )}
    </button>
    {isModalOpen && <CartModal products={products} closeModal={() => setIsModalOpen(false)} />}
  </>);
};

export default Bag;