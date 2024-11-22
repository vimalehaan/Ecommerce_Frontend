import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import HomePage from "./Pages/HomePage";

import theme from "./Themes/ColorTheme";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/login" Component={LoginPage} />
          <Route path="/signup" Component={SignUpPage} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
