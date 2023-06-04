import { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';


function App() {

  const showCart = useSelector(state => state.ui.cartIsShown);
  const cart = useSelector(state => state.cart);

  useEffect(() => {
    fetch('https://redux-cart-41153-default-rtdb.firebaseio.com/cart.json', {
      method: 'PUT',
      body: JSON.stringify(cart),
      headers: {
        'Content-type': 'application/json'
      }
    });
  }, [cart])

  return (
    <Layout>
      {showCart && <Cart key="cart" />}
      <Products />
    </Layout>
  );
}

export default App;
