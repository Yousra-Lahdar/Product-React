import {Routes,Route} from "react-router";
import ProductList from "../pages/B-body/ProductList.tsx";
import ProductDetails from "../pages/B-body/ProductDetails.tsx";
import Cart from "../pages/B-body/Cart.tsx";
import AdminOrders from "../pages/B-body/AdminOrders.tsx";

const Router = () => {

    return (
        <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<AdminOrders />} />
        </Routes>
    );
};

export default Router;
