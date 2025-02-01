import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  body: string;
}

const fetchPosts = async (): Promise<Post[]> => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return data;
};

const Posts: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (error) return <p>Error loading posts</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((post: Post) => (
          <div key={post.id} className="p-4 bg-white rounded shadow hover:shadow-lg transition">
            <h2 className="text-lg font-bold">{post.title}</h2>
            <p className="text-gray-600">{post.body.substring(0, 100)}...</p>
            <Link
              to={`/app/posts/${post.id}`}
              className="text-blue-500 hover:underline mt-2 inline-block"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
