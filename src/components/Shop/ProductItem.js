import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../sotre/cart-slice';

const ProductItem = (props) => {
  const cart = useSelector((state) => state.cart);

  const { title, price, description, id } = props;

  const dispatch = useDispatch();

  const addToCartHandler = () => {

    const newTotalQuantity = cart.totalQuantity + 1;

    const updatedItems = cart.items.slice();
    const existingItem = cart.items.find((item) => item.id === id);

    if (existingItem) {
      const updatedItem = { ...existingItem };//new obj + copy existing properties
      updatedItem.quantity++;
      updatedItem.price = updatedItem.price + price;
      const existingItemIndex = updatedItems.findIndex(item => item.id === id);
      updatedItems[existingItemIndex] = updatedItem;

    } else {
      updatedItems.push({
        id: id,
        price: price,
        quantity: 1,
        totalPrice: price,
        name: title
      })
    }

    const newCart = {
      items: updatedItems,
      totalQuantity: newTotalQuantity
    }


    dispatch(cartActions.replaceCart(newCart));

    // dispatch(cartActions.addItemCart({
    //   key: id,
    //   id,
    //   title,
    //   price,
    //   description
    // }));
  }

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
