import ButtonBlue from "../components/UI/Buttons/ButtonBlue.jsx";
import Header from "../components/Header/Header.jsx";
import SectionTitle from "../components/UI/SectionTitle/SectionTitle.jsx";
import AdvertItem from "../components/Advert/AdvertItem.jsx";
import { useEffect, useState } from "react";
import { getAllAds } from "../api.jsx";
import { getSearchingTracks } from "../helpers/helpers.jsx";
import Modal from "react-modal";
import NewAdv from "../components/Modals/NewAdv.jsx";
import { Link } from "react-router-dom";
import { useResize } from "../helpers/hooks/useResize.jsx";
import MobileMenu from "../components/MobileMenu/MobileMenu.jsx";

const MainPage = () => {
  const [ads, setAds] = useState();
  const [filteredAds, setFilteredAds] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);

  function openAddModal() {
    setAddModalIsOpen(true);
  }

  function closeAddModal() {
    setAddModalIsOpen(false);
  }

  const getAds = async () => {
    const responseData = await getAllAds();
    setAds(responseData);
  };

  const HandleFilterAds = () => {
    let filteredAds = ads;

    if (searchValue) {
      filteredAds = filteredAds
        ? getSearchingTracks(filteredAds, searchValue)
        : null;
    }
    setFilteredAds(filteredAds);
  };

  useEffect(() => {
    getAds();
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

  const { isScreenLg } = useResize();

  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, [isScreenLg]);

  return (
    <div className="h-full w-full relative">
      {isScreenLg ? (
        <Header openAddModal={openAddModal} />
      ) : (
        <div className="w-full sticky top-0 h-20 bg-[#009EE4] flex items-center px-5 z-20">
          <Link to="/">
            <div className="w-12 h-12 flex items-center justify-center bg-white rounded-[50%]">
              <img className="h-8 w-8" src="/svg/logo.svg" alt="logo" />
            </div>
          </Link>
          <div className="ml-3 flex flex-row w-full gap-1 h-12 items-center ">
            <input
              className="h-full border-[1px] border-[#00000033] active:border-[#009EE4] rounded-[30px] w-full flex items-center justify-center px-5 outline-none"
              type="search"
              placeholder="Поиск"
              name="search"
              onInput={(e) => setSearchValue(e.target.value)}
            />
            <div onClick={HandleFilterAds} className="w-[50px]">
              <ButtonBlue text="Найти" />
            </div>
          </div>
        </div>
      )}

      <div className="relative px-5 lg:px-[140px]">
        <div className="hidden h-[50px] w-full lg:flex flex-row items-center justify-between gap-14 my-10 ">
          <img src="/svg/logo.svg" alt="logo" />
          <div className="flex flex-row w-full gap-2">
            <input
              className="border-[1px] border-[#00000033] active:border-[#009EE4] rounded-[6px] w-full flex items-center justify-center px-5 outline-none"
              type="search"
              placeholder="Поиск по объявлениям"
              name="search"
              onInput={(e) => setSearchValue(e.target.value)}
            />
            <div onClick={HandleFilterAds} className="w-[158px]">
              <ButtonBlue text="Найти" />
            </div>
          </div>
        </div>
        <div className="h-full w-full relative">
          <SectionTitle text="Объявления" />
          <div className="flex flex-wrap flex-row gap-3 lg:gap-7 items-center justify-center lg:justify-start">
            {filteredAds
              ? filteredAds.map((item) => (
                  <div key={item.id}>
                    <Link to={`/advertisement/${item.id}`}>
                      <AdvertItem item={item} />
                    </Link>
                  </div>
                ))
              : ads &&
                ads.map((item) => (
                  <div key={item.id}>
                    <Link to={`/advertisement/${item.id}`}>
                      <AdvertItem item={item} />
                    </Link>
                  </div>
                ))}
          </div>
        </div>
      </div>
      {isScreenLg ? <div /> : <MobileMenu openAddModal={openAddModal} />}
      <Modal
        isOpen={addModalIsOpen}
        onRequestClose={closeAddModal}
        style={customStyles}
        contentLabel="Add adv modal"
      >
        <NewAdv closeModal={closeAddModal} getAds={getAds} />
      </Modal>
    </div>
  );
};

export default MainPage;
