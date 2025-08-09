import Pages from "../../components/layout/Pages.tsx";
import ProductCard from "../../components/ProductCard.tsx";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";


type Product = {
    id: number;
    name: string;
    price: number;

};
const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const navigate = useNavigate();

    useEffect(() => {

        fetch("http://localhost:8080/products")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch products");
                }
                return res.json();
            })
            .then((data: Product[]) => {
                setProducts(data);
            })

    }, []);



    return (
        <>
            <Pages title="produits" >
                <h1>page liste des produits</h1>
                <div>

                    {products.length === 0 ? (
                        <p>No products found.</p>
                    ) : (
                        products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onClick={() => navigate(`/product/${product.id}`)}
                            />
                        ))
                    )}
                </div>
            </Pages>
        </>
    );
};

export default ProductList;
