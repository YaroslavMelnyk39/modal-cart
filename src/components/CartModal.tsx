'use client';

import React, { useState } from 'react';
import { IProduct } from '@/app/api/products/route';
import Image from 'next/image';

type ICartItem = IProduct & {
    quantity: number;
};

const CartModal = ({ products, closeModal }: { products: IProduct[], closeModal: () => void }) => {
    const [cartItems, setCartItems] = useState<ICartItem[]>(products.map(product => ({ ...product, quantity: 1 })));

    const changeProductQuantity = (id: string, increase: boolean) => {
        setCartItems((prev) =>
            prev
                .map((product) => {
                    if (product.id === id) {
                        const newQuantity = increase ? product.quantity + 1 : product.quantity - 1;
                        return { ...product, quantity: newQuantity };
                    }
                    return product;
                })
                .filter((product) => product.quantity > 0)
        );
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50"
            onClick={closeModal}
        >
            <div
                className="relative w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-semibold">Your shopping cart</h2>
                    <button
                        className="text-gray-400 hover:text-gray-500"
                        onClick={closeModal}
                    >
                        <span className="text-2xl">&times;</span>
                    </button>
                </div>

                <div className="flex flex-col divide-y">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-4">
                            <div className="flex items-center space-x-4">
                                <Image src={item.imageUrl} alt={item.name} height={16} width={16} className="w-16 h-16 object-cover rounded" />
                                <div>
                                    <h3 className="text-sm font-medium">{item.name}</h3>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button onClick={() => changeProductQuantity(item.id, false)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => changeProductQuantity(item.id, true)}>+</button>
                                <p className="font-medium w-[130px] text-right">
                                    {item.sale ? <span className='mr-2 text-red-600 line-through'>€{(item.price * (100 + item.sale) / 100 * item.quantity).toFixed(2)}</span> : null}
                                    {`€${(item.price * item.quantity).toFixed(2)}`}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-between items-center p-4 font-semibold border-t">
                    <span>Total</span>
                    <span>{'€'+cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</span>
                </div>

                <div className="p-4">
                    <button
                        className="w-full px-4 py-2 text-white bg-black rounded hover:bg-gray-700"
                        onClick={() => {/* Order handling logic here */}}
                    >
                        Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartModal;
