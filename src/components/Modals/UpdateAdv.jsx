import { useEffect, useState } from "react";
import ButtonBlue from "../UI/Buttons/ButtonBlue";
import { updateAd } from "../../api";
import Cookies from "js-cookie";

const UpdateAdv = ({ closeModal, ad, currentAd }) => {
  const [disabled, setDisabled] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);

  const token = Cookies.get("accessToken");

  const handleUpdateAdd = async () => {
    await updateAd(ad.id, token, title, description, price);
    closeModal();
    currentAd();
  };

  useEffect(
    () => {
      if (
        title.split("").length > 3 &&
        description.split("").length > 3 &&
        price
      ) {
        setDisabled(false);
      } else if (
        title.split("").length < 3 ||
        description.split("").length < 3 ||
        !price
      ) {
        setDisabled(true);
      }
    },
    [title],
    [description],
    [price]
  );

  return (
    <div className="relative flex justify-center items-center w-full h-full">
      <div className="h-full w-full bg-white px-[50px] py-[20px] overflow-y-auto rounded-[12px] ">
        <div className="flex flex-col items-start gap-5">
          <div className="w-full flex flex-row items-center justify-between ">
            <p className="text-[32px] font-medium ">Редактировать объявление</p>
            <div onClick={closeModal} className="cursor-pointer">
              <img src="/svg/close.svg" alt="закрыть" />
            </div>
          </div>

          <div className="flex flex-col items-start justify-start gap-3 w-full relative">
            <p className="text-[16px] font-[600] mb-1">Название</p>
            <input
              className="h-[50px] w-full border-[1px] border-[#00000033] focus:border-[#009EE4] rounded-[6px] flex items-start justify-start px-5 py-5 outline-none"
              type="textarea"
              placeholder={ad.title}
              name="title"
              onChange={(event) => setTitle(event.target.value)}
            />
            <p className="text-[16px] font-[600] mb-1">Описание</p>
            <textarea
              className="h-[200px] w-full border-[1px] border-[#00000033] focus:border-[#009EE4] rounded-[6px] flex items-start justify-start px-5 py-5 outline-none"
              type="textarea"
              placeholder={ad.description}
              name="description"
              onChange={(event) => setDescription(event.target.value)}
            />
            <div className="flex flex-col items-start w-full">
              <div className="flex flex-row gap-3 items-center">
                <p className="text-[16px] font-[600] mb-1">Фотографии товара</p>
                <p className="text-[16px] font-normal opacity-50">
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
            <p className="text-[16px] font-[600] mb-1">Цена</p>
            <input
              className="h-[50px] w-[200px] border-[1px] border-[#00000033] focus:border-[#009EE4] rounded-[6px] flex items-start justify-start px-5 py-5 outline-none mb-5"
              type="number"
              placeholder={ad.price}
              name="price"
              onChange={(event) => setPrice(event.target.value)}
            />
            <div onClick={() => handleUpdateAdd()} className="w-[181px]">
              <ButtonBlue text="Сохранить" disabled={disabled} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAdv;
