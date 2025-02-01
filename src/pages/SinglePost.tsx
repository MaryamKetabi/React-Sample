import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  body: string;
}

const fetchPost = async (id: string): Promise<Post> => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return data;
};

const SinglePost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading, error } = useQuery<Post, Error>({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id!),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading post...</p>;
  if (error) return <p>Error loading post</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-xl w-full">
        <h1 className="text-2xl font-bold mb-4">{post?.title}</h1>
        <p className="text-gray-700">{post?.body}</p>
      </div>
    </div>
  );
};

export default SinglePost;
