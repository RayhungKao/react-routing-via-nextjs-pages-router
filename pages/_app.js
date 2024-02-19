import "@/styles/globals.css";
import React, { useState } from "react";
import PostContext from "../contexts/PostContext";
import Layout from "../components/layout";

export default function App({ Component, pageProps }) {
  const [posts, setPosts] = useState([]);

  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PostContext.Provider>
  );
}
