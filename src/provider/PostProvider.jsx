import PropTypes from "prop-types";
import { useReducer } from "react";
import { PostContext } from "../context";
import { initialState, postReducer } from "../reducers/PostReducer";

const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initialState);

  return (
    <PostContext.Provider value={{ state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
};

PostProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PostProvider;
