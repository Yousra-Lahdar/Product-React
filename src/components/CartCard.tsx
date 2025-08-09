import React from "react";
import "./CartCard.css";

type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
};

type Props = {
    item: CartItem;
    onRemove: (id: number) => void;
    onUpdateQuantity: (id: number, quantity: number) => void;
};

const CartCard: React.FC<Props> = ({ item, onRemove, onUpdateQuantity }) => {
    return (
        <div className="cart-card">
            <div className="cart-info">
                <h3>{item.name}</h3>
                <p>Prix : {item.price.toFixed(2)} €</p>
                <p>Total : {(item.price * item.quantity).toFixed(2)} €</p>
            </div>

            <div className="cart-actions">
                <button
                    type="button"
                    onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                >
                    −
                </button>
                <span>{item.quantity}</span>
                <button
                    type="button"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >
                    +
                </button>
                <button type="button" onClick={() => onRemove(item.id)}>
                    Supprimer
                </button>
            </div>
        </div>
    );
};

export default CartCard;
