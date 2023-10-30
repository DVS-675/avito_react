import { Link } from "react-router-dom";
import HeaderLogged from "../components/Header/HeaderLogged";
import ButtonBlue from "../components/UI/Buttons/ButtonBlue";
import Modal from "react-modal";
import ReviewsModal from "../components/Modals/ReviewsModal";
import React, { useState } from "react";
import NewAdv from "../components/Modals/NewAdv";
import UpdateAdv from "../components/Modals/UpdateAdv";

const AdvPage = () => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "90vh",
      background: "transparent",
      width: "50vw",
      border: "none",
    },
    overlay: {
      zIndex: "100",
      background: "rgba(45, 45, 45, 0.85)",
    },
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = React.useState(false);
  const [myAdv, setMyAdv] = useState(true);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);

  function openAddModal() {
    setAddModalIsOpen(true);
  }

  function closeAddModal() {
    setAddModalIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function openUpdateModal() {
    setUpdateModalIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function closeUpdateModal() {
    setUpdateModalIsOpen(false);
  }

  return (
    <div className="h-full w-full relative">
      <HeaderLogged openAddModal={openAddModal} />
      <div className="relative px-[140px]">
        <div className="h-[50px] w-full flex flex-row items-center justify-start gap-14 my-10 ">
          <img src="/svg/logo.svg" alt="logo" />
          <div className="w-[241px]">
            <Link to="/">
              <ButtonBlue text="Вернуться на главную" />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-10 w-full my-10">
          <div className="col-span-4">
            <div className="flex flex-col items-center justify-between gap-7 w-full">
              <div className="w-full bg-[#F0F0F0] aspect-square" />
              <div className="w-full flex flex-row items-center justify-between gap-[10px] overflow-hidden">
                <div className="h-[88px] aspect-square bg-[#F0F0F0]" />
                <div className="h-[88px] aspect-square bg-[#F0F0F0]" />
                <div className="h-[88px] aspect-square bg-[#F0F0F0]" />
                <div className="h-[88px] aspect-square bg-[#F0F0F0]" />
              </div>
            </div>
          </div>
          <div className="col-span-8">
            <div className="flex flex-col items-start gap-8">
              <div className="flex flex-col items-start gap-2">
                <div className="text-[32px] font-bold text-black">
                  Ракетка для большого тенниса Triumph Pro STС Б/У
                </div>
                <div className="flex flex-col items-start gap-1">
                  <div className="text-[16px] font-normal text-[#5F5F5F]">
                    Сегодня в 10:45
                  </div>
                  <div className="text-[16px] font-normal text-[#5F5F5F]">
                    Санкт-Петербург
                  </div>
                  <div
                    onClick={openModal}
                    className="text-[16px] font-normal text-[#009EE4] cursor-pointer"
                  >
                    23 отзыва
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start gap-5">
                <div className="text-[32px] font-bold text-black">2200 ₽</div>
                {myAdv ? (
                  <div className="flex flex-row gap-3 items-center">
                    <div onClick={openUpdateModal}>
                      <ButtonBlue text="Редактировать" />
                    </div>
                    <div>
                      <ButtonBlue text="Снять с публикации" />
                    </div>
                  </div>
                ) : (
                  <ButtonBlue
                    text="Показать телефон 8 905 ХХХ ХХ ХХ"
                    size="big"
                  />
                )}
              </div>
              <div className="flex flex-row items-center gap-4">
                <div className="w-[40px] h-[40px] rounded-[50%] bg-[#F0F0F0]" />
                <div className="flex flex-col items-start ">
                  <div className="text-[20px] font-semibold text-[#009EE4]">
                    Кирилл
                  </div>
                  <div className="text-[16px] font-normal text-[#5F5F5F]">
                    Продает товары с августа 2021
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-5 h-full my-10 w-[60%]">
          <div className="text-[32px] font-medium text-[#000]">
            Описание товара
          </div>
          <div className="text-[16px] font-normal text-[#000]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Reviews Modal"
        >
          <ReviewsModal closeModal={closeModal} />
        </Modal>
        <Modal
          isOpen={updateModalIsOpen}
          onRequestClose={closeUpdateModal}
          style={customStyles}
          contentLabel="Update adv modal"
        >
          <UpdateAdv closeModal={closeUpdateModal} />
        </Modal>
        <Modal
          isOpen={addModalIsOpen}
          onRequestClose={closeAddModal}
          style={customStyles}
          contentLabel="Update adv modal"
        >
          <NewAdv closeModal={closeAddModal} />
        </Modal>
      </div>
    </div>
  );
};

export default AdvPage;
