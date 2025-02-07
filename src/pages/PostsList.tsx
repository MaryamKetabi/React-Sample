import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
}

const fetchPosts = async (): Promise<Post[]> => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return data;
};

const PostsList: React.FC = () => {
  const { data: posts, isLoading, error } = useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 10, 
    gcTime: 1000 * 60 * 30,  
  });

  if (isLoading) return <p className="text-center text-gray-600">Loading posts...</p>;
  if (error) return <p className="text-center text-red-500">Error loading posts</p>;
  if (!posts || posts.length === 0) return <p className="text-center text-gray-500">No posts found.</p>;

  return (
    <div className="p-8 bg-gray-100 flex-grow">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-6 rounded shadow-lg hover:shadow-xl transition duration-300 min-h-[150px] flex flex-col justify-between"
          >
            <h2 className="text-xl font-semibold mb-4">{post.title}</h2>
            <Link
              to={`/app/posts/${post.id}`}
              className="text-blue-900 hover:underline self-end"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsList;
