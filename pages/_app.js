import "@/styles/globals.css";
import React, { useState } from 'react';
import PostContext from '../contexts/PostContext';

export default function App({ Component, pageProps }) {
  const [posts, setPosts] = useState([]);
  
  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      <Component {...pageProps} />
    </PostContext.Provider>
  );
}
