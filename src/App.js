import { Fragment, useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../src/components/sotre/ui';
import Notification from './components/UI/Notification';

let isInitial = true;

function App() {

  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.cartIsShown);
  const cart = useSelector(state => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {

    const sendCartData = async () => {

      dispatch(uiActions.showNotification({
        status: 'pending',
        title: 'Sending data...',
        message: 'Sending cart data....'
      }))

      const response = await fetch('https://redux-cart-41153-default-rtdb.firebaseio.com/cart.json', {
        method: 'PUT',
        body: JSON.stringify(cart),
        headers: {
          'Content-type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error("Sending cart data failed!!!");
      }

      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'success',
        message: 'Sent data successfully'
      }))

    }

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    });
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
