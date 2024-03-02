import PropTypes from "prop-types";
import React, { useState } from "react";
import commentIcon from "../../assets/icons/comment.svg";
import likeIcon from "../../assets/icons/like.svg";
import likedIcon from "../../assets/icons/like_filled.svg";
import shareIcon from "../../assets/icons/share.svg";
import useAxios from "../../api/useAxios";
import { useAuth } from "../../hooks/useAuth";

const PostAction = ({post,  commentCount }) => {
  const {auth} = useAuth();
  const [liked, setLiked] = useState(post?.likes?.includes(auth?.user?.id) ?? false );
  const {axiosInstance} = useAxios();


  const handleLike = async () => {
    try {
      const res = await axiosInstance.patch(`/posts/${post?.id}/like`);

      if (res.status === 200) {
        setLiked(!liked);

      }
    }
    catch (error) {
      console.log(error);
    }
  }

   return (
    <div className="flex items-center justify-between py-6 lg:px-10 lg:py-8">
      <button className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm"
      onClick={handleLike}
      >
        <img src={liked? likedIcon : likeIcon} alt="Like" />
        {liked ? 
        (<span>Unlike</span>) : 
        (<span>Like</span>)}
      </button>

      <button className="icon-btn space-x-2 px-6 py-3 text-xs lg:px-12 lg:text-sm">
        <img src={commentIcon} alt="Comment" />
        <span>Comment({commentCount ?? 0})</span>
      </button>

      <button className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm">
        <img src={shareIcon} alt="Share" />
        <span>Share</span>
      </button>
    </div>
  );
};

PostAction.propTypes = {
  post: PropTypes.object,
  commentCount: PropTypes.number,
};

export default PostAction;
