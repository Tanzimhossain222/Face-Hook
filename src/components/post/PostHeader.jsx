import PropTypes from "prop-types";
import React, { useState } from "react";
import threeDotsIcon from "../../assets/icons/3dots.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import editIcon from "../../assets/icons/edit.svg";
import timeIcon from "../../assets/icons/time.svg";
import { useAvatar } from "../../hooks/useAvatar";
import { getDateDiff } from "../../utils";

const PostHeader = ({ post }) => {
  const [showActionModal, setShowActionModal] = useState(false);
  const { avatarURL } = useAvatar(post);

  const toggleAction = () => {
    setShowActionModal(!showActionModal);
  };

  return (
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
        <button>
          <img
            src={threeDotsIcon}
            alt="3dots of Action"
            onClick={toggleAction}
          />
        </button>

        {/* <!-- Action Menus Popup --> */}
        {showActionModal && (
          <div className="action-modal-container">
            <>
              <button className="action-menu-item hover:text-lwsGreen">
                <img src={editIcon} alt="Edit" />
                Edit
              </button>
              <button className="action-menu-item hover:text-red-500">
                <img src={deleteIcon} alt="Delete" />
                Delete
              </button>
            </>
          </div>
        )}
      </div>
    </header>
  );
};

PostHeader.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostHeader;
