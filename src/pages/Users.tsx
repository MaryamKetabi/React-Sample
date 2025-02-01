import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface User {
  id: number;
  name: string;
}

const fetchUsers = async (): Promise<User[]> => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
  return data;
};

const Users: React.FC = () => {
  const { data: users, isLoading, error } = useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      <ul className="space-y-4">
        {users?.map((user) => (
          <li key={user.id} className="bg-white p-4 rounded shadow hover:shadow-md transition">
            <p className="text-lg font-semibold">{user.name}</p>
            <Link
              to={`/app/users/${user.id}`}
              className="text-blue-500 hover:underline"
            >
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
