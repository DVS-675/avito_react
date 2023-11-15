import { Link, useParams } from "react-router-dom";
import LightGallery from "lightgallery/react";
import ButtonBlue from "../components/UI/Buttons/ButtonBlue";
import Modal from "react-modal";
import ReviewsModal from "../components/Modals/ReviewsModal";
import React, { useEffect, useState } from "react";
import NewAdv from "../components/Modals/NewAdv";
import UpdateAdv from "../components/Modals/UpdateAdv";
import { deleteAd, getAd, getAdsFeedback, getCurrentUser } from "../api";
import { formatDistance } from "date-fns";
import { ru } from "date-fns/locale";
import Header from "../components/Header/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import ButtonNumber from "../components/UI/Buttons/ButtonNumber";
import Cookies from "js-cookie";
import { useResize } from "../helpers/hooks/useResize";
import MobileMenu from "../components/MobileMenu/MobileMenu";
import { Pagination } from "swiper";
import ReviewsModalMobile from "../components/Modals/ReviewsModalMobile";
import SellerPageModal from "../components/Modals/SellerPageModal";
import UpdateAdvMobile from "../components/Modals/UpdateAdvMobile";
import NewAdvMobile from "../components/Modals/NewAdvMobile";
import ProfilePageModal from "../components/Modals/ProfilePageModal";
const AdvPage = () => {
  const { id } = useParams();
  const [reviewsModalIsOpen, setReviewsModalIsOpen] = React.useState(false);
  const [sellerPageModal, setSellerPageModal] = useState(false);
  const [profileModalIsOpen, setProfileModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = React.useState(false);

  const [myAdv, setMyAdv] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [feedback, setFeedback] = useState();
  const [ad, setAd] = useState();
  const [deletedAdd, setDeletedAdd] = useState(false);
  const PATH = "http://localhost:8090";
  const token = Cookies.get("accessToken");

  const adsFeedback = async () => {
    const feedback = await getAdsFeedback(id);
    setFeedback(feedback);
  };

  const currentAd = async () => {
    const ad = await getAd(id);
    setAd(ad);
    const user = await getCurrentUser(token);
    if (ad.user.id === user.id) {
      setMyAdv(true);
    } else {
      setMyAdv(false);
    }
  };

  const handleDeleteAdd = async () => {
    await deleteAd(ad.id, token);
    setDeletedAdd(true);
  };

  useEffect(() => {
    adsFeedback();
    currentAd();
  }, []);

  useEffect(() => {
    adsFeedback();
  }, [ad]);

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

  const { isScreenLg } = useResize();

  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, [isScreenLg]);

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
    <div className="h-[1100px] w-full relative">
      {isScreenLg ? (
        <Header openAddModal={() => setAddModalIsOpen(true)} />
      ) : (
        <div className="w-full sticky top-0 h-20 bg-[#009EE4] flex items-center px-5 z-30">
          <Link to="/">
            <div className="w-12 h-12 flex items-center justify-center bg-white rounded-[50%]">
              <img className="h-8 w-8" src="/svg/logo.svg" alt="logo" />
            </div>
          </Link>
        </div>
      )}
      {ad && (
        <div className="relative px-0 lg:px-[140px] h-full">
          <div className="hidden h-[50px] w-full lg:flex flex-row items-center justify-start gap-14 my-10 ">
            <img src="/svg/logo.svg" alt="logo" />
            <div className="w-[241px]">
              <Link to="/">
                <ButtonBlue text="Вернуться на главную" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-5 lg:gap-20 w-full lg:my-10 h-fit">
            <div className="col-span-12 lg:col-span-6 2xl:col-span-4">
              {isScreenLg ? (
                <div className="flex flex-col items-center justify-between gap-7 w-full">
                  <div className="w-full h-[320px] relative">
                    {ad.images[0]?.url ? (
                      <LightGallery>
                        <img
                          className="object-cover h-full w-full"
                          src={`${PATH}/${ad.images[0].url}`}
                          alt="image"
                        />
                      </LightGallery>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        Изображение отсутствует
                      </div>
                    )}
                  </div>
                  <div className="w-full grid grid-cols-5 gap-[3px] h-[80px] overflow-hidden">
                    {ad.images.map((image) => (
                      <div
                        className="col-span-1 h-full w-full"
                        key={image?.ad_id}
                      >
                        <LightGallery>
                          <img
                            className="object-cover h-full w-full"
                            src={`${PATH}/${image?.url}`}
                            alt="image"
                          />
                        </LightGallery>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="overflow-hidden h-[320px] box-border">
                  <div className="absolute top-5 left-5 z-10">
                    <Link to="/">
                      <img
                        className="h-full w-full"
                        src="/svg/back_button.svg"
                        alt="image"
                      />
                    </Link>
                  </div>
                  {ad.images[0]?.url ? (
                    <Swiper
                      slidesPerView={1}
                      speed={900}
                      spaceBetween={0}
                      allowTouchMove
                      pagination={{
                        dynamicBullets: true,
                      }}
                      modules={[Pagination]}
                      style={{
                        overflow: "hidden",
                        width: "100%",
                        height: "100%",
                        marginLeft: 0,
                      }}
                    >
                      {ad.images.map((image) => (
                        <SwiperSlide className="h-full" key={image?.ad_id}>
                          <div
                            key={image?.ad_id}
                            className="relative h-full w-full"
                          >
                            <LightGallery>
                              <img
                                src={`${PATH}/${image?.url}`}
                                alt="image"
                                className="object-cover h-full w-full"
                              />
                            </LightGallery>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      Изображение отсутствует
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="col-span-12 lg:col-span-6 2xl:col-span-8 px-5 lg:px-0 h-fit">
              {deletedAdd ? (
                <div className="w-full h-full flex items-center justify-center text-[32px] font-normal">
                  Объявление удалено!
                </div>
              ) : (
                <div className="flex flex-col items-start gap-4 lg:gap-8">
                  <div className="flex flex-col items-start gap-2">
                    <div className="text-[32px] font-bold text-black">
                      {ad.title}
                    </div>
                    <div className="flex flex-col items-start gap-1">
                      <div className="text-[16px] font-normal text-[#5F5F5F]">
                        {`${formatDistance(
                          new Date(ad.created_on),
                          new Date(),
                          {
                            locale: ru,
                          }
                        )} назад`}
                      </div>
                      <div className="text-[16px] font-normal text-[#5F5F5F]">
                        {ad.user.city}
                      </div>
                      {feedback ? (
                        <div
                          onClick={() => setReviewsModalIsOpen(true)}
                          className="text-[16px] font-normal text-[#009EE4] cursor-pointer"
                        >
                          {`${feedback.length} отзыва`}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-5 w-full">
                    <div className="text-[32px] font-bold text-black">
                      {`${ad.price} ₽`}
                    </div>
                    {myAdv ? (
                      <div className="flex flex-col lg:flex-row gap-3 items-center w-full lg:w-fit">
                        <div
                          className="w-full lg:w-fit"
                          onClick={() => setUpdateModalIsOpen(true)}
                        >
                          <ButtonBlue text="Редактировать" />
                        </div>
                        <div
                          className="w-full lg:w-fit"
                          onClick={() => handleDeleteAdd()}
                        >
                          <ButtonBlue text="Снять с публикации" />
                        </div>
                      </div>
                    ) : (
                      <div className="w-full">
                        {ad && ad.user.phone && (
                          <ButtonNumber phone={ad.user.phone} />
                        )}
                      </div>
                    )}
                  </div>
                  <Link to={isScreenLg ? `/sellerProfile/${ad.user_id}` : ""}>
                    <div
                      onClick={
                        isScreenLg
                          ? console.log("23")
                          : () => setSellerPageModal(true)
                      }
                      className="flex flex-row items-center gap-4"
                    >
                      <div className="w-[40px] h-[40px] rounded-[50%] bg-[#F0F0F0] overflow-hidden">
                        {ad.user.avatar ? (
                          <img src={`${PATH}/${ad.user.avatar}`} alt="avatar" />
                        ) : (
                          <img
                            className=""
                            src={"/img/noprofile.png"}
                            alt="avatar"
                          />
                        )}
                      </div>
                      <div className="flex flex-col items-start ">
                        <div className="text-[20px] font-semibold text-[#009EE4]">
                          {ad.user.name}
                        </div>
                        <div className="text-[16px] font-normal text-[#5F5F5F]">
                          {`Продает товары с ${
                            months[new Date(ad.user.sells_from).getMonth()]
                          } ${new Date(ad.user.sells_from).getFullYear()}`}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-start gap-3 lg:gap-5 h-fit my-10 w-[60%] px-5 lg:px-0">
            <div className="text-[18px] lg:text-[32px] font-medium text-[#000]">
              Описание товара
            </div>
            {ad.description ? (
              <div className="text-[14px] lg:text-[16px] font-normal text-[#000]">
                {ad.description}
              </div>
            ) : (
              <div className="text-[16px] font-normal text-[#000]">
                Описание товара не добавлено
              </div>
            )}
          </div>
          {!isScreenLg && reviewsModalIsOpen && (
            <div className="absolute top-0 h-full w-full bg-white z-20">
              <ReviewsModalMobile
                closeModal={() => setReviewsModalIsOpen(false)}
                data={feedback}
                adsFeedback={adsFeedback}
              />
            </div>
          )}
          {!isScreenLg && sellerPageModal && (
            <div className="absolute top-0 h-full w-full bg-white z-20">
              <SellerPageModal
                closeModal={() => setSellerPageModal(false)}
                id={ad.user.id}
              />
            </div>
          )}
          {!isScreenLg && updateModalIsOpen && (
            <div className="absolute top-0 h-full w-full bg-white z-20">
              <UpdateAdvMobile
                closeModal={() => setUpdateModalIsOpen(false)}
                ad={ad}
                currentAd={currentAd}
              />
            </div>
          )}

          {!isScreenLg && profileModalIsOpen && (
            <div className="absolute top-0 h-fit w-full bg-white z-20">
              <ProfilePageModal />
            </div>
          )}

          {isScreenLg ? (
            <Modal
              isOpen={reviewsModalIsOpen}
              onRequestClose={() => setReviewsModalIsOpen(false)}
              style={customStyles}
              contentLabel="Reviews Modal"
            >
              <ReviewsModal
                closeModal={() => setReviewsModalIsOpen(false)}
                data={feedback}
                adsFeedback={adsFeedback}
              />
            </Modal>
          ) : (
            ""
          )}
          {isScreenLg ? (
            <Modal
              isOpen={updateModalIsOpen}
              onRequestClose={() => setUpdateModalIsOpen(false)}
              style={customStyles}
              contentLabel="Update adv modal"
            >
              <UpdateAdv
                closeModal={() => setUpdateModalIsOpen(false)}
                ad={ad}
                currentAd={currentAd}
              />
            </Modal>
          ) : (
            ""
          )}
          {isScreenLg ? (
            <Modal
              isOpen={addModalIsOpen}
              onRequestClose={() => setAddModalIsOpen(false)}
              style={customStyles}
              contentLabel="New adv modal"
            >
              <NewAdv closeModal={() => setAddModalIsOpen(false)} />
            </Modal>
          ) : (
            ""
          )}
        </div>
      )}
      {isScreenLg ? (
        <div />
      ) : (
        <div className=" w-full h-[54px] bottom-0 sticky px-5 bg-white mt-5 z-30">
          <MobileMenu
            openAddModal={() => setAddModalIsOpen(true)}
            closeAddModal={() => setAddModalIsOpen(false)}
            openProfileModal={() => setProfileModalIsOpen(true)}
            closeProfileModal={() => setProfileModalIsOpen(false)}
          />
        </div>
      )}
      {!isScreenLg && addModalIsOpen && (
        <div className="absolute top-0 h-full w-full bg-white z-20">
          <NewAdvMobile closeModal={() => setAddModalIsOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default AdvPage;
