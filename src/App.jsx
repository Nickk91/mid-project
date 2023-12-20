import { useEffect, useState } from "react";
LoginPage;
import "./App.css";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import NavbarComponent from "./components/NavbarComponent";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Stats from "./pages/Stats";
import CommentsPage from "./pages/CommentsPage";
import { useAuth } from "./components/AuthContext";
function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [loginPage, setLoginPage] = useState(false);
  const { isLoggedIn } = useAuth();
  const handleLogin = () => {
    setIsLogged(true);
  };

  useEffect(() => {
    if (window.location.href.includes("login")) {
      setLoginPage(true);
    }
  }, []);
  const handleLogout = () => {
    setIsLogged(false);
    setLoginPage((prev) => !prev);
  };

  console.log(loginPage);
  return (
    <>
      {isLoggedIn && (
        <NavbarComponent
          isLogged={isLogged}
          setIsLogged={setIsLogged}
          handleLogout={handleLogout}
        />
      )}
      <Routes>
        <Route
          path="/"
          isLogged={isLogged}
          setIsLogged={setIsLogged}
          exact
          element={<LoginPage />}
        />
        <Route path="/stats" element={<Stats />} />
        <Route path="/comments" element={<CommentsPage />} />
        <Route
          path="/home"
          exact
          element={<MainPage setIsLogged={setIsLogged} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
