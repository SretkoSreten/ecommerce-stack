import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
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
import ProductConnector from "./modules/product";
import CartConnector from "./modules/cart";
import ShopConnector from "./modules/shop";
import OrderConnector from "./modules/order";
import ProfileConnector from "./modules/profile";
import AddressBooksConnector from "./modules/addresses";
import EditAddressConnector from "./modules/addresses/edit";
import AccSidebarConnector from "./layouts/acc_sidebar";
import CreateAddressConnector from "./modules/addresses/create";
import { DeleteAccountConnector } from "./modules/acc_delete";
import { AccountOrdersConnector } from "./modules/acc_orders";

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
              <Route path="/cart" element={<CartConnector />} />
              <Route path="/order" element={<OrderConnector />} />
              <Route path="/" element={<AccSidebarConnector />}>
                <Route path="/account/edit" element={<ProfileConnector />} />
                <Route
                  path="/account/book/addresses"
                  element={<AddressBooksConnector />}
                />
                <Route
                  path="/account/book/addresses/edit/:id"
                  element={<EditAddressConnector />}
                />
                <Route
                  path="/account/book/addresses/create"
                  element={<CreateAddressConnector />}
                />
                <Route
                  path="/account/delete"
                  element={<DeleteAccountConnector />}
                />
                <Route
                  path="/account/orders"
                  element={<AccountOrdersConnector />}
                />
              </Route>
            </Route>
            <Route path="/shop" element={<ShopConnector />} />
            <Route path="/product/:id" element={<ProductConnector />} />
            <Route path="/login" element={<LoginConnector />} />
            <Route path="/register" element={<RegisterConnector />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
