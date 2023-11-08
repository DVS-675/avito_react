import { useState } from "react";
import { AllowedContext } from "./contexts/allowed";
import AppRoutes from "./routes/routes";
import { getAccessToken } from "./helpers/AuthHelpers";
import Cookies from "js-cookie";

function App() {
  const [isAllowed, setIsAllowed] = useState(getAccessToken() ? true : false);

  return (
    <div className="max-w-[100vw] h-full">
      <AllowedContext.Provider value={{ isAllowed, setIsAllowed }}>
        <AppRoutes isAllowed={isAllowed} />
      </AllowedContext.Provider>
    </div>
  );
}

export default App;
