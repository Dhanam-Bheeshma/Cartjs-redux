import { createSlice } from '@reduxjs/toolkit';
import Img1 from "../img/1.jpeg";
import Img2 from '../img/2.jpg';
import Img3 from '../img/3.jpeg';
import Img4 from '../img/4.jpeg';
import Img5 from '../img/5.jpeg';

const initialState = {
    items: [], 
    products: [ 
        {
            "id": 1,
            "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            "price": 109.95,
            "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            "category": "men's clothing",
            "image": Img1,
            "thumbnail": Img1,
            "rating": {"rate": 3.9, "count": 120}
        },
        {
            "id": 2,
            "title": "iPhone X",
            "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
            "price": 899,
            "discountPercentage": 17.94,
            "rating": 4.44,
            "stock": 34,
            "brand": "Apple",
            "category": "smartphones",
            "image": Img2, // Local image
            "thumbnail": Img2,
            "images": [Img2]
        },
        {
            "id": 3,
            "title": "Samsung Universe 9",
            "description": "Samsung's new variant which goes beyond Galaxy to the Universe",
            "price": 1249,
            "discountPercentage": 15.46,
            "rating": 4.09,
            "stock": 36,
            "brand": "Samsung",
            "category": "smartphones",
            "image": Img3, // Local image
            "thumbnail": Img3,
            "images": [Img3]
        },
        {
            "id": 4,
            "title": "OPPOF19",
            "description": "OPPO F19 is officially announced on April 2021.",
            "price": 280,
            "discountPercentage": 17.91,
            "rating": 4.3,
            "stock": 123,
            "brand": "OPPO",
            "category": "smartphones",
            "image": Img4, // Local image
            "thumbnail": Img4,
            "images": [Img4]
        },
        {
            "id": 5,
            "title": "Huawei P30",
            "description": "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
            "price": 499,
            "discountPercentage": 10.58,
            "rating": 4.09,
            "stock": 32,
            "brand": "Huawei",
            "category": "smartphones",
            "image": Img5, // Local image
            "thumbnail": Img5,
            "images": [Img5]
        }
    ],
    totalQuantity: 0,
    totalAmount: 0,
    shippingFee: 0,
    grandTotal: 0
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const newItem = state.products.find(product => product.id === action.payload);
            const itemInCart = state.items.find(item => item.id === newItem.id);

            if (itemInCart) {
                itemInCart.quantity++;
                itemInCart.totalPrice += newItem.price;
            } else {
                state.items.push({ ...newItem, quantity: 1, totalPrice: newItem.price });
            }

            state.totalQuantity++;
            state.totalAmount += newItem.price;
            state.shippingFee = state.totalAmount * 0.1; // 10% shipping fee
            state.grandTotal = state.totalAmount + state.shippingFee;
        },
        removeItem: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload);

            if (existingItem) {
                if (existingItem.quantity === 1) {
                    state.items = state.items.filter(item => item.id !== action.payload);
                } else {
                    existingItem.quantity--;
                    existingItem.totalPrice -= existingItem.price;
                }

                state.totalQuantity--;
                state.totalAmount -= existingItem.price;
                state.shippingFee = state.totalAmount * 0.1; // 10% shipping fee
                state.grandTotal = state.totalAmount + state.shippingFee;
            }
        },
    },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
