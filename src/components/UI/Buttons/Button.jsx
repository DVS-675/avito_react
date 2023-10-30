const Button = ({ text, black }) => {
  return (
    <button
      className={`${
        black ? "text-black" : "text-white"
      } h-[52px] w-full py-2 px-6 border-[1px] border-[#D9D9D9] rounded-[6px] flex items-center justify-center hover:bg-[#ffffff26]`}
    >
      {text}
    </button>
  );
};

export default Button;
