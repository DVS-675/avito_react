import { formatDistance } from "date-fns";
import { ru } from "date-fns/locale";

const AdvertItem = ({ item }) => {
  const PATH = "http://localhost:8090";

  return (
    <div className="flex flex-col h-[237px] sm:h-[450px] w-[130px] sm:w-[270px] gap-1 cursor-pointer relative rounded-[6px] lg:rounded-[0px] item lg:shadow-none overflow-hidden">
      {item && item.images && (
        <>
          <div className="h-[60%] sm:h-[270px] w-full bg-[#F0F0F0]">
            {item.images[0]?.url ? (
              <img
                className="object-cover h-full w-full"
                src={`${PATH}/${item.images[0].url}`}
                alt="image"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-[14px] text-center">
                Изображение отсутствует
              </div>
            )}
          </div>
          <div className="w-full h-[40%] px-2 lg:px-0 flex flex-col items-start justify-center">
            <p className="font-bold text-[#009EE4] text-[14px] sm:text-[22px] overflow-hidden">
              {item.title}
            </p>
            <p className="text-black font-bold text-[16px] sm:text-[22px]">{`${item.price} ₽`}</p>
            <p className="text-[#5F5F5F] font-normal text-[12px] sm:text-[16px]">
              {item.user.city}
            </p>
            <p className="text-[#5F5F5F] font-normal text-[12px] sm:text-[16px]">
              {`${formatDistance(new Date(item.created_on), new Date(), {
                locale: ru,
              })} назад`}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default AdvertItem;
