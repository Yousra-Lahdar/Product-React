import React from "react";

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

type Props = {
    order: Order;
};

const AdminCard: React.FC<Props> = ({ order }) => {
    const totalOrder = order.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="admin-card">
            <h3>Commande #{order.id}</h3>
            <p>Date: {new Date(order.date).toLocaleString()}</p>
            <ul>
                {order.items.map((item) => (
                    <li key={item.id}>
                        {item.name} - {item.quantity} × {item.price.toFixed(2)} €
                    </li>
                ))}
            </ul>
            <p>
                <strong>Total: {totalOrder.toFixed(2)} €</strong>
            </p>
        </div>
    );
};

export default AdminCard;
