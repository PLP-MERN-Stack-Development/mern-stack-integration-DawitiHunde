import React from 'react';
import { Link } from 'react-router-dom';

export default function PostCard({post}) {
  return (
    <article className="p-4 bg-white rounded-lg shadow">
      <Link to={`/posts/${post._id}`} className="block">
        <h2 className="text-xl font-semibold">{post.title}</h2>
        <p className="text-sm text-gray-500">By {post.author?.name}</p>
        <p className="mt-2 text-gray-700 line-clamp-3">{post.content}</p>
      </Link>
    </article>
  );
}
