import React, { useState } from "react";
import { useAvatar } from "../../hooks/useAvatar";
import PostCommentList from "./PostCommentList";
import PropTypes from "prop-types";
import useAxios from "../../api/useAxios";
import { useAuth } from "../../hooks/useAuth";

const PostComments = ({ post }) => {
  const {auth} = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const {axiosInstance} = useAxios();

  const addComment =async (e) => {
    const keyCode = e.keyCode;

    if (keyCode === 13) {
      try{
        const res = await axiosInstance.patch(`/posts/${post?.id}/comment`,{comment})

        if (res.status === 200) {
          setComments([...comments, ...res.data.comments]);
          setComment("");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }


  return (
    <div>
      {/* <!-- comment input box --> */}
      <div className="flex-center mb-3 gap-2 lg:gap-4">
        <img
          className="max-w-7 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
          src={`${import.meta.env.VITE_SERVER_BASE_URL}/${auth?.user?.avatar}`}
          alt="avatar"
        />

        <div className="flex-1">
          <input
            type="text"
            className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
            name="post"
            id="post"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={e => addComment(e)  }
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

      {showComments && <PostCommentList comments={comments} />}
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
