import PropTypes from "prop-types";
import React from "react";
import PostCard from "./PostCard";

const PostList = ({ posts }) => {
  return (
    <>
      {!!posts && posts.map((post) => <PostCard key={post.id} post={post} />)}
    </>
  );
};

PostList.propTypes = {
  posts: PropTypes.array,
};

export default PostList;
