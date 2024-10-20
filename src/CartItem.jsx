import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {removeItem, updateQuantity} from './CartSlice';
import './CartItem.css';

const CartItem = ({onContinueShopping}) => {
    const cart = useSelector(state => state.cart.items);
    const parsePrice = price => parseFloat(price.replace('$', ''));
    const cartTotal = cart.reduce((total, item) => total + parsePrice(item.cost) * item.quantity || 0, 0)

    const dispatch = useDispatch();

    // Calculate total amount for all products in the cart
    const calculateTotalAmount = () => {
        return cartTotal;
    };

    const handleContinueShopping = (e) => {
        console.log(onContinueShopping)
        onContinueShopping && onContinueShopping(e); // Ensure the callback is executed if provided
    };


    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };

    const handleDecrement = (item) => {
        if (item && item.quantity > 1) {
            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
        } else{
            dispatch(removeItem(item.name));
        }
    };

    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    const calculateTotalCost = (item) => {
        const cost = parsePrice(item.cost);
        const quantity = item.quantity || 0;
        return cost * quantity;
    };

    return (
        <div className="cart-container">
            <h2 style={{color: 'black'}}>Total Cart Amount: ${calculateTotalAmount()}</h2>
            <div>
                {cart.map(item => (
                    <div className="cart-item" key={item.name}>
                        <img className="cart-item-image" src={item.image} alt={item.name}/>
                        <div className="cart-item-details">
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-cost">{item.cost}</div>
                            <div className="cart-item-quantity">
                                <button className="cart-item-button cart-item-button-dec"
                                        onClick={() => handleDecrement(item)}>-
                                </button>
                                <span className="cart-item-quantity-value">{item.quantity}</span>
                                <button className="cart-item-button cart-item-button-inc"
                                        onClick={() => handleIncrement(item)}>+
                                </button>
                            </div>
                            <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                            <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{marginTop: '20px', color: 'black'}} className='total_cart_amount'></div>
            <div className="continue_shopping_btn">
                <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping
                </button>
                <br/>
                <button className="get-started-button1">Checkout</button>
            </div>
        </div>
    );
};

export default CartItem;


