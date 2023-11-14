import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ButtonBlue from "../UI/Buttons/ButtonBlue";
import { AddNewAd } from "../../api";

const NewAdvMobile = ({ closeModal, getAds }) => {
  const [disabled, setDisabled] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [added, setAdded] = useState(false);
  const token = Cookies.get("accessToken");

  const newAd = async () => {
    try {
      setDisabled(true);
      await AddNewAd(token, title, description, Number(price));
    } catch (error) {
      console.log(error);
    } finally {
      setDisabled(true);
      setAdded(true);
      getAds();
      closeModal();
    }
  };

  useEffect(
    () => {
      if (title && description && price) {
        setDisabled(false);
      } else if (!title || !description || !price) {
        setDisabled(true);
      }
    },
    [title],
    [description],
    [price]
  );
  return (
    <div className="relative flex justify-center items-center w-full h-fit ">
      <div className="h-full w-full bg-white px-5 py-[30px] overflow-y-auto  ">
        <div className="flex flex-col items-start gap-5 h-full">
          <div className="w-full flex flex-row items-center gap-10 relative">
            <div onClick={closeModal} className="cursor-pointer">
              <img
                className="h-[18px] w-full"
                src="/svg/back_button.svg"
                alt="image"
              />
            </div>
            <p className="text-[24px] font-medium ">Новое объявление</p>
          </div>

          <div className="flex flex-col items-start justify-start gap-4 w-full relative h-full">
            <div className="flex flex-col w-full items-start gap-2">
              <p className="text-[14px] font-[400] ml-5">Название</p>
              <input
                className="h-[50px] w-full border-[1px] border-[#00000033] focus:border-[#009EE4] rounded-[30px] flex items-start justify-start px-5 py-5 outline-none"
                type="text"
                placeholder="Введите название"
                name="title"
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <div className="flex flex-col w-full items-start gap-2">
              <p className="text-[14px] font-[400] ml-5">Описание</p>
              <textarea
                className="h-[200px] w-full border-[1px] border-[#00000033] focus:border-[#009EE4] rounded-[30px] flex items-start justify-start px-5 py-5 outline-none"
                type="textarea"
                placeholder="Введите описание"
                name="description"
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>

            <div className="flex flex-col items-start w-full gap-5 relative">
              <div className="flex flex-col items-start pl-5">
                <p className="text-[14px] font-[400] mb-1">Фотографии товара</p>
                <p className="text-[14px] font-normal opacity-50">
                  не более 5 фотографий
                </p>
              </div>
              <div className="w-full flex flex-row items-center gap-2">
                <div className="w-[90px] h-[90px] bg-[#F0F0F0] relative cursor-pointer">
                  <div className="absolute z-10 top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] stroke-black">
                    <img src="/svg/plus.svg" alt="закрыть" />
                  </div>
                </div>
                <div className="w-[90px] h-[90px] bg-[#F0F0F0] relative cursor-pointer">
                  <div className="absolute z-10 top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] stroke-black">
                    <img src="/svg/plus.svg" alt="закрыть" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full items-start gap-2">
              <p className="text-[14px] font-[400] ml-5">Цена</p>
              <input
                className="h-[50px] w-full md:w-[200px] border-[1px] border-[#00000033] focus:border-[#009EE4] rounded-[30px] flex items-start justify-start px-5 py-5 outline-none mb-5"
                type="number"
                placeholder=""
                name="price"
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>
            {added ? (
              <div
                onClick={() => newAd()}
                className="w-full flex items-center justify-center"
              >
                <p>Объявление добавлено!</p>
              </div>
            ) : (
              <div onClick={() => newAd()} className="w-[181px]">
                <ButtonBlue text="Опубликовать" disabled={disabled} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAdvMobile;
