import Button from "../UI/Buttons/Button";

const Header = () => {
  return (
    <div className="w-full h-20 bg-[#009EE4] flex items-center justify-end">
      <div className="container flex items-center justify-end">
        <div className="w-[224px]">
          <Button text="Вход в личный кабинет" />
        </div>
      </div>
    </div>
  );
};

export default Header;
