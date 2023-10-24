import ButtonBlue from "../components/UI/Buttons/ButtonBlue.jsx";
import Header from "../components/Header/Header.jsx";
import SectionTitle from "../components/UI/SectionTitle/SectionTitle.jsx";
import AdvertItem from "../components/Advert/AdvertItem.jsx";

const MainPage = () => {
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
      <Header />
      <div className="relative px-[140px]">
        <div className="h-[50px] w-full flex flex-row items-center justify-between gap-14 my-10 ">
          <img src="/img/logo.svg" alt="logo" />
          <div className="flex flex-row w-full gap-2">
            <input
              className="border-[1px] border-[#00000033] rounded-[6px] w-full flex items-center justify-center px-5 outline-none"
              type="search"
              placeholder="Поиск по объявлениям"
              name="search"
            />
            <div className="w-[158px]">
              <ButtonBlue text="Найти" />
            </div>
          </div>
        </div>
        <div className="h-full w-full relative">
          <SectionTitle text="Объявления" />
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

export default MainPage;
