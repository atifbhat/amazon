import React from 'react';
import formatCurrency from './utils';

const Products = (props) => {
  return (
    <div>
      <ul className="products">
        {props.products.map((product) => (
          <li key={product._id}>
            <div className="product">
              <a href={'#' + product._id}>
                <img src={product.image} alt="product_image"></img>
                <p>{product.title}</p>
              </a>
              <div className="product-price">
                <div>{formatCurrency(product.price)}</div>
                <button
                  onClick={() => props.addToCart(product)}
                  className="button primary"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
