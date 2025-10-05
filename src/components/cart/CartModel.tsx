"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import { useCart } from "./CartContext";


interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
    size?: "compact" | "default" | "responsive";
    overlay?: boolean;
}

const CartModal = ({ isOpen, onClose, size = "responsive", overlay = false }: CartModalProps) => {
    const { items, subtotal, shipping, total, updateQuantity, removeItem } = useCart();

    // Outside click close when overlay is false
    const panelRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (!isOpen || overlay) return;
        const onDown = (e: MouseEvent) => {
            if (!panelRef.current) return;
            if (panelRef.current.contains(e.target as Node)) return;
            onClose();
        };
        document.addEventListener("mousedown", onDown);
        return () => document.removeEventListener("mousedown", onDown);
    }, [isOpen, overlay, onClose]);

    const itemCount = useMemo(() => items.reduce((a, it) => a + it.quantity, 0), [items]);

    if (!isOpen) return null;

    const widthClass = size === "responsive" ? "w-80 xl:w-96" : size === "compact" ? "w-80" : "w-96";

    return (
        <>
            {overlay && (
                <div
                    className="fixed inset-0 z-40 bg-black/40"
                    onClick={onClose}
                />
            )}

            {/* Mini-cart Dropdown */}
            <div ref={panelRef} className={`fixed top-16 right-4 ${widthClass} max-h-[80vh] bg-white border border-border rounded-lg shadow-xl z-50 flex flex-col overflow-hidden`}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-base font-semibold text-gray-900">Shopping Cart</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Close cart"
                    >
                        <Image
                            src="/icons/closemenu.svg"
                            alt="Close"
                            width={18}
                            height={18}
                        />
                    </button>
                </div>

                {/* Cart Content */}
                <div className="flex-1 flex flex-col">
                    {itemCount === 0 ? (
                        /* Empty Cart */
                        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                                <Image
                                    src="/icons/shopping%20cart.svg"
                                    alt="Empty cart"
                                    width={24}
                                    height={24}
                                    className="opacity-50"
                                />
                            </div>
                            <h3 className="text-sm font-medium text-gray-900 mb-1">Your cart is empty</h3>
                            <p className="text-xs text-gray-500 mb-4">Add some items to get started</p>
                            <button
                                onClick={onClose}
                                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Cart Items */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                {items.map((item) => (
                                    <div key={`${item.id}|${item.size ?? ''}|${item.color ?? ''}`} className="flex gap-3 p-3 border border-gray-200 rounded-lg">
                                        {/* Product Image */}
                                        <div className="flex-shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                width={64}
                                                height={64}
                                                className="rounded-md object-cover"
                                            />
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                                                {item.name}
                                            </h4>

                                            {/* Variants */}
                                            <div className="flex gap-2 text-xs text-gray-500 mb-2">
                                                {item.size && <span>Size: {item.size}</span>}
                                                {item.color && <span>Color: {item.color}</span>}
                                            </div>

                                            {/* Price and Quantity */}
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-semibold text-gray-900">
                                                    ${item.price.toFixed(2)}
                                                </span>

                                                <div className="flex items-center gap-2">
                                                    {/* Quantity Controls */}
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1, { size: item.size, color: item.color })}
                                                        className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="w-6 text-center text-sm font-medium">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1, { size: item.size, color: item.color })}
                                                        className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
                                                    >
                                                        +
                                                    </button>

                                                    {/* Remove Button */}
                                                    <button
                                                        onClick={() => removeItem(item.id, { size: item.size, color: item.color })}
                                                        className="ml-1 text-red-500 hover:text-red-700 text-xs font-medium"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Cart Summary */}
                            <div className="border-t border-gray-200 p-4 bg-gray-50">
                                <div className="space-y-1.5 mb-3">
                                    <div className="flex justify-between text-xs">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span>Shipping</span>
                                        <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                                    </div>
                                    {shipping === 0 && (
                                        <p className="text-[11px] text-green-600">
                                            You qualify for free shipping
                                        </p>
                                    )}
                                </div>

                                <div className="flex justify-between font-semibold text-base border-t border-gray-300 pt-2 mb-3">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-2">
                                    <button className="w-full bg-black text-white py-2.5 px-3 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
                                        Checkout
                                    </button>
                                    <button
                                        onClick={onClose}
                                        className="w-full border border-gray-300 text-gray-700 py-2.5 px-3 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default CartModal;