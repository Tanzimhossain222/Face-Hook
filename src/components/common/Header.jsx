import React from "react";
import { Link } from "react-router-dom";
import homeIcon from "../../assets/icons/home.svg";
import notificationIcon from "../../assets/icons/notification.svg";
import avatar1 from "../../assets/images/avatars/image1.png";
import Logo from "../../assets/images/logo.svg";
import Logout from "../auth/Logout";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
  const { auth } = useAuth();
  console.log(auth);
  return (
    <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
      <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
        {/* <!-- Logo --> */}
        <Link to="/">
          <img
            className="max-w-[100px] rounded-full lg:max-w-[130px]"
            src={Logo}
            alt="Logo"
          />
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/" className="btn-primary">
            <img src={homeIcon} alt="Home" />
            Home
          </Link>
          <button className="icon-btn">
            <img src={notificationIcon} alt="Notification" />
          </button>
          <Logout />

          <Link to="/me" className="flex-center !ml-8 gap-3">
            <span className="text-lg font-medium lg:text-xl">Tanzim</span>
            <img
              className="max-h-[32px] max-w-[32px] lg:max-h-[44px] lg:max-w-[44px]"
              src={avatar1}
              alt="Avatar"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
