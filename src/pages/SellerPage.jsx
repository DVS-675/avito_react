import { Link, useParams } from "react-router-dom";
import AdvertItem from "../components/Advert/AdvertItem";
import ButtonBlue from "../components/UI/Buttons/ButtonBlue";
import SectionTitle from "../components/UI/SectionTitle/SectionTitle";
import Modal from "react-modal";
import NewAdv from "../components/Modals/NewAdv";
import { useEffect, useState } from "react";
import { getAllAds, getAllUsers } from "../api";
import Header from "../components/Header/Header";
import NumberButton from "../components/UI/Buttons/ButtonNumber";

const SellerPage = () => {
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

  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const { id } = useParams();
  console.log(id);
  const [users, setUsers] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [ads, setAds] = useState();
  const [userAds, setUserAds] = useState([]);
  const PATH = "http://localhost:8090";

  const getAds = async () => {
    const responseData = await getAllAds();
    setAds(responseData);
  };

  const handleUserAds = () => {
    console.log(ads);
    if (ads) {
      const result = ads.filter((ad) => ad.user_id == currentUser.id);
      setUserAds(result);
    }
  };

  function openAddModal() {
    setAddModalIsOpen(true);
  }

  function closeAddModal() {
    setAddModalIsOpen(false);
  }

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
    <div className="h-full w-full relative">
      <Header openAddModal={openAddModal} />
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
          <SectionTitle text="Профиль продавца" />
          <div className="flex flex-col items-start justify-between mb-[70px]">
            <div className="flex flex-row items-start gap-12">
              {currentUser && currentUser.avatar ? (
                <div className=" h-[170px] w-[170px] rounded-[50%] bg-[#F0F0F0]">
                  <img src={`${PATH}/${currentUser.avatar}`} alt="avatar" />
                </div>
              ) : (
                <div className=" h-[170px] w-[170px] rounded-[50%] bg-[#F0F0F0]"></div>
              )}
              {currentUser && (
                <div className="flex flex-col items-start gap-8">
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
                  <NumberButton phone={currentUser.phone} />
                </div>
              )}
            </div>
          </div>
          <div className="text-[32px] font-medium text-black pb-5">
            Товары продавца
          </div>
          <div className="flex flex-wrap flex-row gap-7 items-center ">
            {userAds.map((item) => (
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
        contentLabel="Update adv modal"
      >
        <NewAdv closeModal={closeAddModal} />
      </Modal>
    </div>
  );
};

export default SellerPage;
