import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonBlue from "../components/UI/Buttons/ButtonBlue";
import Button from "../components/UI/Buttons/Button";
import { loginUser, registerUser } from "../api";
import { validateEmail } from "../helpers/helpers";
import { useAllowedContext } from "../contexts/allowed";

const LoginPage = () => {
  const { isAllowed, setIsAllowed } = useAllowedContext();
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

  const handleLogin = async (email, password) => {
    try {
      setDisabled(true);
      if (email.split("").length !== 0 && password.split("").length !== 0) {
        console.log("123");
        if (validateEmail(email)) {
          const responseData = await loginUser(email, password);

          if (responseData) {
            localStorage.setItem("refresh", responseData.refresh_token);
            setIsAllowed?.(!isAllowed);
            navigate("/");
          }
        } else {
          setError("Введите валидный email");
        }
      } else {
        setError("Введите email / пароль");
      }
    } catch (error) {
      if ((error.message = "Ошибка авторизации")) {
        setError("Не верный логин или пароль");
      }
    } finally {
      setDisabled(false);
    }
  };

  const handleRegisterButton = async (
    email,
    password,
    confirmPassword,
    name,
    surname,
    city
  ) => {
    try {
      setDisabled(true);
      if (
        email.split("").length !== 0 &&
        password.split("").length !== 0 &&
        confirmPassword.split("").length !== 0
      ) {
        if (validateEmail(email)) {
          if (password === confirmPassword) {
            const responseData = await registerUser(
              email,
              password,
              name,
              surname,
              city
            );

            if (!responseData.details) {
              const responseData = await loginUser(email, password);

              if (responseData) {
                localStorage.setItem("refresh", responseData.refresh_token);
                setIsAllowed?.(!isAllowed);
                navigate("/");
              }
            } else {
              if (responseData.message === "Database Error") {
                setError("Такой пользователь уже существует");
              }
            }
          } else {
            setError("Введенные пароли не совпадают");
          }
        } else {
          setError("Введите валидный email");
        }
      } else {
        setError("Введите email / пароль");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setDisabled(false);
    }
  };

  return path === "/login" ? (
    <div className="h-full w-full relative bg-[#009ee4] flex items-center justify-center">
      <div className="w-[366px] rounded-[12px] bg-white p-10 flex flex-col items-center ">
        <img src="/svg/logo_text.svg" alt="logo" />
        <div className="flex flex-col items-center w-full py-10 gap-8 relative">
          <input
            className=" w-full h-[40px] border-b-[1px] border-[#d9d9d9] text-[16px] font-normal text-[#D9D9D9] focus:outline-none focus:border-[#009EE4] focus:text-black"
            type="text"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            className=" w-full h-[40px] border-b-[1px] border-[#d9d9d9] text-[16px] font-normal text-[#D9D9D9] focus:outline-none focus:border-[#009EE4] focus:text-black"
            type="password"
            placeholder="Пароль"
            onChange={(event) => setPassword(event.target.value)}
          />
          {error ? (
            <div className="text-red-500 text-[16px] pb-2 absolute bottom-0">
              {error}
            </div>
          ) : (
            ""
          )}
        </div>

        <div
          onClick={() => handleLogin(email, password)}
          className="w-full mb-5"
        >
          <ButtonBlue text="Войти" disabled={disabled} />
        </div>
        <div
          onClick={() => {
            navigate("/registration");
          }}
          className="w-full"
        >
          <Button text="Зарегистрироваться" black />
        </div>
      </div>
    </div>
  ) : (
    <div className="h-full w-full relative bg-[#009ee4] flex items-center justify-center">
      <div className="w-[366px] rounded-[12px] bg-white p-10 flex flex-col items-center ">
        <img src="/svg/logo_text.svg" alt="logo" />
        <div className="flex flex-col items-center w-full py-10 gap-8 relative">
          <input
            className="w-full h-[40px] border-b-[1px] border-[#d9d9d9] text-[16px] font-normal text-[#D9D9D9] focus:outline-none focus:border-[#009EE4] focus:text-black"
            type="text"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            className="w-full h-[40px] border-b-[1px] border-[#d9d9d9] text-[16px] font-normal text-[#D9D9D9] focus:outline-none focus:border-[#009EE4] focus:text-black"
            type="password"
            placeholder="Пароль"
            onChange={(event) => setPassword(event.target.value)}
          />
          <input
            className="w-full h-[40px] border-b-[1px] border-[#d9d9d9] text-[16px] font-normal text-[#D9D9D9] focus:outline-none focus:border-[#009EE4] focus:text-black"
            type="text"
            placeholder="Повторите пароль"
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          <input
            className="w-full h-[40px] border-b-[1px] border-[#d9d9d9] text-[16px] font-normal text-[#D9D9D9] focus:outline-none focus:border-[#009EE4] focus:text-black"
            type="password"
            placeholder="Имя (необязательно)"
            onChange={(event) => setName(event.target.value)}
          />
          <input
            className="w-full h-[40px] border-b-[1px] border-[#d9d9d9] text-[16px] font-normal text-[#D9D9D9] focus:outline-none focus:border-[#009EE4] focus:text-black"
            type="password"
            placeholder="Фамилия (необязательно)"
            onChange={(event) => setSurname(event.target.value)}
          />
          <input
            className="w-full h-[40px] border-b-[1px] border-[#d9d9d9] text-[16px] font-normal text-[#D9D9D9] focus:outline-none focus:border-[#009EE4] focus:text-black"
            type="password"
            placeholder="Город (необязательно)"
            onChange={(event) => setCity(event.target.value)}
          />
          {error ? (
            <div className="text-red-500 text-[16px] pb-2 absolute bottom-0">
              {error}
            </div>
          ) : (
            ""
          )}
        </div>
        <div
          onClick={() => {
            handleRegisterButton(
              email,
              password,
              confirmPassword,
              name,
              surname,
              city
            );
          }}
          className="w-full "
        >
          <ButtonBlue disabled={disabled} text="Зарегистрироваться" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
