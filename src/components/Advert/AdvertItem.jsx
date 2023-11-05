import {
  formatDistance,
  formatDistanceToNow,
  formatRelative,
  subDays,
} from "date-fns";
import { ru } from "date-fns/locale";

const AdvertItem = ({ item }) => {
  var options = {
    year: "numeric",
    month: "long",
    day: "numeric",

    timezone: "UTC",
    hour: "numeric",
    minute: "numeric",
  };

  return (
    <div className="flex flex-col h-[450px] w-[270px] gap-1 cursor-pointer">
      <div className="h-[270px] w-full bg-[#F0F0F0]">
        <img
          src={
            item.images.length !== 0 && item.images[0].url
              ? item.images[0].url
              : ""
          }
          alt="фото"
        />
      </div>
      <p className="font-bold text-[#009EE4] text-[22px]">{item.title}</p>
      <p className="text-black font-bold text-[22px]">{`${item.price} ₽`}</p>
      <p className="text-[#5F5F5F] font-normal text-[16px]">{item.user.city}</p>
      <p className="text-[#5F5F5F] font-normal text-[16px]">
        {formatDistance(new Date(item.created_on), new Date(), {
          locale: ru,
        })}
      </p>
    </div>
  );
};

export default AdvertItem;
