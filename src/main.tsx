import "./index.css";
import App from "./App";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SystemProvider } from "./context/SystemContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <SystemProvider>
      <App />
    </SystemProvider>
  </BrowserRouter>,
);
