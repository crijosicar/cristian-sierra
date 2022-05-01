import Navbar from "./navbar";
import Footer from "./footer";

interface LayoutPage {
  [index: string]: any;
}

const Layout = ({ children }: LayoutPage) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
