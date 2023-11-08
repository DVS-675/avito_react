import { formatDistance } from "date-fns";
import { ru } from "date-fns/locale";

const AdvertItem = ({ item }) => {
  const PATH = "http://localhost:8090";

  return (
    <div className="flex flex-col h-[450px] w-[270px] gap-1 cursor-pointer relative">
      {item && item.images && (
        <>
          <div className="h-[270px] w-full bg-[#F0F0F0]">
            {item.images[0]?.url ? (
              <img
                className="object-cover h-full w-full"
                src={`${PATH}/${item.images[0].url}`}
                alt="image"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                Изображение отсутствует
              </div>
            )}
          </div>

          <p className="font-bold text-[#009EE4] text-[22px]">{item.title}</p>
          <p className="text-black font-bold text-[22px]">{`${item.price} ₽`}</p>
          <p className="text-[#5F5F5F] font-normal text-[16px]">
            {item.user.city}
          </p>
          <p className="text-[#5F5F5F] font-normal text-[16px]">
            {formatDistance(new Date(item.created_on), new Date(), {
              locale: ru,
            })}
          </p>
        </>
      )}
    </div>
  );
};

export default AdvertItem;
