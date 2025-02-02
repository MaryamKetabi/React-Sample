import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
}

const fetchUsers = async (): Promise<User[]> => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
  return data;
};

const UsersList: React.FC = () => {
  const { data: users, isLoading, error } = useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5, // ✅ داده‌ها تا ۵ دقیقه تازه بمانند
    gcTime: 1000 * 60 * 10,  // ✅ معادل جدید cacheTime (پاک‌سازی بعد از ۱۰ دقیقه)
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users</p>;
  if (!users) return <p>No users found.</p>; // ✅ بررسی مقدار users قبل از map

  return (
    <div className="p-8 bg-gray-100 flex-grow">
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      <table className="table-auto border-collapse w-full bg-white rounded shadow-lg">
        <thead>
          <tr className="bg-blue-200 text-blue-900">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
            >
              <td className="border px-4 py-2 text-center">{user.id}</td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
