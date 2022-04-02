import { ThemeProvider } from "styled-components";
import Header from "./Header";
import GlobalStyles from "../styles/Global";
import Footer from "./Footer";

const theme = {
  colors: {
    header: "#ffffff",
    body: "#ffffff",
    footer: "#003333",
    lightBG: "#ECF3F5",
  },
  font_size: {
    xxlarge: "46px",
    xlarge: "38px",
    large: "30px",
    normal: "16px",
    small: "15px",
  },
};

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <main>{children}</main>
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
