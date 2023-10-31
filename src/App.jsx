import { useState } from "react";
import { AllowedContext } from "./contexts/allowed";
import AppRoutes from "./routes/routes";

function App() {
  const [isAllowed, setIsAllowed] = useState(
    localStorage.getItem("refresh") ? true : false
  );
  return (
    <div className="max-w-[100vw] h-[100vh]">
      <AllowedContext.Provider value={{ isAllowed, setIsAllowed }}>
        <AppRoutes isAllowed={isAllowed} />
      </AllowedContext.Provider>
    </div>
  );
}

export default App;
