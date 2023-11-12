import { useState, useEffect } from "react";

export const useResize = () => {
  const SCREEN_SM = 640;
  const SCREEN_MD = 768;
  const SCREEN_LG = 1024;
  const SCREEN_XL = 1280;
  const SCREEN_2XL = 1536;

  const [width, setWidth] = useState(1920);
  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    width,
    isScreenSm: width >= SCREEN_SM,
    isScreenMd: width >= SCREEN_MD,
    isScreenLg: width >= SCREEN_LG,
    isScreenXl: width >= SCREEN_XL,
    isScreen2xl: width >= SCREEN_2XL,
  };
};
