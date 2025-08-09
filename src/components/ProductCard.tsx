


type Product = {
    id: number;
    name: string;
    price: number;

};

type Props = {
    product: Product;
    onClick?: () => void;
};

const ProductCard = ({ product, onClick }: Props) => {
    return (
        <div className="product-card" onClick={onClick} style={{border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem", cursor: "pointer"}}>
            <h3>{product.name}</h3>
            <p>Prix : {product.price.toFixed(2)} €</p>
        </div>
    );
};

export default ProductCard;
