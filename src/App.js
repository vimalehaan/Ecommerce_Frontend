import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import HomePage from "./Pages/HomePage";

import theme from "./Themes/ColorTheme";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import wishlistPage from "./Pages/WishlistPage";
import ProductPage from "./Pages/ProductPage";
import CartPage from "./Pages/CartPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/login" Component={LoginPage} />
          <Route path="/signup" Component={SignUpPage} />
          <Route path="/wishlist" Component={wishlistPage} />

          <Route path="/product" Component={ProductPage} />
          <Route path="/cart" Component={CartPage} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
