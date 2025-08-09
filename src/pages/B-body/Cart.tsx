import Pages from "../../components/layout/Pages.tsx";
import { useCart } from "../../context/CartContext.tsx";
import CartCard from "../../components/CartCard.tsx";
import { useState } from "react";
import { useNavigate } from "react-router";

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleBuy = async () => {
        if (!email || !name) {
            setError("Veuillez saisir votre nom et votre email");
            return;
        }
        if (cart.length === 0) return;

        setLoading(true);
        setError(null);

        try {
            // 1. Créer le client
            const customerResponse = await fetch("http://localhost:8080/customers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email }),
            });

            if (!customerResponse.ok) {
                throw new Error("Erreur lors de la création du client");
            }


            clearCart();
            setEmail("");
            setName("");
            navigate("/admin"); // redirection
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Pages title="Mon Panier">
            <h1>Mon Panier</h1>
            {cart.length === 0 ? (
                <p>Votre panier est vide</p>
            ) : (
                <>
                    {cart.map((item) => (
                        <CartCard
                            key={item.id}
                            item={item}
                            onRemove={removeFromCart}
                            onUpdateQuantity={updateQuantity}
                        />
                    ))}
                    <h2>Total : {total.toFixed(2)} €</h2>
                    <input
                        type="text"
                        placeholder="Votre nom"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{ marginBottom: "10px" }}
                    />
                    <input
                        type="email"
                        placeholder="Votre email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ marginBottom: "10px" }}
                    />
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <button onClick={handleBuy} disabled={loading}>
                        {loading ? "Envoi..." : "Acheter"}
                    </button>
                </>
            )}
        </Pages>
    );
};

export default Cart;
