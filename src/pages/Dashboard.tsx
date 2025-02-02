import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchStats = async () => {
  const [users, posts] = await Promise.all([
    axios.get('https://jsonplaceholder.typicode.com/users'),
    axios.get('https://jsonplaceholder.typicode.com/posts'),
  ]);
  return { userCount: users.data.length, postCount: posts.data.length };
};

const Dashboard: React.FC = () => {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['stats'],
    queryFn: fetchStats,
    staleTime: 1000 * 60 * 5, // ✅ داده‌ها تا ۵ دقیقه تازه بمانند (از API مجدداً درخواست نمی‌کند)
    refetchOnWindowFocus: false, // ✅ هنگام بازگشت به صفحه، درخواست مجدد ارسال نشود
    refetchOnReconnect: false, // ✅ بعد از اتصال مجدد به اینترنت، داده‌ها کش شوند
  });
    
  if (isLoading) return <p>Loading stats...</p>;
  if (error) return <p>Error loading stats</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded shadow-lg">
          <h2 className="text-xl font-bold">Total Users</h2>
          <p className="text-4xl">{stats?.userCount}</p>
        </div>
        <div className="p-6 bg-white rounded shadow-lg">
          <h2 className="text-xl font-bold">Total Posts</h2>
          <p className="text-4xl">{stats?.postCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
