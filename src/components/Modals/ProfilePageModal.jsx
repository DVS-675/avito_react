import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  changeCurrentUser,
  getCurrentUser,
  getCurrentUserAds,
  updateAvatar,
} from "../../api";

import { useAllowedContext } from "../../contexts/allowed";
import ButtonBlue from "../UI/Buttons/ButtonBlue";
import AdvertItem from "../Advert/AdvertItem";
import { Link, useNavigate } from "react-router-dom";
import SectionTitle from "../UI/SectionTitle/SectionTitle";
import LightGallery from "lightgallery/react";
import { delToken } from "../../helpers/AuthHelpers";

const ProfilePageModal = ({ closeModal }) => {
  const [userAds, setUserAds] = useState();
  const { isAllowed, setIsAllowed } = useAllowedContext();
  const [user, setUser] = useState();
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [city, setCity] = useState();
  const [phone, setPhone] = useState();
  const navigate = useNavigate();

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

  return (
    <div className="relative flex justify-center items-center w-full h-full overflow-y-auto ">
      <div className="h-full w-full bg-white px-5 pb-[70px]">
        <div className="h-full w-full relative">
          {user && user.name && (
            <SectionTitle text={`Здравствуйте, ${user.name}`} />
          )}
          <div className="flex flex-col items-start justify-between mb-10">
            <div className="text-[18px] font-medium text-black pb-5">
              Настройки профиля
            </div>
            {user && (
              <div className="flex flex-col items-center gap-2 w-full">
                <div className="flex flex-col items-center gap-2">
                  {user && user.avatar ? (
                    <div className="w-full flex items-center justify-center">
                      <div className=" h-[132px] w-[132px] rounded-[50%] bg-[#F0F0F0] overflow-hidden">
                        <img src={`${PATH}/${user.avatar}`} alt="avatar" />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full flex items-center justify-center">
                      <div className=" h-[132px] w-[132px] rounded-[50%] bg-[#F0F0F0] overflow-hidden" />
                    </div>
                  )}

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
                <div className="flex flex-col items-start gap-3 w-full relative">
                  <div className="flex flex-col items-start gap-1 w-full input">
                    <p className="text-[14px] font-[400] ml-5">Имя</p>
                    <input
                      className="h-[50px] text-[14px] border-[1px] border-[#00000033] focus:border-[#009EE4] rounded-[30px] w-full flex items-center justify-center px-5 outline-none"
                      type="text"
                      defaultValue={
                        user && user.name ? user.name : "Введите имя"
                      }
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col items-start gap-1 w-full input">
                    <p className="text-[14px] font-[400] ml-5">Фамилия</p>
                    <input
                      className="h-[50px] text-[14px] border-[1px] border-[#00000033] focus:border-[#009EE4] rounded-[30px] w-full flex items-center justify-center px-5 outline-none"
                      type="text"
                      defaultValue={
                        user && user.surname ? user.surname : "Введите фамилию"
                      }
                      name="surname"
                      onChange={(e) => setSurname(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col items-start gap-1 w-full input">
                    <div className="flex flex-col items-start gap-1 w-full input">
                      <p className="text-[14px] font-[400] ml-5">Город</p>
                      <input
                        className=" h-[50px] text-[14px] border-[1px] border-[#00000033] focus:border-[#009EE4] rounded-[30px] w-full flex items-center justify-center px-5 outline-none"
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
                      className="input_label text-[14px] font-[400] ml-5"
                    >
                      Телефон
                    </p>
                    <input
                      mask="+7 (999) 999-99-99"
                      className="h-[50px] text-[14px] border-[1px] border-[#00000033] focus:border-[#009EE4] rounded-[30px] w-full flex items-center justify-center px-5 outline-none"
                      type="tel"
                      defaultValue={user && user.phone ? user.phone : "+7"}
                      name="phone"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div onClick={() => updateUser()} className="w-full">
                    <ButtonBlue text="Сохранить" />
                  </div>
                  <div onClick={() => handleLogout()} className="w-full">
                    <ButtonBlue text="Выйти" />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="text-[18px] font-medium text-black pb-5">
            Мои товары
          </div>
          <div className="flex flex-wrap flex-row gap-7 items-center ">
            {userAds &&
              userAds.map((item) => (
                <div onClick={closeModal} key={item.index}>
                  <Link to={`/advertisement/${item.id}`}>
                    <AdvertItem item={item} />
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageModal;
