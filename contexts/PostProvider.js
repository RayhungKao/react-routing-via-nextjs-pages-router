import React, { useState } from 'react';
import PostContext from './PostContext';

function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);

  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostContext.Provider>
  );
}

export default PostProvider;