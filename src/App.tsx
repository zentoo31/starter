import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Programs from "./pages/Programs";
import Layout from "./components/layout";
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programs" element={<Programs />} />
      </Routes>
    </Layout>
  );
}

export default App;
