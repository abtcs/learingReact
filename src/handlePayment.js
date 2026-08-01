import { useNavigate } from 'react-router-dom';

export default function CheckoutButton() {
  const navigate = useNavigate();

  function handlePayment() {
    // 1. Perform background logic (API call, payment processing, etc.)
    console.log('Processing payment...');

    // 2. Automatically redirect the user to the success page
    navigate('/success');
  }

  return (
    <button onClick={handlePayment} style={{ padding: '10px 20px', cursor: 'pointer' }}>
      Pay Now & Complete Order
    </button>
  );
}
