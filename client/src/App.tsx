import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppProvider";
import { AppRoutes } from "./routes";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;