import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ButtonBlue from "../components/UI/Buttons/ButtonBlue";
import Button from "../components/UI/Buttons/Button";
import { loginUser, registerUser } from "../api";
import { validateEmail } from "../helpers/helpers";
import { useAllowedContext } from "../contexts/allowed";
import Cookies from "js-cookie";
import { saveTokensStorage } from "../helpers/AuthHelpers";
import { useResize } from "../helpers/hooks/useResize";

const LoginPage = () => {
  const { isAllowed, setIsAllowed } = useAllowedContext();
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
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
        if (validateEmail(email)) {
          const responseData = await loginUser(email, password);

          if (responseData) {
            console.log(responseData);
            saveTokensStorage(responseData.refresh_token);
            setIsAllowed(true);
            navigate("/");
          }
        } else {
          setDisabled(true);
          setError("Введите валидный email");
        }
      } else {
        setDisabled(true);
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
                saveTokensStorage(responseData.refresh_token);
                setIsAllowed(true);
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

  // useEffect(
  //   () => {
  //     if (
  //       email &&
  //       email.split("").length > 3 &&
  //       password &&
  //       password.split("").length > 3
  //     ) {
  //       setDisabled(false);
  //     } else if (email.split("").length < 3 || password.split("").length < 3) {
  //       setDisabled(true);
  //     }
  //   },
  //   [email],
  //   [password]
  // );

  const { isScreenLg } = useResize();

  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, [isScreenLg]);

  return path === "/login" ? (
    <div className="h-[100vh] w-full relative lg:bg-[#009ee4] flex items-center justify-center">
      {isScreenLg ? (
        <div />
      ) : (
        <div className="w-full absolute top-0 h-20 bg-[#009EE4] flex items-center px-5 ">
          <Link to="/">
            <div className="w-12 h-12 flex items-center justify-center bg-white rounded-[50%]">
              <img className="h-8 w-8" src="/svg/logo.svg" alt="logo" />
            </div>
          </Link>
        </div>
      )}

      <div className="w-full lg:w-[366px] rounded-[12px] bg-white px-5 lg:p-10 flex flex-col items-center ">
        <img src="/svg/logo_text.svg" alt="logo" />
        <div className="flex flex-col items-center w-full py-10 gap-4 lg:gap-8 relative">
          {isScreenLg ? (
            <>
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
            </>
          ) : (
            <>
              <input
                className=" w-full h-[40px] px-4 rounded-[30px] border-[1px] border-[#d9d9d9] text-[16px] font-normal text-[#D9D9D9] focus:outline-none focus:border-[#009EE4] focus:text-black"
                type="text"
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
              />
              <input
                className=" w-full h-[40px] px-4 rounded-[30px] border-[1px] border-[#d9d9d9] text-[16px] font-normal text-[#D9D9D9] focus:outline-none focus:border-[#009EE4] focus:text-black"
                type="password"
                placeholder="Пароль"
                onChange={(event) => setPassword(event.target.value)}
              />
            </>
          )}

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
          className={`${disabled ? "pointer-events-none" : ""} w-full mb-5`}
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
    <div className="h-[100vh] w-full relative lg:bg-[#009ee4] flex items-center justify-center">
      {isScreenLg ? (
        <div />
      ) : (
        <div className="w-full absolute top-0 h-20 bg-[#009EE4] flex items-center px-5 ">
          <Link to="/">
            <div className="w-12 h-12 flex items-center justify-center bg-white rounded-[50%]">
              <img className="h-8 w-8" src="/svg/logo.svg" alt="logo" />
            </div>
          </Link>
        </div>
      )}
      <div className="w-full lg:w-[366px] rounded-[12px] bg-white p-10 flex flex-col items-center ">
        <img src="/svg/logo_text.svg" alt="logo" />
        <div className="flex flex-col items-center w-full py-10 gap-8 relative">
          {isScreenLg ? (
            <>
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
                type="text"
                placeholder="Имя (необязательно)"
                onChange={(event) => setName(event.target.value)}
              />
              <input
                className="w-full h-[40px] border-b-[1px] border-[#d9d9d9] text-[16px] font-normal text-[#D9D9D9] focus:outline-none focus:border-[#009EE4] focus:text-black"
                type="text"
                placeholder="Фамилия (необязательно)"
                onChange={(event) => setSurname(event.target.value)}
              />
              <input
                className="w-full h-[40px] border-b-[1px] border-[#d9d9d9] text-[16px] font-normal text-[#D9D9D9] focus:outline-none focus:border-[#009EE4] focus:text-black"
                type="text"
                placeholder="Город (необязательно)"
                onChange={(event) => setCity(event.target.value)}
              />
            </>
          ) : (
            <>
              <input
                className="w-full h-[40px] px-4 rounded-[30px] border-[1px] border-[#d9d9d9] text-[16px] font-normal text-[#D9D9D9] focus:outline-none focus:border-[#009EE4] focus:text-black"
                type="text"
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
              />
              <input
                className="w-full h-[40px] px-4 rounded-[30px] border-[1px] border-[#d9d9d9] text-[16px] font-normal text-[#D9D9D9] focus:outline-none focus:border-[#009EE4] focus:text-black"
                type="password"
                placeholder="Пароль"
                onChange={(event) => setPassword(event.target.value)}
              />
              <input
                className="w-full h-[40px] px-4 rounded-[30px] border-[1px] border-[#d9d9d9] text-[16px] font-normal text-[#D9D9D9] focus:outline-none focus:border-[#009EE4] focus:text-black"
                type="text"
                placeholder="Повторите пароль"
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              <input
                className="w-full h-[40px] px-4 rounded-[30px] border-[1px] border-[#d9d9d9] text-[16px] font-normal text-[#D9D9D9] focus:outline-none focus:border-[#009EE4] focus:text-black"
                type="text"
                placeholder="Имя (необязательно)"
                onChange={(event) => setName(event.target.value)}
              />
              <input
                className="w-full h-[40px] px-4 rounded-[30px] border-[1px] border-[#d9d9d9] text-[16px] font-normal text-[#D9D9D9] focus:outline-none focus:border-[#009EE4] focus:text-black"
                type="text"
                placeholder="Фамилия (необязательно)"
                onChange={(event) => setSurname(event.target.value)}
              />
              <input
                className="w-full h-[40px] px-4 rounded-[30px] border-[1px] border-[#d9d9d9] text-[16px] font-normal text-[#D9D9D9] focus:outline-none focus:border-[#009EE4] focus:text-black"
                type="text"
                placeholder="Город (необязательно)"
                onChange={(event) => setCity(event.target.value)}
              />
            </>
          )}

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
