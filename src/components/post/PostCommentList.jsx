import PropTypes from "prop-types";
import React from "react";

const PostCommentList = ({ comments = [] }) => {
  return (
    <div className="space-y-4 divide-y divide-lighterDark pl-2 lg:pl-3">
      {comments &&
        comments?.length > 0 &&
        comments.map((comment) => (
          <div key={comments.id} className="flex items-center gap-3 pt-4">
            <img
              className="max-w-6 max-h-6 rounded-full"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/${
                comment?.author?.avatar
              }`}
              alt="avatar"
            />
            <div>
              <div className="flex gap-1 text-xs lg:text-sm">
                <span>Tapas Adhikari: </span>
                <span>{comment?.comment}</span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

PostCommentList.propTypes = {
  comments: PropTypes.array,
};

export default PostCommentList;
