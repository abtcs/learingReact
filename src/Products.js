import { useFetch } from './useFetch';

export default function Products() {
  // One line replaces 20+ lines of fetch logic!
  const { data: products, isLoading, error } = useFetch('https://fakestoreapi.com/products');

  if (isLoading) return <h2>⏳ Loading products...</h2>;
  if (error) return <h2>❌ Error: {error}</h2>;

  return (
    <div>
      <h2>Product Catalog</h2>
      <ul>
        {products.map((item) => (
          <li key={item.id}>{item.title} — ${item.price}</li>
        ))}
      </ul>
    </div>
  );
}