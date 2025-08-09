
import React, { useState } from "react";
import "./ProductDetailsCard.css";

export type ProductShape = {
    id: number;
    name: string;
    description?: string;
    price: number;
    stock?: number;

};

type Props = {
    product: ProductShape;
    initialQuantity?: number;
    onAddToCart: (productId: number, quantity: number) => void;
};

const ProductDetailsCard: React.FC<Props> = ({ product, initialQuantity = 1, onAddToCart }) => {
    const [quantity, setQuantity] = useState<number>(initialQuantity);
    const [currentStock, setCurrentStock] = useState<number>(product.stock ?? Infinity);


    const increase = () => setQuantity((q) => Math.min(q + 1, currentStock));
    const decrease = () => setQuantity((q) => Math.max(1, q - 1));

    const handleChange = (value: number) => {
        if (Number.isNaN(value)) return;
        const v = Math.max(1, Math.min(value, currentStock));
        setQuantity(v);
    };

    const handleAddToCartClick = () => {
        onAddToCart(product.id, quantity);
        if (currentStock !== Infinity) {
            setCurrentStock((prev) => Math.max(prev - quantity, 0));
        }
        setQuantity(1); // remettre la quantité à 1 après ajout
    };

    const disabledAdd = currentStock<= 0 || quantity < 1;

    return (
        <div className="product-details-card">


            <div className="product-info">
                <h2 className="product-title">{product.name}</h2>
                <p className="product-price">{product.price.toFixed(2)} €</p>

                <p className="product-desc">{product.description}</p>


                <div className="quantity-controls">
                    <button type="button" onClick={decrease} disabled={quantity <= 1}>−</button>
                    <input
                        type="text"
                        min={1}
                        max={currentStock=== Infinity ? undefined : currentStock}
                        value={quantity}
                        onChange={(e) => handleChange(parseInt(e.target.value || "1", 10))}
                    />
                    <button type="button" onClick={increase} disabled={quantity >= currentStock}>+</button>
                </div>

                <div className="actions">
                    <button
                        className="add-btn"
                        onClick={handleAddToCartClick}
                        disabled={disabledAdd}
                        aria-disabled={disabledAdd}
                    >
                        Ajouter au panier
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsCard;
