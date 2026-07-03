import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Programs from "./pages/Programs";
import Layout from "./components/Layout";
import Develop from "./pages/Develop";
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/develop" element={<Develop />} />
      </Routes>
    </Layout>
  );
}

export default App;
