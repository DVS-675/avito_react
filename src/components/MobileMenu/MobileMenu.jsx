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
    if (openAddModal) {
      closeAddModal();
    }
    openProfileModal();
  };

  return (
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
  );
};

export default MobileMenu;
