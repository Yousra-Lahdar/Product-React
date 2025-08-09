import { createContext, useContext, useState, useEffect } from "react";
import type {ReactNode} from "react";

type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
};

type Order = {
    id: number;
    items: CartItem[];
    date: string;
};

type CartContextType = {
    cart: CartItem[];
    orders: Order[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    addOrder:(order: Order) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });

    const [orders, setOrders] = useState<Order[]>(() => {
        const saved = localStorage.getItem("orders");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem("orders", JSON.stringify(orders));
    }, [orders]);

    const addToCart = (item: CartItem) => {
        setCart((prev) => {
            const existing = prev.find((p) => p.id === item.id);
            if (existing) {
                return prev.map((p) =>
                    p.id === item.id ? { ...p, quantity: p.quantity + item.quantity } : p
                );
            }
            return [...prev, item];
        });
    };

    const removeFromCart = (id: number) => {
        setCart((prev) => prev.filter((p) => p.id !== id));
    };

    const updateQuantity = (id: number, quantity: number) => {
        setCart((prev) =>
            prev.map((p) => (p.id === id ? { ...p, quantity } : p))
        );
    };

    const clearCart = () => setCart([]);

    const addOrder = (order: Order) => {
        setOrders((prev) => [...prev, order]);
    };

    return (
        <CartContext.Provider
            value={{ cart,orders, addToCart, removeFromCart, updateQuantity, clearCart,addOrder }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;


};
