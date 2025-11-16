import React, { useState } from 'react';
import usePosts from '../hooks/usePosts';
import { useNavigate } from 'react-router-dom';

export default function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const { createPost } = usePosts();
  const nav = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('title', title);
    fd.append('content', content);
    if (file) fd.append('featuredImage', file);
    try {
      await createPost(fd);
      nav('/');
    } catch (err) {
      alert('Failed to create');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="w-full input" />
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" className="w-full textarea" />
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <button className="btn">Publish</button>
      </form>
    </div>
  );
}
