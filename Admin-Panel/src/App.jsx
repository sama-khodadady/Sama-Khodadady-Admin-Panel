import Router from "./router/Router";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import AuthProvider from "context/AuthContext";
import CartProvider from "context/CartContext";

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <Router />
        <Toaster />
        <ReactQueryDevtools />
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
