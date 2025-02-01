import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: { name: string };
}

const fetchUser = async (id: string): Promise<User> => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return data;
};

const SingleUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading, error } = useQuery<User, Error>({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id!),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading user details...</p>;
  if (error) return <p>Error loading user details</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-xl w-full">
        <h1 className="text-2xl font-bold mb-4">{user?.name}</h1>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Phone:</strong> {user?.phone}
        </p>
        <p>
          <strong>Website:</strong> {user?.website}
        </p>
        <p>
          <strong>Company:</strong> {user?.company.name}
        </p>
      </div>
    </div>
  );
};

export default SingleUser;
