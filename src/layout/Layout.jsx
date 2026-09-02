import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "../components/ScrollToTop";

function Layout({ children }) {
  return (
    <>
      <Header />
      <ScrollToTop />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
