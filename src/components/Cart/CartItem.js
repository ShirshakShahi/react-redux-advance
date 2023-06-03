import { cartActions } from '../sotre/cart-slice';

import classes from './CartItem.module.css';
import { useDispatch } from 'react-redux';

const CartItem = (props) => {
  const { title, quantity, total, price, id } = props.item;
  const dispatch = useDispatch();

  const removeHandler = () => {
    dispatch(cartActions.removeItemCart(id));
  }

  const increaseHandler = () => {
    dispatch(cartActions.addItemCart({
      key: id,
      id,
      title,
      price,quantity
    }));
  }



  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeHandler}>-</button>
          <button onClick={increaseHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
