import { useEffect, useState } from "react";

import ButtonBlue from "../UI/Buttons/ButtonBlue";
import { useParams } from "react-router";
import { AddAdsFeedback } from "../../api";
import Cookies from "js-cookie";

const ReviewsModal = ({ closeModal, data, adsFeedback }) => {
  const [disabled, setDisabled] = useState(true);
  const [review, setReview] = useState("");
  const { id } = useParams();
  console.log(id);

  const token = Cookies.get("accessToken");

  useEffect(() => {
    if (review.split("").length > 3) {
      setDisabled(false);
    } else if (review.split("").length < 3) {
      setDisabled(true);
    }
  }, [review]);

  const handleAddReview = async () => {
    try {
      setDisabled(true);
      await AddAdsFeedback(id, review, token);
    } catch (error) {
      console.log(error);
    } finally {
      adsFeedback();
      setDisabled(false);
    }
  };
  const PATH = "http://localhost:8090";

  return (
    <div className="relative flex justify-center items-center w-full h-full z-20">
      <div className="h-full w-full bg-white px-[50px] py-[20px] overflow-y-auto rounded-[12px] ">
        <div className="flex flex-col items-start gap-5">
          <div className="w-full flex flex-row items-center justify-between ">
            <p className="text-[32px] font-medium ">Отзывы о товаре</p>
            <div onClick={closeModal} className="cursor-pointer">
              <img src="/svg/close.svg" alt="закрыть" />
            </div>
          </div>

          <div className="flex flex-col items-start justify-start gap-3 w-full relative">
            <p className="text-[16px] font-[600] mb-3">Добавить отзыв</p>
            <textarea
              className="h-[100px] w-full border-[1px] border-[#00000033] focus:border-[#009EE4] rounded-[6px] flex items-start justify-start px-5 py-5 outline-none"
              type="textarea"
              placeholder="Введите отзыв"
              name="review"
              onChange={(event) => setReview(event.target.value)}
            />
            <div onClick={handleAddReview} className="w-[181px]">
              <ButtonBlue text="Опубликовать" disabled={disabled} />
            </div>
          </div>
          <div className="flex flex-col items-start gap-7">
            {data.map((item) => (
              <div
                key={item.id}
                className="flex flex-row items-start justify-start gap-3"
              >
                <div className="aspect-square w-[60px] rounded-[50%] bg-[#F0F0F0]">
                  {item && item.author ? (
                    <img
                      className="object-cover h-full w-full rounded-[50%]"
                      src={`${PATH}/${item.author.avatar}`}
                      alt="image"
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col items-start w-full">
                  <div className="flex flex-row items-center justify-between w-full">
                    <p className="text-[14px] font-[600] mb-3">
                      {item.author.name}
                    </p>
                    <div className="text-[14px] font-[400] mb-3 text-[#5F5F5F]">
                      {`${new Date(item.created_on).toLocaleDateString()}`}
                    </div>
                  </div>

                  <p className="text-[16px] font-[600] mb-1">Комментарий</p>
                  <p className="text-[16px] font-normal mb-1">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsModal;
