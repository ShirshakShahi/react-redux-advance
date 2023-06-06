import { Fragment, useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import Notification from './components/UI/Notification';
import { sendCartData } from './components/sotre/cart-slice';


let isInitial = true;

function App() {

  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.cartIsShown);
  const cart = useSelector(state => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    dispatch(sendCartData(cart));

  }, [cart, dispatch])

  return (<Fragment>
    {notification && <Notification
      status={notification.status}
      title={notification.title}
      message={notification.message} />}
    <Layout>
      {showCart && <Cart key="cart" />}
      <Products />
    </Layout>
  </Fragment>
  );
}

export default App;
