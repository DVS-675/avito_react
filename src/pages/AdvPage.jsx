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

import ButtonNumber from "../components/UI/Buttons/ButtonNumber";
import Cookies from "js-cookie";

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
  const { id } = useParams();
  const [reviewsModalIsOpen, setReviewsModalIsOpen] = React.useState(false);
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

  function openAddModal() {
    setAddModalIsOpen(true);
  }

  function closeAddModal() {
    setAddModalIsOpen(false);
  }

  function openReviewsModal() {
    setReviewsModalIsOpen(true);
  }

  function openUpdateModal() {
    setUpdateModalIsOpen(true);
  }

  function closeReviewsModal() {
    setReviewsModalIsOpen(false);
  }

  function closeUpdateModal() {
    setUpdateModalIsOpen(false);
  }

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

  return (
    <div className="h-full w-full relative">
      <Header openAddModal={openAddModal} />
      {ad && (
        <div className="relative px-[140px]">
          <div className="h-[50px] w-full flex flex-row items-center justify-start gap-14 my-10 ">
            <img src="/svg/logo.svg" alt="logo" />
            <div className="w-[241px]">
              <Link to="/">
                <ButtonBlue text="Вернуться на главную" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-20 w-full my-10">
            <div className="col-span-4">
              <div className="flex flex-col items-center justify-between gap-7 w-full">
                <div className="w-full h-full aspect-square">
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
            </div>
            <div className="col-span-8">
              {deletedAdd ? (
                <div className="w-full h-full flex items-center justify-center text-[32px] font-normal">
                  Объявление удалено!
                </div>
              ) : (
                <div className="flex flex-col items-start gap-8">
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
                          onClick={openReviewsModal}
                          className="text-[16px] font-normal text-[#009EE4] cursor-pointer"
                        >
                          {`${feedback.length} отзыва`}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-5">
                    <div className="text-[32px] font-bold text-black">
                      {`${ad.price} ₽`}
                    </div>
                    {myAdv ? (
                      <div className="flex flex-row gap-3 items-center">
                        <div onClick={openUpdateModal}>
                          <ButtonBlue text="Редактировать" />
                        </div>
                        <div onClick={() => handleDeleteAdd()}>
                          <ButtonBlue text="Снять с публикации" />
                        </div>
                      </div>
                    ) : (
                      <div>
                        {ad && ad.user.phone && (
                          <ButtonNumber phone={ad.user.phone} />
                        )}
                      </div>
                    )}
                  </div>
                  <Link to={`/sellerProfile/${ad.user_id}`}>
                    <div className="flex flex-row items-center gap-4">
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
          <div className="flex flex-col items-start gap-5 h-full my-10 w-[60%]">
            <div className="text-[32px] font-medium text-[#000]">
              Описание товара
            </div>
            {ad.description ? (
              <div className="text-[16px] font-normal text-[#000]">
                {ad.description}
              </div>
            ) : (
              <div className="text-[16px] font-normal text-[#000]">
                Описание товара не добавлено
              </div>
            )}
          </div>
          <Modal
            isOpen={reviewsModalIsOpen}
            onRequestClose={closeReviewsModal}
            style={customStyles}
            contentLabel="Reviews Modal"
          >
            <ReviewsModal
              closeModal={closeReviewsModal}
              data={feedback}
              adsFeedback={adsFeedback}
            />
          </Modal>
          <Modal
            isOpen={updateModalIsOpen}
            onRequestClose={closeUpdateModal}
            style={customStyles}
            contentLabel="Update adv modal"
          >
            <UpdateAdv
              closeModal={closeUpdateModal}
              ad={ad}
              currentAd={currentAd}
            />
          </Modal>
          <Modal
            isOpen={addModalIsOpen}
            onRequestClose={closeAddModal}
            style={customStyles}
            contentLabel="New adv modal"
          >
            <NewAdv closeModal={closeAddModal} />
          </Modal>
        </div>
      )}
    </div>
  );
};

export default AdvPage;
