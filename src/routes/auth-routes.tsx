import { Routes, Route } from "react-router";

import { AuthLayout } from "../components/AuthLayout";
import { Signin } from "../pages/Signin";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/" element={<Signin />} />
      </Route>
    </Routes>
  );
}