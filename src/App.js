import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import HomePage from "./Pages/HomePage";

import theme from "./Themes/ColorTheme";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import wishlistPage from "./Pages/WishlistPage";
import ProductPage from "./Pages/ProductPage";
import ProductListPage from "./Pages/ProductListPage";
import CartPage from "./Pages/CartPage";
import AdminDashboard from "./Pages/AdminDashboard";
import ShippingDetailsPage from "./Pages/ShippingPage";
import ShippingPage from "./Pages/ShippingPage";
import PaymentPage from "./Pages/PaymentPage";
import { useDispatch } from "react-redux";
import { fetchUserId } from "./Actions/AuthAction";
import { useEffect } from "react";
import ForgotPassword from "./Pages/ForgotpwPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch the userId when the app is loaded
    dispatch(fetchUserId());
  }, [dispatch]);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/login" Component={LoginPage} />
          <Route path="/signup" Component={SignUpPage} />
          <Route path="/wishlist" Component={wishlistPage} />

          <Route path="/product" Component={ProductPage} />
          <Route path="/productlist" Component={ProductListPage} />
          <Route path="/cart" Component={CartPage} />
          <Route path="/forgotpassword" Component={ForgotPassword} />
          {/* <Route path="/payment" Component={PaymentPage} /> */}
          <Route path="/admin" Component={AdminDashboard} />
          <Route path ="/shipping"Component={ShippingPage} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
