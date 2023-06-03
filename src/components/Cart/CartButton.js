import classes from './CartButton.module.css';
import { useDispatch } from 'react-redux';
import { uiActions } from '../sotre/ui';
import { useSelector } from 'react-redux';

const CartButton = (props) => {

  const noOfItems = useSelector((state) => state.cart.totalQuantity);
  const dipatch = useDispatch();

  const toggleHandler = () => {
    dipatch(uiActions.showCard());
  }

  return (
    <button className={classes.button} onClick={toggleHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{noOfItems}</span>
    </button>
  );
};

export default CartButton;
