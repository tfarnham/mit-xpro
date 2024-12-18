// provide a button and use onClick to move 1 item into the Shopping Cart
// use React.useState to keep track of items in the Cart.
// list out the Cart items in another column
function ShoppingCart({ availableItems }) {
  const { Button } = ReactBootstrap;
  const [stock, setStock] = React.useState(availableItems);
  const [cart, setCart] = React.useState([]);
  // TODO: create state for stock and cart using React.useState

  const moveToCart = (e) => {
    // TODO: create product and numInStock variables
    const [product, numInStock] = e.target.innerHTML.split(":");
    // TODO: Determine if numInStock is greater than 0. If not, find the product that was clicked and update its numInStock
    console.log("product:",product,"numInStock:",numInStock);
    if (numInStock > 0){
        let newStock = stock.map((item,index) => {
          if (product == item.product) item.inStock--;
          return item;
        });
        setStock(newStock);
        setCart([...cart,{'product':product}]);
    }
    // TODO: Update the stock state to include the new stock

    // TODO: Update the cart state to include the updated item
  };

  // No need to update code beyond this point
  const availableItemsButtons = availableItems.map((item, index) => {
    return (
      <Button id={item.product} key={index} onClick={moveToCart}>
        {item.product}:{item.inStock}
      </Button>
    );
  });

  // Note: React requires a single Parent element, that's why we use <>
  return (
    <>
      <ul key="stock" style={{ listStyleType: 'none' }}>
        {availableItemsButtons}
      </ul>
      <h1>Shopping Cart</h1>
      <Cart cartitems={cart}> Cart Items</Cart>
    </>
  );
}

function Cart({ cartitems }) {
  const { Button } = ReactBootstrap;
  console.log('rendering Cart');
  const availableItemsButtons = cartitems.map((item, index) => {
    return (
      <Button id={item.product} key={index}>
        {item.product}
      </Button>
    );
  });
  return (
    <ul id="cart-items" style={{ listStyleType: 'none' }} key="cart">
      {availableItemsButtons}
    </ul>
  );
}

const availableItems = [
  { product: 'Jacket', inStock: 2 },
  { product: 'Pants', inStock: 3 },
  { product: 'Scarf', inStock: 0 },
  { product: 'Pajamas', inStock: 3 },
  { product: 'Shirt', inStock: 1 },
];

ReactDOM.render(<ShoppingCart availableItems={availableItems} />, document.getElementById('root'));
