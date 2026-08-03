import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Menu from "./pages/Menu";

import Home from "./pages/Home";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jidelni-listek" element={<Menu />} />
      </Routes>
    </Layout>
  );
}

export default App;
