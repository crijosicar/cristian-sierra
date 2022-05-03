import Navbar from "./navbar";
import Footer from "./footer";
import Script from "next/script";

interface LayoutPage {
  [index: string]: any;
}

const Layout = ({ children }: LayoutPage) => {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XYZVCCFKML"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-XYZVCCFKML');
        `}
      </Script>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
