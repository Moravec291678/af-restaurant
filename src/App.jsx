import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Menu from "./pages/Menu";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jidelni-listek" element={<Menu />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
