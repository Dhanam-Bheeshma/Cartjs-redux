import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem } from './cartSlice';
import { FaShoppingCart, FaTimes } from 'react-icons/fa'; 
import './Cart.css';

const Cart = () => {
    const { items, products } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const [isCartVisible, setCartVisible] = React.useState(false);

    const totalCost = items.reduce((acc, item) => acc + item.totalPrice, 0);
    const shippingFee = totalCost * 0.1;
    const grandTotal = totalCost + shippingFee;

    const handleCompleteOrder = () => {
        alert("Your order has been delivered shortly");
    };

    return (
        <div className="cart-container">
            <div className="cart-icon" onClick={() => setCartVisible(!isCartVisible)}>
                <FaShoppingCart size={24} />
            </div>

            {!isCartVisible ? (
                <div className="products-list">
                    <h1>Products</h1>
                    <div className="products-grid">
                        {products.map(product => (
                            <div key={product.id} className="product-card">
                                <img src={product.thumbnail} alt={product.title} />
                                <h3>{product.title}</h3>
                                <p>{product.description}</p>
                                <div>Price: ${product.price}</div>
                                <button className="add-to-cart-btn" onClick={() => dispatch(addItem(product.id))}>Add to Cart</button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="cart-details">
                    <div className="cart-header">
                        <h2>Your Cart</h2>
                        <button className="close-btn" onClick={() => setCartVisible(false)}>
                            <FaTimes size={20} />
                        </button>
                    </div>
                    {items.length > 0 ? (
                        items.map((item, index) => (
                            <div key={index} className="cart-item">
                                <img src={item.thumbnail} alt={item.title} className="cart-item-thumbnail" />
                                <div className="cart-item-info">
                                    <p>{item.title} - ${item.price} x {item.quantity}</p>
                                    <div className="cart-item-quantity">
                                        <button className="quantity-btn" onClick={() => dispatch(addItem(item.id))}>+</button>
                                        <span className="quantity-highlight">{item.quantity}</span>
                                        <button className="quantity-btn" onClick={() => dispatch(removeItem(item.id))}>-</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                    <div>Total Items: {items.reduce((acc, item) => acc + item.quantity, 0)}</div>
                    <div>Total Cost: ${totalCost.toFixed(2)}</div>
                    <div>Shipping Fee (10%): ${shippingFee.toFixed(2)}</div>
                    <div>Grand Total: ${grandTotal.toFixed(2)}</div>
                    <button className="complete-order" onClick={handleCompleteOrder}>Complete Order</button>
                </div>
            )}
        </div>
    );
};

export default Cart;
