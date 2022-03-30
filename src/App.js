import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout, RequireAuth } from "components";
import { Toaster } from "react-hot-toast";
import {
  Docs,
  LogIn,
  SignUp,
  Landing,
  NotFound,
  Products,
  Dashboard,
  Credentials,
} from "pages";

const App = () => {
  return (
    <Fragment>
      <Toaster
        position="top-right"
        containerClassName="mt-20"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />

            <Route path="login" element={<LogIn />} />
            <Route path="signup" element={<SignUp />} />
          </Route>

          <Route
            path="dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          >
            <Route index element={<Navigate to="products" />} />
            <Route path="products" element={<Products />} />
            <Route path="credentials" element={<Credentials />} />
            <Route path="docs" element={<Docs />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
