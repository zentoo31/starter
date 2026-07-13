import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Programs from "./pages/Programs";
import Layout from "./components/Layout";
import Develop from "./pages/Develop";
import Windows from "./pages/Windows";
import Office from "./pages/Office";
import Tools from "./pages/Tools";
import Background from "./pages/Background";
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/develop" element={<Develop />} />
        <Route path="/windows" element={<Windows />} />
        <Route path="/office" element={<Office />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/background" element={<Background/>} />
      </Routes>
    </Layout>
  );
}

export default App;
