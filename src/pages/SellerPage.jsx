import { Link } from "react-router-dom";
import AdvertItem from "../components/Advert/AdvertItem";
import HeaderLogged from "../components/Header/HeaderLogged";
import ButtonBlue from "../components/UI/Buttons/ButtonBlue";
import SectionTitle from "../components/UI/SectionTitle/SectionTitle";

const SellerPage = () => {
  const data = [
    {
      index: 1,
      title: "Ракетка",
      price: 2200,
      city: "Санкт-Петербург",
      time: "23.09.2000",
    },
    {
      index: 2,
      title: "Мяч",
      price: 200,
      city: "Санкт-Петербург",
      time: "23.09.2005",
    },
    {
      index: 3,
      title: "Куртка",
      price: 20000,
      city: "Тюмень",
      time: "23.09.2005",
    },
    {
      index: 4,
      title: "Лыжи",
      price: 15000,
      city: "Санкт-Петербург",
      time: "23.09.2005",
    },
  ];
  return (
    <div className="h-full w-full relative">
      <HeaderLogged />
      <div className="relative px-[140px]">
        <div className="h-[50px] w-full flex flex-row items-center justify-start gap-14 my-10 ">
          <img src="/img/logo.svg" alt="logo" />
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
              <div className=" h-[170px] w-[170px] rounded-[50%] bg-[#F0F0F0]" />

              <div className="flex flex-col items-start gap-8">
                <div className="flex flex-col items-start gap-2">
                  <div className="text-[20px] font-[600] text-black">
                    Кирилл Матвеев
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <div className="text-[16px] font-normal text-[#5F5F5F]">
                      Санкт-Петербург
                    </div>
                    <div className="text-[16px] font-normal text-[#5F5F5F]">
                      Продает товары с августа 2021
                    </div>
                  </div>
                </div>

                <ButtonBlue
                  text="Показать телефон 8 905 ХХХ ХХ ХХ"
                  size="big"
                />
              </div>
            </div>
          </div>
          <div className="text-[32px] font-medium text-black pb-5">
            Товары продавца
          </div>
          <div className="flex flex-wrap flex-row gap-7 items-center ">
            {data.map((item) => (
              <div key={item.index}>
                <AdvertItem item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerPage;
