import React, { useEffect } from "react";
import { actions } from "../actions";
import useAxios from "../api/useAxios";
import ProfileInfo from "../components/profile/ProfileInfo";
import { useAuth } from "../hooks/useAuth";
import useProfile from "../hooks/useProfile";
import MyPosts from "../components/profile/MyPosts";

const ProfilePage = () => {
  const { state, dispatch } = useProfile();

  const { auth } = useAuth();
  const { axiosInstance } = useAxios();

  useEffect(() => {
    dispatch({ type: actions.profile.DATA_FETCHING });
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get(`/profile/${auth?.user?.id}`);
        if (res.status === 200) {
          dispatch({ type: actions.profile.DATA_FETCHED, data: res.data });
        }
      } catch (err) {
        dispatch({
          type: actions.profile.DATA_FETCHED_ERROR,
          error: err.message,
        });
      }
    };

    fetchProfile();
  }, [auth, dispatch, axiosInstance]);

  if (state?.loading) return <div>Loading...</div>;

  return (
    <>
      <ProfileInfo />
      <MyPosts />
    </>
  );
};

export default ProfilePage;
