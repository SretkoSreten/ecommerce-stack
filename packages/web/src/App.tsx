import {
  BrowserRouter,
  Outlet,
  Route,
  Routes
} from "react-router-dom";
import LoginConnector from "./modules/login";
import RegisterConnector from "./modules/register";
import { AuthProvider } from "./modules/auth/AuthProvider";
import ProtectedRoute from "./modules/auth/ProtectedRoute";
import HomeView from "./modules/home";

import Header from "./layouts/header";
import Footer from "./layouts/footer/footer";
import FooterBottom from "./layouts/footer/footerBottom";
import HeaderBottom from "./layouts/header_bottom";
import SpecialCase from "./components/scroll";
import { LogoutConnector } from "./modules/logout";

const Layout = () => {
  return (
    <div>
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route element={<ProtectedRoute />}>
              <Route index element={<HomeView />} />
              <Route path="/logout" element={<LogoutConnector />} />
            </Route>
            <Route path="/login" element={<LoginConnector />} />
            <Route path="/register" element={<RegisterConnector />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
