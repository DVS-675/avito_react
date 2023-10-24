const Button = ({ text }) => {
  return (
    <button className="h-10 w-full py-2 px-6 border-[1px] border-white rounded-[6px] flex items-center justify-center text-white hover:bg-[#ffffff26]">
      {text}
    </button>
  );
};

export default Button;
