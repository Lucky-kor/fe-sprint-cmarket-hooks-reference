import React, { useState } from 'react';
import Nav from './components/Nav';
import ItemListContainer from './pages/ItemListContainer';
import './App.css';
import './variables.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShoppingCart from './pages/ShoppingCart';
import { initialState } from './assets/state';

function App() {
  const [items] = useState(initialState.items);
  const [cartItems, setCartItems] = useState(initialState.cartItems);

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter((el) => el.itemId !== itemId));
  };

  const addToCart = (itemId) => {
    const found = cartItems.filter((el) => el.itemId === itemId)[0];
    if (found) {
      console.log('found');
      setQuantity(itemId, found.quantity + 1);
    } else {
      console.log('add new');
      setCartItems([
        ...cartItems,
        {
          itemId,
          quantity: 1,
        },
      ]);
    }
  };

  const setQuantity = (itemId, quantity) => {
    const found = cartItems.filter((el) => el.itemId === itemId)[0];
    const idx = cartItems.indexOf(found);
    const cartItem = {
      itemId,
      quantity,
    };

    setCartItems([
      ...cartItems.slice(0, idx),
      cartItem,
      ...cartItems.slice(idx + 1),
    ]);
  };

  return (
    <Router>
      <Nav cartItems={cartItems} />
      <Routes>
        <Route
          path="/"
          element={<ItemListContainer items={items} handleAdd={addToCart} />}
        />
        <Route
          path="/shoppingcart"
          element={
            <ShoppingCart
              cartItems={cartItems}
              items={items}
              handleDelete={removeFromCart}
              handleQuantityChange={setQuantity}
            />
          }
        />
      </Routes>
      <img
        id="logo_foot"
        src={`${process.env.PUBLIC_URL}/codestates-logo.png`}
        alt="logo_foot"
      />
    </Router>
  );
}

export default App;
