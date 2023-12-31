import { Link } from "react-router-dom";
import AdvertItem from "../components/Advert/AdvertItem";

import ButtonBlue from "../components/UI/Buttons/ButtonBlue";
import SectionTitle from "../components/UI/SectionTitle/SectionTitle";
import NewAdv from "../components/Modals/NewAdv";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { delToken, getAccessToken } from "../helpers/AuthHelpers";
import { useAllowedContext } from "../contexts/allowed";
import Header from "../components/Header/Header";
import {
  changeCurrentUser,
  getCurrentUser,
  getCurrentUserAds,
  updateAvatar,
} from "../api";
import Cookies from "js-cookie";
import LightGallery from "lightgallery/react";

const ProfilePage = () => {
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [userAds, setUserAds] = useState();
  const { isAllowed, setIsAllowed } = useAllowedContext();
  const [user, setUser] = useState();
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [city, setCity] = useState();
  const [phone, setPhone] = useState();

  const PATH = "http://localhost:8090";

  const handleLogout = () => {
    delToken();
    setIsAllowed(false);
    navigate("/");
  };

  const token = Cookies.get("accessToken");

  const getUserAds = async () => {
    const responseData = await getCurrentUserAds(token);
    setUserAds(responseData);
  };

  const getUser = async () => {
    const responseData = await getCurrentUser(token);
    setUser(responseData);
  };

  const updateUser = async () => {
    const responseData = await changeCurrentUser(
      token,
      name,
      surname,
      phone,
      city
    );
    setUser(responseData);
  };

  function openAddModal() {
    setAddModalIsOpen(true);
  }

  function closeAddModal() {
    setAddModalIsOpen(false);
  }

  const handleUploadImage = async (event) => {
    let selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      updateAvatar(formData, token);
    }
    getUser();
  };

  useEffect(() => {
    getUserAds();
    getUser();
  }, []);

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
      <Header openAddModal={openAddModal} />
      <div className="relative px-[140px]">
        <div className="h-[50px] w-full flex flex-row items-center justify-start gap-14 my-10 ">
          <img src="/svg/logo.svg" alt="logo" />
          <div className="flex flex-row items-center gap-4">
            <div className="w-[241px]">
              <Link to="/">
                <ButtonBlue text="Вернуться на главную" />
              </Link>
            </div>
            <div className="w-[150px]">
              <Link onClick={handleLogout} to="/">
                <ButtonBlue text="Выйти" />
              </Link>
            </div>
          </div>
        </div>
        {user && (
          <div className="h-full w-full relative">
            {user && user.name && (
              <SectionTitle text={`Здравствуйте, ${user.name}`} />
            )}

            <div className="flex flex-col items-start justify-between mb-[70px]">
              <div className="text-[32px] font-medium text-black pb-5">
                Настройки профиля
              </div>
              <div className="flex flex-row items-start gap-12 w-fit">
                <div className="flex flex-col items-center gap-2">
                  <div className=" h-[170px] w-[170px] rounded-[50%] bg-[#F0F0F0]">
                    {user && user.avatar ? (
                      <LightGallery>
                        <img
                          className="object-cover h-full w-full rounded-[50%]"
                          src={`${PATH}/${user?.avatar}`}
                          alt="image"
                        />
                      </LightGallery>
                    ) : (
                      ""
                    )}
                  </div>
                  <label className="font-normal text-[16px] text-[#009EE4]">
                    Заменить
                    <input
                      type="file"
                      hidden
                      onChange={(e) => {
                        handleUploadImage(e);
                      }}
                    />
                  </label>
                </div>
                <div className="flex flex-col items-start gap-5 w-full relative">
                  <div className="flex flex-row items-center justify-between gap-3 w-full">
                    <div className="flex flex-col items-start gap-1 w-full input">
                      <p className="font-medium text-[16px]">Имя</p>
                      <input
                        className="h-[50px] border-[1px] border-[#00000033] focus:border-[#009EE4] rounded-[6px] w-full flex items-center justify-center px-5 outline-none"
                        type="text"
                        defaultValue={
                          user && user.name ? user.name : "Введите имя"
                        }
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col items-start gap-1 w-full input">
                      <p className="font-medium text-[16px]">Фамилия</p>
                      <input
                        className="h-[50px] border-[1px] border-[#00000033] focus:border-[#009EE4] rounded-[6px] w-full flex items-center justify-center px-5 outline-none"
                        type="text"
                        defaultValue={
                          user && user.surname
                            ? user.surname
                            : "Введите фамилию"
                        }
                        name="surname"
                        onChange={(e) => setSurname(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-between gap-3 w-full">
                    <div className="flex flex-col items-start gap-1 w-full input">
                      <p className="font-medium text-[16px]">Город</p>
                      <input
                        className="h-[50px] border-[1px] border-[#00000033] focus:border-[#009EE4] rounded-[6px] w-full flex items-center justify-center px-5 outline-none"
                        type="text"
                        defaultValue={
                          user && user.city ? user.city : "Введите город"
                        }
                        name="city"
                        onChange={(e) => setCity(e.target.value)}
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
                      type="number"
                      defaultValue={user && user.phone ? user.phone : "+7"}
                      name="phone"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div onClick={() => updateUser()} className="w-[154px]">
                    <ButtonBlue text="Сохранить" />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-[32px] font-medium text-black pb-5">
              Мои товары
            </div>
            <div className="flex flex-wrap flex-row gap-7 items-center ">
              {userAds &&
                userAds.map((item) => (
                  <div key={item.index}>
                    <Link to={`/advertisement/${item.id}`}>
                      <AdvertItem item={item} />
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        )}
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
