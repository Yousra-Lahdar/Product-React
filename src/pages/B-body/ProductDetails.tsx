import Pages from "../../components/layout/Pages.tsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductDetailsCard from "../../components/ProductDetailsCard.tsx";
import {useCart} from "../../context/CartContext.tsx"
import type {ProductShape} from "../../components/ProductDetailsCard.tsx"

const ProductDetails = () => {

    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<ProductShape | null>(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                const res = await fetch(`http://localhost:8080/products/${id}`);
                if (!res.ok) throw new Error("Erreur lors du chargement du produit");
                const data = await res.json();
                setProduct(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = ( productId :number, quantity: number) => {
        if (!product) return;
        addToCart({
            id: productId,
            name: product.name,
            price: product.price,
            quantity
        });
    };

    if (loading) return <p>Chargement...</p>;
    if (!product) return <p>Produit introuvable</p>;
    return (
        <>
            <Pages title="detail du produit" >
                <h1>page detail d'un produit</h1>
                <div>
                    <ProductDetailsCard
                        product={product}
                        onAddToCart={handleAddToCart}
                    />
                </div>
            </Pages>
        </>
    );
};

export default ProductDetails;
