import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../api/useAxios";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { auth } = useAuth();
  const { axiosInstance } = useAxios();

  useEffect(() => {
    setLoading(true);
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get(`/profile/${auth?.user?.id}`);
        const {user,posts} = res.data;
        setUser(user);
        setPost(posts);
      } catch (err) {
        console.log(err);
        setError(err);
      }finally{
        setLoading(false);
      }
    };

    fetchProfile();
  }, [auth, axiosInstance]);

  if (loading) return <div>Loading...</div>;

  return <div>ProfilePage</div>;
};

export default ProfilePage;
