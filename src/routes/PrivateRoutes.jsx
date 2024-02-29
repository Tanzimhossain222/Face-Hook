import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import { useAuth } from "../hooks/useAuth";
import ProfileProvider from "../provider/ProfileProvider";

const PrivateRoutes = () => {
  const { auth } = useAuth();

  return (
    <div>
      {auth.authToken ? (
        <>
        <ProfileProvider>
          <Header />
          <main>
            <div className="container">
              <Outlet />
            </div>
          </main>
          </ProfileProvider>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default PrivateRoutes;
