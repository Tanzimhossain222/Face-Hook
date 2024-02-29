import React from "react";
import { useNavigate } from "react-router-dom";
import logoutIcon from "../../assets/icons/logout.svg";
import { useAuth } from "../../hooks/useAuth";
const Logout = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleLogout = () => {
    setAuth({});
    navigate("/login");
  };

  return (
    <>
      {" "}
      <button className="icon-btn" onClick={handleLogout}>
        <img src={logoutIcon} alt="Logout" />
      </button>
    </>
  );
};

export default Logout;
