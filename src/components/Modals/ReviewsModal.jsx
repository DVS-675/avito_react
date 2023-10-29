import { useEffect, useState } from "react";

import ButtonBlue from "../UI/Buttons/ButtonBlue";

const ReviewsModal = ({ closeModal }) => {
  const [disabled, setDisabled] = useState(true);
  const [review, setReview] = useState("");

  useEffect(() => {
    if (review.split("").length > 3) {
      setDisabled(false);
    } else if (review.split("").length < 3) {
      setDisabled(true);
    }
  }, [review]);

  const reviews = [
    {
      photo: "",
      name: "dima",
      review:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti voluptatibus dolorem dolor deserunt, vero pariatur atque labore magnam nobis. Voluptatibus.",
    },
    {
      photo: "",
      name: "sasha",
      review:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti voluptatibus dolorem dolor deserunt, vero pariatur atque labore magnam nobis. Voluptatibus.",
    },
    {
      photo: "",
      name: "dima",
      review:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti voluptatibus dolorem dolor deserunt, vero pariatur atque labore magnam nobis. Voluptatibus.",
    },
    {
      photo: "",
      name: "dima",
      review:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti voluptatibus dolorem dolor deserunt, vero pariatur atque labore magnam nobis. Voluptatibus.",
    },
  ];
  return (
    <div className="relative flex justify-center items-center w-full h-full">
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
            <div className="w-[181px]">
              <ButtonBlue text="Опубликовать" disabled={disabled} />
            </div>
          </div>
          <div className="flex flex-col items-start gap-7">
            {reviews.map((item) => (
              <div
                key={item.name}
                className="flex flex-row items-start justify-start gap-3"
              >
                <div className="aspect-square w-[60px] rounded-[50%] bg-[#F0F0F0]" />
                <div className="flex flex-col items-start ">
                  <p className="text-[16px] font-[600] mb-3">{item.name}</p>

                  <p className="text-[16px] font-normal mb-1">Комментарий</p>
                  <p className="text-[16px] font-normal mb-1">{item.review}</p>
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
