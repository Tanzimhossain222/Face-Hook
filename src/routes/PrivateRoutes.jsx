import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import { useAuth } from "../hooks/useAuth";
import ProfileProvider from "../provider/ProfileProvider";
import PostProvider from "../provider/PostProvider";

const PrivateRoutes = () => {
  const { auth } = useAuth();

  return (
    <div>
      {auth.authToken ? (
        <>
          <PostProvider>
            <ProfileProvider>
              <Header />
              <main>
                <div className="container">
                  <Outlet />
                </div>
              </main>
            </ProfileProvider>
          </PostProvider>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default PrivateRoutes;
