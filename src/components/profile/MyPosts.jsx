import React from "react";
import { usePost } from "../../hooks/usePost";
import PostList from "../post/PostList";

const MyPosts = () => {
  const { state } = usePost();
  const posts = state?.posts;
  return (
    <>
      <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Posts</h4>

      <PostList posts={posts} />
    </>
  );
};

export default MyPosts;
