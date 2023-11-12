import { useState } from "react";

const ButtonNumber = (phone) => {
  const [userPhone, setUserPhone] = useState(
    phone.phone.slice(0, 4) + " XXX XX XX"
  );
  const parsePhone = (phone) => {
    setUserPhone(phone);
  };

  return (
    <button
      className="h-[62px] w-full lg:w-[190px] py-2 px-6 bg-[#009EE4] rounded-[6px] flex flex-col items-center justify-center text-white hover:bg-[#0080C1] "
      onClick={() => parsePhone(phone.phone)}
    >
      <p>Показать номер</p>
      <p>{userPhone}</p>
    </button>
  );
};

export default ButtonNumber;
