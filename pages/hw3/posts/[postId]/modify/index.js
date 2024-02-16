import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import PostContext from "../../../../../contexts/PostContext";

export default function ModifyPost() {
  const router = useRouter();
  const id = router.query.postId;
  const { posts, setPosts } = useContext(PostContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (posts.length !== 0) {
      setTitle(posts[id].title);
      setContent(posts[id].content);
      setImage(posts[id].image);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPosts((prevPosts) =>
      prevPosts.map((post, index) =>
        index === Number(id) ? { title, content, image } : post
      )
    );
    router.push("/hw3/posts");
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Modify your Post</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              width: "30%",
              height: "20px",
              margin: "10px auto",
            }}
          />
        </label>
        <br />
        <label>
          Content
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            style={{
              width: "30%",
              height: "50px",
              margin: "10px auto",
            }}
          />
        </label>
        <br />
        <label>
          Image
          <input
            type="file"
            onChange={handleImageChange}
            style={{
              width: "30%",
              height: "20px",
              margin: "10px auto",
            }}
          />
        </label>
        <br />
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt={""}
            style={{
              width: "30%",
              height: "30%",
              margin: "10px auto",
              borderStyle: "dashed",
            }}
          />
        ) : null}
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
