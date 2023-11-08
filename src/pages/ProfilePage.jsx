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
import { changeCurrentUser, getCurrentUser, getCurrentUserAds } from "../api";

const ProfilePage = () => {
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [userAds, setUserAds] = useState();
  const { isAllowed, setIsAllowed } = useAllowedContext();
  const [user, setUser] = useState();
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [city, setCity] = useState();
  const [phone, setPhone] = useState();

  console.log(userAds);

  const handleLogout = () => {
    delToken();
    setIsAllowed(false);
  };

  const token = getAccessToken();

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

  useEffect(() => {
    getUserAds();
    getUser();
  }, []);

  console.log(user);

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
                      placeholder={
                        user && user.name ? user.name : "Введите имя"
                      }
                      name="name"
                      value={name ? name : ""}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col items-start gap-1 w-full input">
                    <p className="font-medium text-[16px]">Фамилия</p>
                    <input
                      className="h-[50px] border-[1px] border-[#00000033] focus:border-[#009EE4] rounded-[6px] w-full flex items-center justify-center px-5 outline-none"
                      type="text"
                      placeholder={
                        user && user.surname ? user.surname : "Введите фамилию"
                      }
                      value={surname ? surname : ""}
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
                      placeholder={
                        user && user.city ? user.city : "Введите город"
                      }
                      value={city ? city : ""}
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
                    type="tel"
                    placeholder={user && user.phone ? user.phone : "+7"}
                    value={phone ? phone : ""}
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
          {/* <div className="flex flex-wrap flex-row gap-7 items-center ">
            {userAds.map((item) => (
              <div key={item.index}>
                <AdvertItem item={item} />
              </div>
            ))}
          </div> */}
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
