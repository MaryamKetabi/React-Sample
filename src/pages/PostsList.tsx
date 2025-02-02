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
    staleTime: 1000 * 60 * 3, // ✅ داده‌ها تا ۳ دقیقه تازه بمانند
    gcTime: 1000 * 60 * 7,  // ✅ معادل جدید cacheTime (پاک‌سازی بعد از ۷ دقیقه)
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (error) return <p>Error loading posts</p>;
  if (!posts) return <p>No posts found.</p>; // ✅ بررسی مقدار posts قبل از map

  return (
    <div className="p-8 bg-gray-100 flex-grow">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-6 rounded shadow-lg hover:shadow-xl transition duration-300"
          >
            <h2 className="text-xl font-semibold mb-4">{post.title}</h2>
            <Link
              to={`/app/posts/${post.id}`}
              className="text-blue-500 hover:underline"
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
