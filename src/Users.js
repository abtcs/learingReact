import { useState } from 'react';
import { useFetch } from './useFetch';

export default function Users() {
  const [selectedUser, setSelectedUser] = useState(null);
  const { data: users, isLoading, error } = useFetch('https://jsonplaceholder.typicode.com/users');

  if (isLoading) return <h2>⏳ Loading users...</h2>;
  if (error) return <h2>❌ Error: {error}</h2>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Directory</h2>
      <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        {users.map((user) => (
          <button
            key={user.id}
            type="button"
            onClick={() => setSelectedUser(user)}
            style={{
              textAlign: 'left',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid #ddd',
              background: '#fff',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}
          >
            <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px' }}>{user.name}</div>
            <div style={{ color: '#555', marginBottom: '8px' }}>@{user.username}</div>
            <div style={{ color: '#333' }}>📧 {user.email}</div>
          </button>
        ))}
      </div>

      {selectedUser && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.45)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            zIndex: 1000
          }}
          onClick={() => setSelectedUser(null)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '700px',
              background: '#fff',
              borderRadius: '16px',
              padding: '24px',
              position: 'relative',
              boxShadow: '0 18px 44px rgba(0,0,0,0.18)'
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedUser(null)}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                border: 'none',
                background: 'transparent',
                fontSize: '22px',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>

            <h2 style={{ marginTop: 0 }}>{selectedUser.name}</h2>
            <p style={{ color: '#555', marginBottom: '18px' }}>@{selectedUser.username}</p>

            <div style={{ display: 'grid', gap: '16px' }}>
              <div style={{ display: 'grid', gap: '10px', padding: '16px', background: '#f9fafb', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>📧 <a href={`mailto:${selectedUser.email}`} style={{ color: '#1a73e8', textDecoration: 'none' }}>{selectedUser.email}</a></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>📞 <a href={`tel:${selectedUser.phone}`} style={{ color: '#1a73e8', textDecoration: 'none' }}>{selectedUser.phone}</a></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>🌐 <a href={`https://${selectedUser.website}`} target="_blank" rel="noreferrer" style={{ color: '#1a73e8', textDecoration: 'none' }}>{selectedUser.website}</a></div>
              </div>

              <div style={{ display: 'grid', gap: '10px', padding: '16px', background: '#f9fafb', borderRadius: '12px' }}>
                <h3 style={{ margin: 0 }}>Address</h3>
                <p style={{ margin: 0, color: '#333' }}>
                  {selectedUser.address.street}, {selectedUser.address.suite}
                  <br />
                  {selectedUser.address.city}, {selectedUser.address.zipcode}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${selectedUser.address.geo.lat},${selectedUser.address.geo.lng}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#1a73e8', textDecoration: 'none' }}
                >📍 View location on map</a>
              </div>

              <div style={{ display: 'grid', gap: '10px', padding: '16px', background: '#f9fafb', borderRadius: '12px' }}>
                <h3 style={{ margin: 0 }}>Company</h3>
                <p style={{ margin: '0 0 6px', fontWeight: 700 }}>{selectedUser.company.name}</p>
                <p style={{ margin: 0, color: '#555' }}>{selectedUser.company.catchPhrase}</p>
                <p style={{ margin: 0, color: '#555' }}>{selectedUser.company.bs}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
