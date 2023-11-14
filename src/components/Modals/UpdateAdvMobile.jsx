import { useState } from "react";
import Cookies from "js-cookie";
import ButtonBlue from "../UI/Buttons/ButtonBlue";
import { deleteAdImage, updateAd, updateAdImages } from "../../api";

const UpdateAdvMobile = ({ closeModal, ad, currentAd }) => {
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

  return (
    <div className="relative flex justify-center items-center w-full h-full ">
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
            <p className="text-[24px] font-medium ">Редактирование</p>
          </div>

          <div className="flex flex-col items-start justify-start gap-4 w-full relative h-full">
            <div className="flex flex-col w-full items-start gap-2">
              <p className="text-[14px] font-[400] ml-5">Название</p>
              <input
                className="h-[50px] w-full border-[1px] border-[#00000033] focus:border-[#009EE4] rounded-[30px] flex items-start justify-start px-5 py-5 outline-none"
                type="text"
                value={title}
                name="title"
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <div className="flex flex-col w-full items-start gap-2">
              <p className="text-[14px] font-[400] ml-5">Описание</p>
              <textarea
                className="h-[200px] w-full border-[1px] border-[#00000033] focus:border-[#009EE4] rounded-[30px] flex items-start justify-start px-5 py-5 outline-none"
                type="textarea"
                value={description}
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
              <div className="w-full h-full">
                {ad.images && ad.images.length ? (
                  <div className="w-full flex flex-row items-center gap-2 flex-wrap h-full">
                    {ad.images.map((image) => (
                      <label
                        className="h-[85px] aspect-square relative cursor-pointer border-[1px] border-black/40"
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
            <div className="flex flex-col w-full items-start gap-2">
              <p className="text-[14px] font-[400] ml-5">Цена</p>
              <input
                className="h-[50px] w-full md:w-[200px] border-[1px] border-[#00000033] focus:border-[#009EE4] rounded-[30px] flex items-start justify-start px-5 py-5 outline-none mb-5"
                type="number"
                value={price}
                name="price"
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>

            <div onClick={() => handleUpdateAdd()} className="w-[181px]">
              <ButtonBlue text="Сохранить" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAdvMobile;
