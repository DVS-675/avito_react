import Button from "../UI/Buttons/Button";

const HeaderLogged = () => {
  return (
    <div className="w-full h-20 bg-[#009EE4] flex items-center justify-end">
      <div className="container flex flex-row items-center justify-end gap-2">
        <div className="w-[232px]">
          <Button text="Разместить объявление" />
        </div>
        <div className="w-[173px]">
          <Button text="Личный кабинет" />
        </div>
      </div>
    </div>
  );
};

export default HeaderLogged;
