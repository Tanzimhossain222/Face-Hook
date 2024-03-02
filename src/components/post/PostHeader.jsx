import PropTypes from "prop-types";
import React, { useState } from "react";
import { actions } from "../../actions";
import useAxios from "../../api/useAxios";
import threeDotsIcon from "../../assets/icons/3dots.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import editIcon from "../../assets/icons/edit.svg";
import timeIcon from "../../assets/icons/time.svg";
import { useAuth } from "../../hooks/useAuth";
import { useAvatar } from "../../hooks/useAvatar";
import { usePost } from "../../hooks/usePost";
import { getDateDiff } from "../../utils";
import PostEntry from "./PostEntry";

const PostHeader = ({ post }) => {
  const [showActionModal, setShowActionModal] = useState(false);
  const [showPostEntry, setShowPostEntry] = useState(false);
  const { avatarURL } = useAvatar(post);
  const { auth } = useAuth();
  const { axiosInstance } = useAxios();
  const { dispatch } = usePost();

  const isMe = post?.author?.id === auth?.user?.id;

  const toggleAction = () => {
    setShowActionModal(!showActionModal);
  };

  const handleDeletePost = async (e) => {
    dispatch({ type: actions.post.DATA_FETCHING });
    try {
      const res = await axiosInstance.delete(`/posts/${post.id}`);
      if (res.status === 200) {
        dispatch({ type: actions.post.POST_DELETED, data: post.id });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: actions.post.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  const handleEditPost = () => {
    setShowPostEntry(true);
  };

  return (
    <>
      {showPostEntry ? (
        <PostEntry onCreate={() => setShowPostEntry(false)} post={post} />
      ) : (
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
              src={avatarURL}
              alt="avatar"
            />
            <div>
              <h6 className="text-lg lg:text-xl"> {post?.author?.name} </h6>
              <div className="flex items-center gap-1.5">
                <img src={timeIcon} alt="time" />
                <span className="text-sm text-gray-400 lg:text-base">
                  {`${getDateDiff(post?.createAt)}`} ago
                </span>
              </div>
            </div>
          </div>

          <div className="relative">
            {isMe && (
              <button>
                <img
                  src={threeDotsIcon}
                  alt="3dots of Action"
                  onClick={toggleAction}
                />
              </button>
            )}

            {showActionModal && (
              <div className="action-modal-container">
                <>
                  <button
                    className="action-menu-item hover:text-lwsGreen"
                    onClick={handleEditPost}
                  >
                    <img src={editIcon} alt="Edit" />
                    Edit
                  </button>
                  <button
                    className="action-menu-item hover:text-red-500"
                    onClick={handleDeletePost}
                  >
                    <img src={deleteIcon} alt="Delete" />
                    Delete
                  </button>
                </>
              </div>
            )}
          </div>
        </header>
      )}
    </>
  );
};

PostHeader.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostHeader;
