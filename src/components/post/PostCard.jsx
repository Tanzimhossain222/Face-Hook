import PropTypes from "prop-types";
import React from "react";
import PostAction from "./PostAction";
import PostBody from "./PostBody";
import PostComments from "./PostComments";
import PostHeader from "./PostHeader";

const PostCard = ({ post }) => {
  return (
    <>
      <article className="card mt-6 lg:mt-8">
        <PostHeader post={post} />
        <PostBody poster={post?.image} content={post?.content} />
        <PostAction post={post} commentCount={post?.comments?.length} />
        <PostComments post={post} />
      </article>
    </>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string,
    image: PropTypes.string,
    comments: PropTypes.array,
    createdAt: PropTypes.string,
    author: PropTypes.object,
  }),
};

export default PostCard;
