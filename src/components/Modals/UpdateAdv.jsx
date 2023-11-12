import { useEffect, useState } from "react";
import ButtonBlue from "../UI/Buttons/ButtonBlue";
import { deleteAdImage, updateAd, updateAdImages } from "../../api";
import Cookies from "js-cookie";

const UpdateAdv = ({ closeModal, ad, currentAd }) => {
  const [title, setTitle] = useState(ad.title);
  const [description, setDescription] = useState(ad.description);
  const [price, setPrice] = useState(ad.price);
  const PATH = "http://localhost:8090";

  const token = Cookies.get("accessToken");

  const handleUpdateAdd = async () => {
    await updateAd(ad.id, token, title, description, price);
    closeModal();
    currentAd();
  };

  const handleUploadAdImg = async (event) => {
    let selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      await updateAdImages(ad.id, formData, token);
      currentAd();
    }
  };

  const handleDeleteImg = async (image) => {
    const file_url = image.url;
    console.log(image.url);
    await deleteAdImage(ad.id, file_url, token);
    currentAd();
  };

  console.log(ad);

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
              type="text"
              value={title}
              name="title"
              onChange={(event) => setTitle(event.target.value)}
            />

            <p className="text-[16px] font-[600] mb-1">Описание</p>
            <textarea
              className="h-[200px] w-full border-[1px] border-[#00000033] focus:border-[#009EE4] rounded-[6px] flex items-start justify-start px-5 py-5 outline-none"
              type="textarea"
              value={description}
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
              <div className="w-full h-[90px]">
                {ad.images && ad.images.length ? (
                  <div className="w-full h-full flex flex-row items-center gap-2">
                    {ad.images.map((image) => (
                      <label
                        className="h-full aspect-square relative cursor-pointer border-[1px] border-black/50"
                        key={image?.ad_id}
                      >
                        <img
                          className="object-cover h-full w-full"
                          src={`${PATH}/${image?.url}`}
                          alt="image"
                        />
                        <input
                          type="file"
                          hidden
                          onChange={(e) => {
                            handleUploadAdImg(e);
                          }}
                        />
                        <div
                          onClick={(event) => {
                            event.preventDefault();
                            handleDeleteImg(image);
                          }}
                          className="absolute top-2 right-2 w-5 h-5 bg-gray-500 rounded-[50%]"
                        >
                          <img src="/svg/close.svg" alt="закрыть" />
                        </div>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="h-full aspect-square relative cursor-pointer bg-[#F0F0F0]">
                    <label className="h-full w-full">
                      <div className="absolute z-10 top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] stroke-black">
                        <img src="/svg/plus.svg" alt="закрыть" />
                      </div>
                      <input
                        type="file"
                        hidden
                        onChange={(e) => {
                          handleUploadAdImg(e);
                        }}
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>
            <p className="text-[16px] font-[600] mb-1">Цена</p>
            <input
              className="h-[50px] w-[200px] border-[1px] border-[#00000033] focus:border-[#009EE4] rounded-[6px] flex items-start justify-start px-5 py-5 outline-none mb-5"
              type="number"
              value={price}
              name="price"
              onChange={(event) => setPrice(event.target.value)}
            />
            <div onClick={() => handleUpdateAdd()} className="w-[181px]">
              <ButtonBlue text="Сохранить" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAdv;
