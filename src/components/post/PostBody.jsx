import PropTypes from "prop-types";
import React from "react";

const PostBody = ({ poster, content }) => {
  return (
    <div className="border-b border-[#3F3F3F] py-4 lg:py-5 lg:text-xl">
      {/* <!-- If Post has Image, Render this block --> */}

      <p>{content || "No Content"}</p>

      <div className="flex items-center justify-center overflow-hidden">
        {poster && (
          <img
            className="w-1/2 mt-2"
            src={`${import.meta.env.VITE_SERVER_BASE_URL}/${poster}`}
            alt="poster"
          />
        )}
      </div>
    </div>
  );
};

PostBody.propTypes = {
  poster: PropTypes.string,
  content: PropTypes.string,
};

export default PostBody;
