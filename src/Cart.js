import { useState } from 'react';
import formatCurrency from './utils';

const Cart = (props) => {
  console.log(props);
  const [checkout, setCheckout] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const { cartItems, removeFromCart } = props;

  if (!Array.isArray(cartItems)) {
    return <div>Loading cart items...</div>;
  }

  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'name') {
      setName(value);
    } else if (name === 'address') {
      setAddress(value);
    }
  };

  const submitOrder = (e) => {
    e.preventDefault();
    const order = {
      name,
      email,
      address,
      cartItems,
    };
    // TODO: Handle submitting the order data
    console.log(order);
    props.createOrder(order);
  };

  return (
    <div>
      {cartItems.length === 0 ? (
        <div className="cart cart-header">Cart is empty</div>
      ) : (
        <div className="cart cart-header">
          You have {cartItems.length} item(s) in the cart
        </div>
      )}

      <div className="cart">
        <ul className="cart-items">
          {cartItems.map((item) => (
            <li key={item._id}>
              <div>
                <img src={item.image} alt={item.title}></img>
              </div>

              <div>{item.title}</div>

              <div className="right">
                {formatCurrency(item.price)} * {item.count}{' '}
                <button className="button" onClick={() => removeFromCart(item)}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {cartItems.length !== 0 && (
        <div>
          <div className="cart">
            <div className="total">
              <div>
                Total:{' '}
                {formatCurrency(
                  cartItems.reduce((a, c) => a + c.price * c.count, 0)
                )}
              </div>
              <button
                className="button primary"
                onClick={() => setCheckout(true)}
              >
                Proceed
              </button>
            </div>
          </div>

          {checkout && (
            <div className="cart">
              <form onSubmit={submitOrder}>
                <ul className="form-container">
                  <li>
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      onChange={handleInput}
                    />
                  </li>
                  <li>
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      onChange={handleInput}
                    />
                  </li>
                  <li>
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      required
                      onChange={handleInput}
                    />
                  </li>
                  <li>
                    <button className="button primary" type="submit">
                      Place Order
                    </button>
                  </li>
                </ul>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
