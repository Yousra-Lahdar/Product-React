import Router from "./routers/Router.tsx";
import Header from "./pages/A-header/Header.tsx";
import {CartProvider} from "./context/CartContext.tsx";



const App = () => {

  return (
    <>
        <CartProvider>
        <Header />
         <Router/>
        </CartProvider>
    </>
  )
}

export default App

