import React, { useState } from "react";
import { useAvatar } from "../../hooks/useAvatar";
import PostCommentList from "./PostCommentList";
import PropTypes from "prop-types";

const PostComments = ({ post }) => {
  const { avatarURL } = useAvatar(post);
  const [showComments, setShowComments] = useState(false);

  return (
    <div>
      {/* <!-- comment input box --> */}
      <div className="flex-center mb-3 gap-2 lg:gap-4">
        <img
          className="max-w-7 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
          src={avatarURL}
          alt="avatar"
        />

        <div className="flex-1">
          <input
            type="text"
            className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
            name="post"
            id="post"
            placeholder="What's on your mind?"
          />
        </div>
      </div>
      {/* <!-- comment filter button --> */}
      <div className="mt-4">
        <button
          className="text-gray-300 max-md:text-sm"
          onClick={() => setShowComments(!showComments)}
        >
            {showComments ? "Hide" : "Show"} All Comments ▾
        </button>
      </div>

      {showComments && <PostCommentList comments={post?.comments} />}
    </div>
  );
};

PostComments.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.string,
        content: PropTypes.string,
        image: PropTypes.string,
        comments: PropTypes.array,
        createdAt: PropTypes.string,
    })
}

export default PostComments;
