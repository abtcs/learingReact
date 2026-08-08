import { useState } from 'react';
import { useFetch } from './useFetch';

export default function Products() {
  const [expandedIds, setExpandedIds] = useState([]);
  const { data: products, isLoading, error } = useFetch('https://fakestoreapi.com/products');

  const toggleExpanded = (id) => {
    setExpandedIds((current) =>
      current.includes(id) ? current.filter((itemId) => itemId !== id) : [...current, id]
    );
  };

  if (isLoading) return <h2>⏳ Loading products...</h2>;
  if (error) return <h2>❌ Error: {error}</h2>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Product Catalog</h2>
      <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        {products.map((item) => {
          const isExpanded = expandedIds.includes(item.id);
          const previewText = item.description.length > 140 ? `${item.description.slice(0, 140)}...` : item.description;

          return (
            <article
              key={item.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '12px',
                padding: '18px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                background: '#fff'
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '14px' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ maxWidth: '100%', maxHeight: '240px', objectFit: 'contain' }}
                />
              </div>
              <h3 style={{ margin: '0 0 8px', fontSize: '18px' }}>{item.title}</h3>
              <p style={{ margin: '0 0 10px', color: '#666' }}>{item.category}</p>
              <p style={{ margin: '0 0 14px', lineHeight: '1.5', color: '#333' }}>
                {isExpanded ? item.description : previewText}
              </p>
              {item.description.length > 140 && (
                <button
                  type="button"
                  onClick={() => toggleExpanded(item.id)}
                  style={{
                    border: 'none',
                    background: 'none',
                    color: '#007bff',
                    cursor: 'pointer',
                    padding: 0,
                    fontSize: '14px',
                    marginBottom: '14px'
                  }}
                >
                  {isExpanded ? 'Read less' : 'Read more'}
                </button>
              )}
              <p style={{ fontWeight: 'bold', margin: '0 0 14px' }}>${item.price.toFixed(2)}</p>
              <div style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: '#333' }}>
                  <span>Rating</span>
                  <span>{item.rating.rate.toFixed(1)} / 5</span>
                </div>
                <div style={{ width: '100%', height: '12px', background: '#e5e7eb', borderRadius: '999px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${(item.rating.rate / 5) * 100}%`,
                      background: '#4caf50',
                      height: '100%',
                      borderRadius: '999px'
                    }}
                  />
                </div>
                <p style={{ margin: '8px 0 0', fontSize: '13px', color: '#666' }}>
                  {item.rating.count} customer reviews
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
