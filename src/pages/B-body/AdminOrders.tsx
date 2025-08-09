import Pages from "../../components/layout/Pages.tsx";
import AdminCard from "../../components/AdminCard.tsx";
import {useCart} from "../../context/CartContext.tsx";

const AdminOrders = () => {
    const { orders } = useCart();

    return (
        <>
            <Pages title="Admin Orders" >
                <h1>page admin</h1>
                <h1>Historique des commandes</h1>
                {orders.length === 0 ? (
                    <p>Aucune commande passée</p>
                ) : (
                    orders.map((order) => <AdminCard key={order.id} order={order} />)
                )}
            </Pages>
        </>
    );
};

export default AdminOrders;
