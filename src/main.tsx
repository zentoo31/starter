import "./index.css";
import App from "./App";
import ReactDOM from "react-dom/client";
import { SystemProvider } from "./context/SystemContext";
import { HashRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <SystemProvider>
      <App />
    </SystemProvider>
  </HashRouter>,
);
