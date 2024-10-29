import { Route, Routes } from "react-router-dom";

import PageNotFound from "pages/404";
import HomePage from "pages/HomePage";
import AdminPage from "pages/AdminPage";
import CheckoutPage from "pages/CheckoutPage";
import AuthProvider from "providers/AuthProvider";
import ProductDetailsPage from "pages/ProductDetailsPage";
import AddModal from "components/templates/admin/AddModal";
import LoginForm from "components/templates/admin/LoginForm";
import RegistrationForm from "components/templates/admin/RegistrationForm";

function Router() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<RegistrationForm />} />
      <Route
        path="/admin"
        element={
          <AuthProvider>
            <AdminPage />
          </AuthProvider>
        }
      >
        <Route path="product/:id" element={<AddModal />} />
      </Route>
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/products/:id" element={<ProductDetailsPage />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;
