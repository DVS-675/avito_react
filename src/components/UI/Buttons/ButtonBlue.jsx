const ButtonBlue = ({ text, size }) => {
  return (
    <button
      className={`${
        size ? "h-[62px] w-[190px]" : "h-12 w-full"
      }  py-2 px-6 bg-[#009EE4] rounded-[6px] flex items-center justify-center text-white hover:bg-[#0080C1]`}
    >
      {text}
    </button>
  );
};

export default ButtonBlue;
