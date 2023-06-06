import { uiActions } from "./ui";
import { cartActions } from "./cart-slice";

export const fetchCart = () => {

    return async dispatch => {

        const fetchData = async () => {
            const response = await fetch('https://redux-cart-41153-default-rtdb.firebaseio.com/cart.json');

            if (!response.ok) {
                throw new Error("Fetching cart info failed...");
            }

            const data = response.json();
            // console.log("datas", data);
            return data;
        }

        try {
            const cartData = await fetchData();
            dispatch(
                cartActions.replaceCart({
                    items: cartData.items || [],
                    totalQuantity: cartData.totalQuantity,
                })
            );

        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Sending cart data failed!',
                })
            );
        }

    };

};


export const sendCartData = (cart) => {
    return async (dispatch) => {

        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending data...',
            message: 'Sending cart data....'
        }))

        const sendRequest = async () => {
            const response = await fetch('https://redux-cart-41153-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT',
                body: JSON.stringify({
                    items: cart.items,
                    totalQuantity: cart.totalQuantity
                }),
                headers: {
                    'Content-type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error("Sending cart data failed!!!");
            }
        }

        try {
            await sendRequest();
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'success',
                message: 'Sent data successfully'
            }));
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Sending cart data failed!',
                })
            );
        };
    };
};