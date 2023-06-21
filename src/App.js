import React from 'react';
import data from './data.json';
import Filter from './Filter';
import Cart from './Cart';
import Products from './Products';
import { useState, useEffect } from 'react';

const App = () => {
  const [products, setProducts] = useState(data.products);

  const cartItemsFromStorage = localStorage.getItem('cartItems');
  const initialCartItems = cartItemsFromStorage
    ? JSON.parse(cartItemsFromStorage)
    : [];
  const [cartItems, setCartItems] = useState(initialCartItems);

  const [size, setSize] = useState('');
  const [sort, setSort] = useState('');

  const createOrder = (order) => {
    alert('Need to save order for' + order.name);
  };

  const removeFromCart = (product) => {
    const updatedCartItems = cartItems.filter(
      (item) => item._id !== product._id
    );
    setCartItems(updatedCartItems);
  };

  const addToCart = (product) => {
    const existingCartItem = cartItems.find((item) => item._id === product._id);
    if (existingCartItem) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id ? { ...item, count: item.count + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, count: 1 }]);
    }
  };

  const sortProducts = (event) => {
    const sortValue = event.target.value;
    setSort(sortValue);

    setProducts((prevProducts) => {
      const sortedProducts = [...prevProducts];
      sortedProducts.sort((a, b) => {
        if (sortValue === 'lowest') {
          return a.price - b.price;
        } else if (sortValue === 'highest') {
          return b.price - a.price;
        } else {
          return a._id - b._id;
        }
      });

      return sortedProducts;
    });
  };

  const filterProducts = (event) => {
    const selectedSize = event.target.value;
    setSize(selectedSize);
    if (selectedSize === '') {
      setProducts(data.products);
    } else {
      setProducts(
        data.products.filter(
          (product) => product.availableSizes.indexOf(selectedSize) >= 0
        )
      );
    }
  };

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="grid-container">
      <header>
        <a href="/">React shopping cart</a>
      </header>

      <main>
        <div className="content">
          <div className="main">
            <Filter
              count={products.length}
              size={size}
              sort={sort}
              filterProducts={filterProducts}
              sortProducts={sortProducts}
            />
            <Products products={products} addToCart={addToCart} />
          </div>
          <div className="sidebar">
            <Cart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              createOrder={createOrder}
            />
          </div>
        </div>
      </main>

      <footer>All rights reserved.</footer>
    </div>
  );
};

export default App;
