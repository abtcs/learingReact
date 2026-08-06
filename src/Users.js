import { useFetch } from './useFetch';

export default function Users() {
  const { data: users, isLoading, error } = useFetch('https://jsonplaceholder.typicode.com/users');

  if (isLoading) return <h2>⏳ Loading users...</h2>;
  if (error) return <h2>❌ Error: {error}</h2>;

  return (
    <div>
      <h2>User Directory</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
}