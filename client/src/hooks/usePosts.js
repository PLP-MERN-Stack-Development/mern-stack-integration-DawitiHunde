import { useContext, useState } from 'react';
import api from '../api/api';
import { AppContext } from '../context/AppContext';

export default function usePosts() {
  const { state, dispatch } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async (params = {}) => {
    setLoading(true); setError(null);
    try {
      const res = await api.get('/posts', { params });
      dispatch({ type: 'SET_POSTS', payload: res.data.data });
    } catch (err) { setError(err.message || 'Failed'); }
    setLoading(false);
  };

  const createPost = async (formData) => {
    // optimistic UI: create a temporary client-side post
    const tempId = 'temp-' + Date.now();
    const optimistic = { _id: tempId, title: formData.get('title'), content: formData.get('content'), featuredImage: null, author: state.user };
    dispatch({ type: 'ADD_POST', payload: optimistic });

    try {
      const res = await api.post('/posts', formData, { headers: { 'Content-Type': 'multipart/form-data' }});
      // replace optimistic with server post
      dispatch({ type: 'UPDATE_POST', payload: res.data });
    } catch (err) {
      // rollback
      dispatch({ type: 'REMOVE_POST', payload: tempId });
      throw err;
    }
  };

  const updatePost = async (id, data) => {
    setLoading(true);
    try {
      const res = await api.put(`/posts/${id}`, data);
      dispatch({ type: 'UPDATE_POST', payload: res.data });
    } finally { setLoading(false); }
  };

  const deletePost = async (id) => {
    // optimistic remove
    const snapshot = state.posts;
    dispatch({ type: 'REMOVE_POST', payload: id });
    try { await api.delete(`/posts/${id}`); } 
    catch (err) { dispatch({ type: 'SET_POSTS', payload: snapshot }); throw err; }
  };

  return { posts: state.posts, loading, error, fetchPosts, createPost, updatePost, deletePost };
}
