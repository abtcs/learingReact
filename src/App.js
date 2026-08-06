import Cart from './Cart';
import RealTimeData from './RealTimeData';
import DarkMode from './DarkMode';
import CounterApp from './CounterApp';
import RouteMethod1 from './RouteMethod1';
import { ProductDetail } from './ProductDetail';
import CheckoutButton from './handlePayment';
import Products from './Products';
import Users from './Users';
import { BrowserRouter, Routes, Route, NavLink, Link, useNavigate } from 'react-router-dom';

const productsDetails = [
  { id: 1, name: 'Laptop', price: 999, isAvailable: true, qty: 123, imageLink: 'https://picsum.photos/id/0/500/300' },
  { id: 2, name: 'Headphones', price: 199, isAvailable: false, qty: 0, imageLink: 'https://picsum.photos/id/26/500/300' },
  { id: 3, name: 'Keyboard', price: 89, isAvailable: true, qty: 50, imageLink: 'https://picsum.photos/id/60/500/300' },
  { id: 4, name: 'Mouse', price: 49, isAvailable: true, qty: 200, imageLink: 'https://picsum.photos/id/201/500/300' },
];

function ProductCard({ id, name, price, isAvailable, qty, imageLink }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px' }}>
      <h3>{name}</h3>
      <p>Price: ${price}</p>
      <span style={{ color: isAvailable ? 'green' : 'red', fontWeight: 'bold' }}>
        {isAvailable ? 'In Stock' : 'Out of Stock'}
      </span>
      <p>Quantity: {qty}</p>
      <img src={imageLink} alt={name} style={{ width: '100px', height: '100px' }} />
      <div style={{ marginTop: '12px' }}>
        <Link to={`/product/${id}`} style={{ textDecoration: 'none', color: '#007bff' }}>
          View product details
        </Link>
      </div>
    </div>
  );
}

function Shop() {
  return (
    <div>
      {productsDetails.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}

function CartScreen() {
  const navigate = useNavigate();
  return <Cart onBack={() => navigate('/products')} />;
}

function Success() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>✅ Payment Successful</h2>
      <p>Your order is complete. Thank you for your purchase!</p>
      <Link to="/products">Back to Shop</Link>
    </div>
  );
}

const appRoutes = [
  { path: '/', element: <Shop />, label: 'Shop', showInNav: true },
  { path: '/products', element: <Shop /> },
  { path: '/cart', element: <CartScreen />, label: '🛒 Go to Cart', showInNav: true },
  { path: '/real-time-data', element: <RealTimeData />, label: 'Real-Time Data', showInNav: true },
  { path: '/dark-mode', element: <DarkMode />, label: 'Dark Mode', showInNav: true },
  { path: '/counter-app', element: <CounterApp />, label: 'Counter App', showInNav: true },
  { path: '/route-method1/*', element: <RouteMethod1 />, label: 'Routing Method 1', showInNav: true },
  { path: '/product/:id', element: <ProductDetail /> },
  { path: '/handlepayment', element: <CheckoutButton />, label: 'Handle Payment', showInNav: true },
  { path: '/success', element: <Success /> },
  { path: '/users', element: <Users />, label: 'Users', showInNav: true },
  { path: '/products-list', element: <Products />, label: 'Products List', showInNav: true },
];

function AppRoutes() {
  return (
    <Routes>
      {appRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      <Route path="*" element={<h2>404 - Page Not Found</h2>} />
    </Routes>
  );
}

const navButtonStyle = {
  padding: '10px 20px',
  cursor: 'pointer',
  fontWeight: 'bold',
  textDecoration: 'none',
  color: '#000',
  border: '1px solid #ccc',
  borderRadius: '4px',
  background: '#fff',
};

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <h1>My Tech Shop</h1>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {appRoutes.filter((route) => route.showInNav).map((route) => (
              <NavLink key={route.path} to={route.path} style={navButtonStyle}>
                {route.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <AppRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
}
