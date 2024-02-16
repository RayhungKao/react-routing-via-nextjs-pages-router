import React, { useContext } from "react";
import Link from "next/link";
import PostContext from "../../../contexts/PostContext";

function PostList() {
  const { posts, setPosts } = useContext(PostContext);

  function handleRemovePost() {
    setPosts((prevPosts) => prevPosts.slice(0, -1));
  }

  function handleRemoveArbitraryPost(id) {
    setPosts((prevPosts) => prevPosts.filter((post) => post !== posts[id]));
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Posts</h1>
      <button>
        <Link href="/hw3/posts/new">Create a new Post</Link>
      </button>
      <button onClick={handleRemovePost}>Remove the last post</button>
      {posts.map((post, index) => (
        <div
          key={index}
          style={{
            width: "30%",
            margin: "10px auto",
            borderStyle: "solid",
          }}
        >
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <img
            src={URL.createObjectURL(post.image)}
            alt={post.title}
            style={{
              maxWidth: "100%",
            }}
          />
          <br />
          <button>
            <Link href={`/hw3/posts/${index}/modify`}>Modify</Link>
          </button>
          <button onClick={() => handleRemoveArbitraryPost(index)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default PostList;
