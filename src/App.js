import { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';


function App() {

  const showCart = useSelector(state => state.ui.cartIsShown);
  const cartItems = useSelector(state => state.cart.items);
  useEffect(() => {

    console.log(cartItems)
  }, [cartItems])

  return (
    <Layout>
      {showCart && <Cart key="cart" />}
      <Products />
    </Layout>
  );
}

export default App;
