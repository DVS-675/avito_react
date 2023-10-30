import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonBlue from "../components/UI/Buttons/ButtonBlue";
import Button from "../components/UI/Buttons/Button";

const LoginPage = () => {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  console.log(path);
  return path === "/login" ? (
    <div className="h-full w-full relative bg-[#009ee4] flex items-center justify-center">
      <div className="w-[366px] rounded-[12px] bg-white p-10 flex flex-col items-center ">
        <img src="/svg/logo_text.svg" alt="logo" />
        <div className="flex flex-col items-center w-full py-10 gap-8">
          <input
            className="w-full h-[40px] border-b-[1px] border-[#d9d9d9] text-[16px] font-normal text-[#D9D9D9] focus:outline-none focus:border-[#009EE4] focus:text-black"
            type="text"
            placeholder="Email"
          />
          <input
            className="w-full h-[40px] border-b-[1px] border-[#d9d9d9] text-[16px] font-normal text-[#D9D9D9] focus:outline-none focus:border-[#009EE4] focus:text-black"
            type="password"
            placeholder="Пароль"
          />
        </div>
        <div className="w-full mb-5">
          <ButtonBlue text="Войти" />
        </div>
        <div className="w-full">
          <Button text="Зарегистрироваться" black />
        </div>
      </div>
    </div>
  ) : (
    <div className="h-full w-full relative bg-[#009ee4] flex items-center justify-center">
      <div className="w-[366px] rounded-[12px] bg-white p-10 flex flex-col items-center ">
        <img src="/svg/logo_text.svg" alt="logo" />
        <div className="flex flex-col items-center w-full py-10 gap-8">
          <input
            className="w-full h-[40px] border-b-[1px] border-[#d9d9d9] text-[16px] font-normal text-[#D9D9D9] focus:outline-none focus:border-[#009EE4] focus:text-black"
            type="text"
            placeholder="Email"
          />
          <input
            className="w-full h-[40px] border-b-[1px] border-[#d9d9d9] text-[16px] font-normal text-[#D9D9D9] focus:outline-none focus:border-[#009EE4] focus:text-black"
            type="password"
            placeholder="Пароль"
          />
          <input
            className="w-full h-[40px] border-b-[1px] border-[#d9d9d9] text-[16px] font-normal text-[#D9D9D9] focus:outline-none focus:border-[#009EE4] focus:text-black"
            type="text"
            placeholder="Повторите пароль"
          />
          <input
            className="w-full h-[40px] border-b-[1px] border-[#d9d9d9] text-[16px] font-normal text-[#D9D9D9] focus:outline-none focus:border-[#009EE4] focus:text-black"
            type="password"
            placeholder="Имя (необязательно)"
          />
          <input
            className="w-full h-[40px] border-b-[1px] border-[#d9d9d9] text-[16px] font-normal text-[#D9D9D9] focus:outline-none focus:border-[#009EE4] focus:text-black"
            type="password"
            placeholder="Фамилия (необязательно)"
          />
          <input
            className="w-full h-[40px] border-b-[1px] border-[#d9d9d9] text-[16px] font-normal text-[#D9D9D9] focus:outline-none focus:border-[#009EE4] focus:text-black"
            type="password"
            placeholder="Город (необязательно)"
          />
        </div>
        <div className="w-full">
          <ButtonBlue text="Зарегистрироваться" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
