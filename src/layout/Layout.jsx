import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "../components/ScrollToTop";
import Seo from "../components/Seo";

function Layout({ children }) {
  return (
    <>
      <Header />
      <ScrollToTop />
      <Seo />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
