import { Link } from "react-router-dom";
import AdvertItem from "../components/Advert/AdvertItem";
import HeaderLogged from "../components/Header/HeaderLogged";
import ButtonBlue from "../components/UI/Buttons/ButtonBlue";
import SectionTitle from "../components/UI/SectionTitle/SectionTitle";
import NewAdv from "../components/Modals/NewAdv";
import Modal from "react-modal";
import { useState } from "react";

const ProfilePage = () => {
  const data = [
    {
      index: 1,
      title: "Ракетка",
      price: 2200,
      city: "Санкт-Петербург",
      time: "23.09.2000",
    },
    {
      index: 2,
      title: "Мяч",
      price: 200,
      city: "Санкт-Петербург",
      time: "23.09.2005",
    },
    {
      index: 3,
      title: "Куртка",
      price: 20000,
      city: "Тюмень",
      time: "23.09.2005",
    },
    {
      index: 4,
      title: "Лыжи",
      price: 15000,
      city: "Санкт-Петербург",
      time: "23.09.2005",
    },
  ];
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);

  function openAddModal() {
    setAddModalIsOpen(true);
  }

  function closeAddModal() {
    setAddModalIsOpen(false);
  }

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
        <div className="h-full w-full relative">
          <SectionTitle text="Здравствуйте, Дмитрий" />
          <div className="flex flex-col items-start justify-between mb-[70px]">
            <div className="text-[32px] font-medium text-black pb-5">
              Настройки профиля
            </div>
            <div className="flex flex-row items-start gap-12">
              <div className="flex flex-col items-center gap-2">
                <div className=" h-[170px] w-[170px] rounded-[50%] bg-[#F0F0F0]" />
                <p className="font-normal text-[16px] text-[#009EE4]">
                  Заменить
                </p>
              </div>
              <div className="flex flex-col items-start gap-5 w-[614px] relative">
                <div className="flex flex-row items-center justify-between gap-3 w-full">
                  <div className="flex flex-col items-start gap-1 w-full input">
                    <p className="font-medium text-[16px]">Имя</p>
                    <input
                      className="h-[50px] border-[1px] border-[#00000033] focus:border-[#009EE4] rounded-[6px] w-full flex items-center justify-center px-5 outline-none"
                      type="text"
                      placeholder="Введите имя"
                      name="name"
                    />
                  </div>
                  <div className="flex flex-col items-start gap-1 w-full input">
                    <p className="font-medium text-[16px]">Фамилия</p>
                    <input
                      className="h-[50px] border-[1px] border-[#00000033] focus:border-[#009EE4] rounded-[6px] w-full flex items-center justify-center px-5 outline-none"
                      type="text"
                      placeholder="Введите фамилию"
                      name="surname"
                    />
                  </div>
                </div>
                <div className="flex flex-row items-center justify-between gap-3 w-full">
                  <div className="flex flex-col items-start gap-1 w-full input">
                    <p className="font-medium text-[16px]">Город</p>
                    <input
                      className="h-[50px] border-[1px] border-[#00000033] focus:border-[#009EE4] rounded-[6px] w-full flex items-center justify-center px-5 outline-none"
                      type="text"
                      placeholder="Введите город"
                      name="city"
                    />
                  </div>
                  <div className="w-full" />
                </div>
                <div className="flex flex-col items-start gap-1 w-full input">
                  <p
                    form="phone"
                    className="input_label font-medium text-[16px]"
                  >
                    Телефон
                  </p>
                  <input
                    mask="+7 (999) 999-99-99"
                    className="h-[50px] border-[1px] border-[#00000033] focus:border-[#009EE4] rounded-[6px] w-full flex items-center justify-center px-5 outline-none"
                    type="tel"
                    placeholder="+7"
                    name="phone"
                  />
                </div>
                <div className="w-[154px]">
                  <ButtonBlue text="Сохранить" />
                </div>
              </div>
            </div>
          </div>
          <div className="text-[32px] font-medium text-black pb-5">
            Мои товары
          </div>
          <div className="flex flex-wrap flex-row gap-7 items-center ">
            {data.map((item) => (
              <div key={item.index}>
                <AdvertItem item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal
        isOpen={addModalIsOpen}
        onRequestClose={closeAddModal}
        style={customStyles}
        contentLabel="Add adv modal"
      >
        <NewAdv closeModal={closeAddModal} />
      </Modal>
    </div>
  );
};

export default ProfilePage;
