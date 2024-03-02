import React, { useEffect } from "react";
import { actions } from "../actions";
import useAxios from "../api/useAxios";
import NewPost from "../components/post/NewPost";
import PostList from "../components/post/PostList";
import { usePost } from "../hooks/usePost";

const Home = () => {
  const { state, dispatch } = usePost();
  const { axiosInstance } = useAxios();

  useEffect(() => {
    dispatch({ type: actions.post.DATA_FETCHING });

    const fetchPost = async () => {
      try {
        const response = await axiosInstance.get("/posts");

        if (response.status === 200) {
          dispatch({ type: actions.post.DATA_FETCHED, data: response.data });
        }
      } catch (err) {
        console.error(err);
        dispatch({ type: actions.post.DATA_FETCH_ERROR, error: err });
      }
    };
    fetchPost();
  }, [axiosInstance, dispatch]);

  if (state?.loading) return <div>Loading...</div>;
  if (state?.error)
    return <div>Error in fetching posts : {state?.error?.message} </div>;

  return (
    <div>
      <NewPost />
      <PostList posts={state?.posts} />
    </div>
  );
};

export default Home;
