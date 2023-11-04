import { Link } from "react-router-dom";
import Button from "../UI/Buttons/Button";
import { useAllowedContext } from "../../contexts/allowed";

const Header = ({ openAddModal }) => {
  const { isAllowed, setIsAllowed } = useAllowedContext();
  return (
    <div className="w-full h-20 bg-[#009EE4] flex items-center justify-end">
      <div className="container flex flex-row items-center justify-end gap-2">
        {isAllowed ? (
          <>
            <div onClick={openAddModal} className="w-[232px]">
              <Button text="Разместить объявление" />
            </div>
            <div className="w-[173px]">
              <Link to="/profile">
                <Button text="Личный кабинет" />
              </Link>
            </div>
          </>
        ) : (
          <div className="w-[224px]">
            <Link to="/login">
              <Button text="Вход в личный кабинет" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
