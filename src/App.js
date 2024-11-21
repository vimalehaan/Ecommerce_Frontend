import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import HomePage from "./Pages/HomePage";

import theme from "./Themes/ColorTheme";
import LoginPage from "./Pages/LoginPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/login" Component={LoginPage} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
