import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./providers/AuthProvider.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import App from "./App.tsx";
import Sessions from "./pages/Sessions.tsx";
import LogOut from "./pages/LogOut.tsx";
import Layout from "./Layout.tsx";
import ProductCreate from "./pages/products/ProductCreate.tsx";
import ProductList from "./pages/products/ProductList.tsx";
import ProductsHome from "./pages/products/ProductsHome.tsx";
import ProductDetail from "./pages/products/ProductDetail.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<App />} />
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<LogOut />} />
            <Route path="register" element={<Register />} />
            <Route path="sessions" element={<Sessions />} />
            <Route path="products" element={<ProductsHome />} />
            <Route path="products/create" element={<ProductCreate />} />
            <Route path="products/all" element={<ProductList />} />
            <Route path="products/:id" element={<ProductDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
