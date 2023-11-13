import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Cookies from "js-cookie";
import { getAllAds, getAllUsers } from "../../api";
import ButtonNumber from "../UI/Buttons/ButtonNumber";
import { Link } from "react-router-dom";
import AdvertItem from "../Advert/AdvertItem";

const SellerPageModal = ({ closeModal, id }) => {
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const token = Cookies.get("accessToken");

  const PATH = "http://localhost:8090";

  const [users, setUsers] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [ads, setAds] = useState();
  const [userAds, setUserAds] = useState([]);

  const getAds = async () => {
    const responseData = await getAllAds();
    console.log(responseData);
    setAds(responseData);
  };

  const handleUserAds = () => {
    console.log(ads);
    if (ads) {
      const result = ads.filter((ad) => ad.user_id == currentUser.id);
      setUserAds(result);
    }
  };

  const getUsers = async () => {
    const responseData = await getAllUsers();
    setUsers(responseData);
  };

  const handleCurrentUser = () => {
    if (users) {
      users.map((item) => {
        item.id == id ? setCurrentUser(item) : "";
      });
    }
  };

  useEffect(() => {
    getUsers();
    getAds();
  }, []);

  useEffect(() => {
    handleCurrentUser();
  }, [users]);

  useEffect(() => {
    handleUserAds();
  }, [currentUser]);

  console.log(userAds);

  return (
    <div className="relative flex justify-center items-center w-full h-full ">
      <div className="h-full w-full bg-white px-5 py-[30px] pb-[70px] overflow-y-auto  ">
        <div className="flex flex-col items-start gap-5">
          <div className="w-full flex flex-row items-center gap-10 ">
            <div onClick={closeModal} className="cursor-pointer">
              <img
                className="h-[18px] w-full"
                src="/svg/back_button.svg"
                alt="image"
              />
            </div>
            <p className="text-[24px] font-medium ">Профиль продавца</p>
          </div>
          {currentUser && (
            <div className="flex flex-col items-start gap-8 w-full">
              <div className="flex flex-col items-start gap-2">
                <div className="text-[20px] font-[600] text-black">
                  {`${currentUser.name} ${currentUser.surname}`}
                </div>
                <div className="flex flex-col items-start gap-1">
                  <div className="text-[16px] font-normal text-[#5F5F5F]">
                    {currentUser.city}
                  </div>
                  <div className="text-[16px] font-normal text-[#5F5F5F]">
                    {`Продает товары с ${
                      months[new Date(currentUser.sells_from).getMonth()]
                    } ${new Date(currentUser.sells_from).getFullYear()}`}
                  </div>
                </div>
              </div>
              {currentUser && currentUser.avatar ? (
                <div className="w-full flex items-center justify-center">
                  <div className=" h-[132px] w-[132px] rounded-[50%] bg-[#F0F0F0] overflow-hidden">
                    <img src={`${PATH}/${currentUser.avatar}`} alt="avatar" />
                  </div>
                </div>
              ) : (
                <div className="w-full flex items-center justify-center">
                  <div className=" h-[132px] w-[132px] rounded-[50%] bg-[#F0F0F0] overflow-hidden" />
                </div>
              )}
              <div className="w-full">
                <ButtonNumber phone={currentUser.phone} />
              </div>
              <div className="text-[32px] font-medium text-black pb-5">
                Товары продавца
              </div>
              <div className="flex flex-wrap flex-row gap-2 items-center ">
                {userAds.map((item) => (
                  <div onClick={closeModal} key={item.index}>
                    <Link to={`/advertisement/${item.id}`}>
                      <AdvertItem item={item} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerPageModal;
