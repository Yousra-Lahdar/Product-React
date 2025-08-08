import { Link } from "react-router";
import "../NavBar.css";


const NavBar = () => {

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">MyShop</Link>
            </div>
            <ul className="navbar-links">
                <li><Link to="/">Produits</Link></li>
                <li><Link to="/cart">Panier</Link></li>
                <li><Link to="/admin">Admin</Link></li>
            </ul>
        </nav>
    );
};

export default NavBar;
