import React, { useEffect } from 'react';
import usePosts from '../hooks/usePosts';
import PostCard from '../components/PostCard';
import { Link } from 'react-router-dom';

export default function Home() {
  const { posts, fetchPosts, loading } = usePosts();

  useEffect(() => { fetchPosts({ page:1, limit:10 }); }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Blog posts</h1>
        <Link to="/create" className="btn">New Post</Link>
      </div>
      {loading ? <p>Loading...</p> : (
        <div className="grid gap-4">
          {posts.map(p => <PostCard key={p._id} post={p} />)}
        </div>
      )}
    </div>
  );
}
