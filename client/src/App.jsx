import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NoPage from "./pages/nopage/NoPage";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Study from "./pages/study/Study";
import { createTheme } from "@mui/material/styles";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { themeSettings } from "./theme";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import Infomation from "./pages/infomation/Infomation";
import User from "./pages/user/User";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path={"/"}>
            <Route path={"/"} element={<Navigate to={"/login"} replace />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/user"} element={<User />} />
            <Route path={"/dashboard"} element={<Dashboard />} />
            <Route path={"/infomation"} element={<Infomation />} />
            <Route path={"/scholarship"} element={<Login />} />
            <Route path={"/study"} element={<Study />} />
            <Route path={"/graduate"} element={<Login />} />
            <Route path={"/practise"} element={<Login />} />
            <Route path={"/discipline"} element={<Login />} />
            <Route path={"*"} element={<NoPage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
