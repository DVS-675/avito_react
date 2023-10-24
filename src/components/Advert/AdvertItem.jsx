const AdvertItem = ({ item }) => {
  console.log(item);
  return (
    <div className="flex flex-col h-[450px] w-[270px] gap-1 cursor-pointer">
      <div className="h-[270px] w-full bg-[#F0F0F0]"></div>
      <p className="font-bold text-[#009EE4] text-[22px]">{item.title}</p>
      <p className="text-black font-bold text-[22px]">{`${item.price} ₽`}</p>
      <p className="text-[#5F5F5F] font-normal text-[16px]">{item.city}</p>
      <p className="text-[#5F5F5F] font-normal text-[16px]">{item.time}</p>
    </div>
  );
};

export default AdvertItem;
