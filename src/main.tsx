import "./index.css";
import App from "./App";
import ReactDOM from "react-dom/client";
import { SystemProvider } from "./context/SystemContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <SystemProvider>
      <App />
    </SystemProvider>
  </BrowserRouter>,
);
