import React from "react";
import { Link } from "react-router-dom";

const MobileMenu = ({ openAddModal }) => {
  return (
    <div className=" w-full h-[54px] bottom-0 sticky px-5 bg-white mt-5">
      <div className="w-full h-full flex flex-row items-center justify-between">
        <Link to="/">
          <img
            className="object-cover h-[25px] w-[30px]"
            src="/svg/home_mobile.svg"
            alt="home"
          />
        </Link>
        <div onClick={openAddModal}>
          <img
            className="object-cover h-[42px] w-[42px]"
            src="/svg/add_ad_mobile.svg"
            alt="home"
          />
        </div>

        <Link to="/profile">
          <img
            className="object-cover h-[25px] w-[25px]"
            src="/svg/profile_mobile.svg"
            alt="home"
          />
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
