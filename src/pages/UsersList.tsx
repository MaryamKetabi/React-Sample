import React from 'react';
import { Link } from 'react-router-dom';
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
  });

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      <table className="table-auto border-collapse w-full bg-white rounded shadow-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Details</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr
              key={user.id}
              className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
            >
              <td className="border px-4 py-2 text-center">{user.id}</td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2 text-center">
                <Link
                  to={`/app/users/${user.id}`}
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
