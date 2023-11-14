import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const MobileMenu = ({
  openAddModal,
  openProfileModal,
  closeAddModal,
  closeProfileModal,
}) => {
  const navigate = useNavigate();

  const handleClose = () => {
    if (closeProfileModal) {
      closeProfileModal();
    }
    if (openAddModal) {
      closeAddModal();
    }
    navigate("/");
  };

  const handleAdd = () => {
    if (openProfileModal) {
      closeProfileModal();
    }

    openAddModal();
  };

  const handleProfile = () => {
    openProfileModal();
  };

  return (
    <div className=" w-full h-[54px] bottom-0 sticky px-5 bg-white mt-5 z-30">
      <div className="w-full h-full flex flex-row items-center justify-between">
        <div onClick={() => handleClose()}>
          <img
            className="object-cover h-[25px] w-[30px]"
            src="/svg/home_mobile.svg"
            alt="home"
          />
        </div>
        <div onClick={() => handleAdd()}>
          <img
            className="object-cover h-[42px] w-[42px]"
            src="/svg/add_ad_mobile.svg"
            alt="home"
          />
        </div>

        <div onClick={() => handleProfile()}>
          <img
            className="object-cover h-[25px] w-[25px]"
            src="/svg/profile_mobile.svg"
            alt="home"
          />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
