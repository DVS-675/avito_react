import React, { useContext } from "react";

export const AllowedContext = React.createContext({
  isAllowed: false,
});

export function useAllowedContext() {
  const isAllowed = useContext(AllowedContext);

  return isAllowed;
}
