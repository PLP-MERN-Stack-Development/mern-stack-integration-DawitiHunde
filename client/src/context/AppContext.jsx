import React, { createContext, useReducer } from 'react';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  posts: [],
  categories: [],
};

function reducer(state, action) {
  switch(action.type) {
    case 'SET_USER': return {...state, user: action.payload};
    case 'SET_POSTS': return {...state, posts: action.payload};
    case 'ADD_POST': return {...state, posts: [action.payload, ...state.posts]};
    case 'UPDATE_POST': return {...state, posts: state.posts.map(p => p._id===action.payload._id ? action.payload : p)};
    case 'REMOVE_POST': return {...state, posts: state.posts.filter(p => p._id!==action.payload)};
    case 'SET_CATEGORIES': return {...state, categories: action.payload};
    default: return state;
  }
}

export const AppContext = createContext();

export const AppProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <AppContext.Provider value={{state, dispatch}}>{children}</AppContext.Provider>;
};
